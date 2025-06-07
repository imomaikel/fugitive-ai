'use client';

import { useMemo } from 'react';

import { capitalize } from 'lodash';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface RadarChartWithDataProps {
  data: {
    nationality: string;
    count: number;
  }[];
}

const RadarChartWithData: React.FC<RadarChartWithDataProps> = ({ data }) => {
  const chartConfig = useMemo<ChartConfig>(() => {
    const dataRecords: Record<
      string,
      {
        label: string;
        color: string;
      }
    > = {};

    data.forEach((item) => {
      dataRecords[item.nationality] = {
        label: capitalize(item.nationality),
        color: 'red',
      };
    });

    return dataRecords;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="bg-transparent">
      <CardHeader className="h-min">
        <CardTitle>Nationality Distribution of Fugitives</CardTitle>
        <CardDescription>
          This section highlights the distribution of fugitives based on their nationalities. By grouping individuals by
          country of origin, we gain valuable insights into international patterns and potential cross-border
          collaborations needed for apprehension efforts. Understanding nationality trends can also support strategic
          planning and diplomatic engagement.
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0 grid h-full w-full p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full md:w-auto">
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="nationality" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--primary)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RadarChartWithData;
