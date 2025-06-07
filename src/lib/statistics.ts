import 'server-only';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { isNotNull, sql } from 'drizzle-orm';

/**
 * Statistics for pie chart
 * Status x usage
 */
const createStatusStatistics = async () => {
  const statuses = await db
    .select({
      status: fugitives.status,
      count: sql<string>`COUNT(${fugitives.status})`,
    })
    .from(fugitives)
    .groupBy(fugitives.status);

  const data: {
    status: string;
    usage: number;
    fill: string;
  }[] = [];

  const colors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'] as const;

  statuses.forEach((status, index) => {
    const colorIndex = index % colors.length;
    const color = colors[colorIndex];

    data.push({
      status: status.status,
      usage: parseInt(status.count),
      fill: color || colors[0],
    });
  });

  return data;
};

/**
 * Statistics for radar chart
 * Nationality x fugitive_count
 */
const createCountryStatistics = async () => {
  const nationalityData = await db
    .select({
      nationality: fugitives.nationality,
      count: sql<string>`COUNT(${fugitives.nationality})`,
    })
    .from(fugitives)
    .where(isNotNull(fugitives.nationality))
    .groupBy(fugitives.nationality);

  const data: {
    nationality: string;
    count: number;
  }[] = [];

  nationalityData.forEach((status) => {
    if (!status.nationality) return;

    data.push({
      nationality: status.nationality,
      count: parseInt(status.count),
    });
  });

  return data;
};

export const getLandingPageStatistics = async () => {
  const [pieChartData, radarChartData] = await Promise.all([createStatusStatistics(), createCountryStatistics()]);

  return {
    pieChartData,
    radarChartData,
  };
};
