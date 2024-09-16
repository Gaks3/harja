"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  total: {
    label: "Count",
  },
  desktop: {
    label: "Pump",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Data = Array<{ dateAt: string; count: number }>;

export default function PumpCard({
  toolId,
  value,
}: {
  toolId: number;
  value: Data;
}) {
  const [data, setData] = React.useState<Data>(value);

  const query = api.device.getPumpsHistory.useQuery(toolId, {
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
          <CardTitle>Pump Chart</CardTitle>
          <CardDescription>
            Showing results of pump for the last {data.length} data
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dateAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value: string) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="count" fill={`hsl(var(--chart-2))`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
