"use client";

import { PieChart, Pie, Cell, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { type ChartConfig, ChartContainer } from "@/app/_components/ui/chart";
import { formatDistance } from "date-fns";
import type { TemperatureHumidity } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

export default function HumidityCard({
  value,
}: {
  value?: TemperatureHumidity;
}) {
  const [data, setData] = useState<TemperatureHumidity | null>(value ?? null);

  const query = api.device.getTemperatureHumidity.useQuery(
    { id: value?.id ?? 0 },
    {
      refetchInterval: value !== null ? 60000 : false,
      enabled: value !== null,
    },
  );

  const chartData = [
    { name: "value", value: (data?.humidity ?? 0) > 100 ? 100 : 0 },
    {
      name: "empty",
      value: 100 - ((data?.humidity ?? 0) > 100 ? 100 : 0),
    },
  ];

  const chartConfig = {
    value: {
      label: "Value",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (query.data) setData(query.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess]);

  return (
    <Card className="mx-auto w-full max-w-sm md:col-span-2 lg:col-span-1">
      <CardHeader className="items-center p-4 pb-2">
        <CardTitle className="text-xl">Kelembapan Ruangan</CardTitle>
        <CardDescription>
          {formatDistance(data?.recordedAt ?? new Date(), new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-4 pt-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[200px] w-full"
        >
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        fill="hsl(var(--foreground))"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold"
                        >
                          {data?.humidity ?? 0}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 25}
                          className="fill-muted-foreground text-sm"
                        >
                          out of 100%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
