import HumidityCard from "@/app/_components/dashboard/history/humidity-card";
import PumpCard from "@/app/_components/dashboard/history/pump-card";
import SoilMoistureCard from "@/app/_components/dashboard/history/soil-moisture-card";
import TemperatureCard from "@/app/_components/dashboard/history/temperature-card";
import MoreToolButton from "@/app/_components/dashboard/tool/more-tool-button";
import UpdateToolForm from "@/app/_components/dashboard/tool/update-tool-form";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const data = await api.tool.getTool(Number(id));

  return {
    title: `${data?.name} History`,
    description:
      "A data dashboard displaying charts for soil moisture, temperature, humidity, and water pump activity, providing real-time insights into sensor readings and system performance.",
  };
}

export default async function ToolHistoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tool = await api.tool.getToolHistory(Number(id));
  if (!tool) return notFound();

  return (
    <section className="space-y-7">
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{tool.name}</h1>
          <div className="ml-auto flex gap-3">
            <UpdateToolForm id={tool.id} name={tool.name} size="sm" />
            <MoreToolButton tool={tool} />
          </div>
        </div>
        <p>Token : {tool.token.split("/")[1]}</p>
      </div>
      <SoilMoistureCard toolId={tool.id} value={tool.soilMoistures} />
      <TemperatureCard toolId={tool.id} value={tool.temperatureHumidities} />
      <HumidityCard toolId={tool.id} value={tool.temperatureHumidities} />
      <PumpCard toolId={tool.id} value={tool.pumps} />
    </section>
  );
}
