import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { updateSwitch } from "./switch.service";
import { updateSwitchSchema } from "./switch.types";

export const switchRouter = createTRPCRouter({
  update: protectedProcedure
    .input(updateSwitchSchema)
    .mutation(async ({ input }) => {
      await updateSwitch(input);
    }),
});
