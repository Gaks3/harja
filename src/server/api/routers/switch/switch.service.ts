import { db } from "@/server/db";
import type { UpdateSwitchSchema } from "./switch.types";
import { TRPCError } from "@trpc/server";

export async function updateSwitch(value: UpdateSwitchSchema) {
  try {
    await db.switch.update({
      where: {
        id: value.id,
      },
      data: {
        name: value.name,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) throw error;

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
