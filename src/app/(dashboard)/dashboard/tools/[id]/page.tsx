import HumidityCard from "@/app/_components/dashboard/tool/humidity-card";
import MoreToolButton from "@/app/_components/dashboard/tool/more-tool-button";
import MqttLampPump from "@/app/_components/dashboard/tool/mqtt-lamp-pump";
import SoilMoistureCard from "@/app/_components/dashboard/tool/soil-moisture-card";
import TemperatureCard from "@/app/_components/dashboard/tool/temperature-card";
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
    title: `${data?.name} Tool`,
    description:
      "A monitoring dashboard featuring charts for soil moisture, temperature, humidity, lighting, and water pump sensors, offering real-time data visualization for system tracking and performance analysis.",
  };
}

export default async function ToolPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tool = await api.tool.getTool(Number(id));
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
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold">Sensors</h2>
          <p className="text-sm">
            Accurate sensor readings are vital for decision-making processes.
            <span className="ml-1 underline">Data updates every 3 hours.</span>
          </p>
        </div>
        <div className="grid grid-cols-1 items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-3">
          <SoilMoistureCard value={tool.soilMoistures[0]} />
          <TemperatureCard value={tool.temperatureHumidities[0]} />
          <HumidityCard value={tool.temperatureHumidities[0]} />
        </div>
      </div>
      <MqttLampPump
        topic={tool.token}
        switchs={tool.switchs}
        pump={tool.pumps[0]!}
      />
    </section>
  );
}
