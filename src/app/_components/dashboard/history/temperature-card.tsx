"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { api } from "@/trpc/react";

const chartConfig = {
  level: {
    label: "Temperature",
  },
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Data = Array<{ recordedAt: string; temperature: number }>;

export default function TemperatureCard({
  toolId,
  value,
}: {
  toolId: number;
  value: Data;
}) {
  const [data, setData] = React.useState<Data>(value);

  const query = api.device.getTemperatureHumidityHistory.useQuery(toolId, {
    refetchInterval: 60000,
  });

  React.useEffect(() => {
    if (query.data) setData(query.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.isSuccess]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Temperature Chart</CardTitle>
          <CardDescription>
            Showing results of temperature for the last {data.length} data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="recordedAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={32}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  hour12: true,
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="level"
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="temperature"
              type="linear"
              stroke={`hsl(var(--chart-2))`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
