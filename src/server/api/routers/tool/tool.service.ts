import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import type { CreateToolSchema, UpdateToolSchema } from "./tool.types";
import { env } from "@/env";
import type { LampData } from "@/lib/types";
import { customAlphabet } from "nanoid";
import { format } from "date-fns";

async function generateUniqueToken() {
  let token;
  let alreadyUsed;

  do {
    token = "harja/" + customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 7)();

    alreadyUsed = await db.tool.findUnique({
      where: { token },
    });
  } while (alreadyUsed);

  return token;
}

export async function createTool(
  value: CreateToolSchema,
  userId: string,
  session: string,
) {
  try {
    const token = await generateUniqueToken();

    const tool = await db.tool.create({
      data: {
        name: value.name,
        userId,
        token,
      },
    });

    await createDevice(tool.id);

    await fetch(`${env.BACKEND_URL}/mqtt/subscribe?topic=${tool.token}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create tool",
    });
  }
}

async function createDevice(toolId: number) {
  const lampData: LampData[] = [
    {
      toolId,
      inputName: "lamp1",
      name: "Lamp 1",
    },
    {
      toolId,
      inputName: "lamp2",
      name: "Lamp 2",
    },
    {
      toolId,
      inputName: "lamp3",
      name: "Lamp 3",
    },
  ];

  await db.switch.createMany({
    data: lampData,
  });
}

export async function getToolsByUserId(userId: string) {
  try {
    return await db.tool.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create tool",
    });
  }
}

export async function getToolById(id: number, userId: string) {
  try {
    return await db.tool.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        soilMoistures: {
          take: 1,
          orderBy: {
            recordedAt: "desc",
          },
        },
        temperatureHumidities: {
          take: 1,
          orderBy: {
            recordedAt: "desc",
          },
        },
        switchs: true,
        pumps: {
          take: 1,
          orderBy: {
            recordedAt: "desc",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create tool",
    });
  }
}

export async function updateTool(values: UpdateToolSchema, userId: string) {
  try {
    await db.tool.update({
      where: {
        id: values.id,
        userId,
      },
      data: {
        name: values.name,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to update tool",
    });
  }
}

export async function deleteToolById(id: number, userId: string) {
  try {
    const data = await db.tool.delete({
      where: {
        id,
        userId,
      },
    });

    await fetch(`${env.BACKEND_URL}/mqtt/unsubscribe?topic=${data.token}`);
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete tool",
    });
  }
}

export async function getToolHistory(id: number, userId: string) {
  try {
    const data = await db.tool.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        soilMoistures: {
          select: {
            recordedAt: true,
            moistureLevel: true,
          },
          orderBy: {
            recordedAt: "desc",
          },
          take: 50,
        },
        temperatureHumidities: {
          select: {
            recordedAt: true,
            temperature: true,
            humidity: true,
          },
          orderBy: {
            recordedAt: "desc",
          },
          take: 50,
        },
      },
    });
    if (!data) return null;

    const pumpsData = await db.pump.groupBy({
      by: ["dateAt"],
      where: {
        toolId: data.id,
      },
      orderBy: {
        dateAt: "desc",
      },
      take: 50,
      _count: {
        _all: true,
      },
    });

    const soilMoistures = data.soilMoistures.map((value) => ({
      ...value,
      recordedAt: value.recordedAt.toISOString(),
    }));
    console.log(soilMoistures[soilMoistures.length - 1]);

    const temperatureHumidities = data.temperatureHumidities.map((value) => ({
      ...value,
      recordedAt: value.recordedAt.toISOString(),
    }));

    const pumps = pumpsData.map((value) => ({
      dateAt: format(value.dateAt, "yyyy-MM-dd"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      count: value._count._all,
    }));

    return {
      ...data,
      soilMoistures,
      temperatureHumidities,
      pumps,
    };
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get tool history",
    });
  }
}
