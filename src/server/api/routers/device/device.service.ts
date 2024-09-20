import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";

export async function getSoilMoisture(id: number) {
  try {
    return await db.soilMoisture.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get soil moisture by id",
    });
  }
}

export async function getTemperatureHumidity(id: number) {
  try {
    return await db.temperatureHumidity.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get temperature by id",
    });
  }
}

export async function getPumpsHistory(toolId: number) {
  try {
    const data = await db.pump.groupBy({
      by: ["dateAt"],
      where: {
        toolId,
      },
      orderBy: {
        dateAt: "desc",
      },
      take: 50,
      _count: {
        _all: true,
      },
    });

    return data.map((value) => ({
      dateAt: format(value.dateAt, "yyyy-MM-dd"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      count: value._count._all,
    }));
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get pumps history",
    });
  }
}

export async function getSoilMoistureHistory(toolId: number) {
  try {
    const data = await db.soilMoisture.findMany({
      where: {
        toolId,
      },
      select: {
        recordedAt: true,
        moistureLevel: true,
      },
      orderBy: {
        recordedAt: "desc",
      },
      take: 50,
    });

    return data.map((value) => ({
      ...value,
      recordedAt: value.recordedAt.toISOString(),
    }));
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get soil moisture history",
    });
  }
}

export async function getTemperatureHumidityHistory(toolId: number) {
  try {
    const data = await db.temperatureHumidity.findMany({
      where: {
        toolId,
      },
      select: {
        recordedAt: true,
        temperature: true,
        humidity: true,
      },
      orderBy: {
        recordedAt: "desc",
      },
      take: 50,
    });

    return data.map((value) => ({
      ...value,
      recordedAt: value.recordedAt.toISOString(),
    }));
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get soil moisture history",
    });
  }
}
