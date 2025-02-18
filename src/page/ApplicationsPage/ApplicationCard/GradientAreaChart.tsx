import type { StatisticAdItem } from '@/generated/graphql';
import { Caption } from '@tailus-ui/typography';
import { LinearGradient } from '@tailus-ui/visualizations';
import { area } from '@tailus/themer';
import React from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

// type Fill = 'Primary' | 'Secondary' | 'Accent' | 'Gray' | 'Neutral';
type Intent = 'primary' | 'secondary' | 'accent' | 'gray' | 'neutral';

type GradientAreaChartProps = {
  intent: Intent;
  dataKey: string;
  data: StatisticAdItem[];
};

function GradientAreaChart({ intent, data = [], dataKey }: GradientAreaChartProps) {
  const hasData = !!data.length;

  return (
    <div className="-mb-2 -mx-4">
      <div className="h-24 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <LinearGradient id="CTR" intent="gray" />
              <LinearGradient id="impressions" intent={intent} />
              <LinearGradient id="profit" intent="accent" />
            </defs>
            <Area
              className={area({ intent })}
              fill={`url(#${dataKey}`}
              stroke="currentColor"
              dataKey={dataKey}
              type="monotone"
              activeDot={
                {
                  color: 'var(--area-primary-stroke)',
                  r: 3,
                  stroke: 'white',
                  strokeWidth: 1,
                }
              }
            />
          </AreaChart>
        </ResponsiveContainer>
        {hasData && (
          <Caption size="xs" className="text-center absolute bottom-1 left-0 right-0">
            There are no statistics for the last period yet
          </Caption>
        )}
      </div>
    </div>
  );
}

export default GradientAreaChart;
