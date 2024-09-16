import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  getPumpsHistory,
  getSoilMoisture,
  getSoilMoistureHistory,
  getTemperatureHumidity,
  getTemperatureHumidityHistory,
} from "./device.service";
import { getDeviceSchema } from "./device.types";

export const deviceRouter = createTRPCRouter({
  getSoilMoisture: protectedProcedure
    .input(getDeviceSchema)
    .query(async ({ input }) => {
      return await getSoilMoisture(input.id);
    }),
  getTemperatureHumidity: protectedProcedure
    .input(getDeviceSchema)
    .query(async ({ input }) => {
      return await getTemperatureHumidity(input.id);
    }),
  getPumpsHistory: protectedProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await getPumpsHistory(input);
    }),
  getSoilMoistureHistory: protectedProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await getSoilMoistureHistory(input);
    }),
  getTemperatureHumidityHistory: protectedProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await getTemperatureHumidityHistory(input);
    }),
});
