'use client';

import * as React from 'react';

import { capitalize } from 'lodash';
import { Label, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A donut chart with text';

interface PieChartWithDataProps {
  data: {
    status: string;
    usage: number;
    fill: string;
  }[];
}

const PieChartWithData: React.FC<PieChartWithDataProps> = ({ data }) => {
  const chartConfig = React.useMemo<ChartConfig>(() => {
    const dataRecords: Record<
      string,
      {
        label: string;
        color: string;
      }
    > = {};

    data.forEach((item) => {
      dataRecords[item.status] = {
        label: capitalize(item.status),
        color: item.fill,
      };
    });

    return dataRecords;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalFugitives = data.reduce((acc, item) => acc + item.usage, 0);

  return (
    <Card className="bg-transparent">
      <CardHeader className="h-min">
        <CardTitle>Fugitive Status Overview</CardTitle>
        <CardDescription>
          This section provides a comprehensive breakdown of the current status of individuals classified as fugitives.
          A total of {totalFugitives} fugitives have been identified and grouped according to their legal or
          investigative status. This classification helps in tracking progress on each case and allocating resources
          effectively.
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0 grid h-full w-full p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-[70vw] md:w-auto">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={data} dataKey="usage" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalFugitives.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Fugitives
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
};

export default PieChartWithData;
