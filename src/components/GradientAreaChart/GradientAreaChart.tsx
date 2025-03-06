import type { StatisticAdItem } from '@/generated/graphql';
import { statisticsFilterFields } from '@components/StatisticFilter/StatisticFilter.const';
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
  showMessage?: boolean;
  data?: Partial<StatisticAdItem>[];
};

function GradientAreaChart({ intent, data, showMessage, dataKey }: GradientAreaChartProps) {
  const linearGradientClassName = showMessage ? 'dark:text-gray-600' : 'dark:text-primary-600';

  return (
    <div className="-mb-2 -mx-4">
      <div className="h-24 w-full relative">
        <ResponsiveContainer width="100%" height="100%" className="h-24 w-full relative">
          <AreaChart data={data}>
            <defs>
              {statisticsFilterFields.map(({ value }) => (
                <LinearGradient
                  key={value}
                  className={linearGradientClassName}
                  id={value}
                  intent={intent}
                />
              ))}
            </defs>
            {/* <Tooltip */}
            {/*  cursor={{ stroke: 'var(--ui-border-color)', strokeWidth: 1 }} */}
            {/*  content={<CustomTooltip payload={[]} active fancy label="keys" className="px-2 py-2 " />} */}
            {/* /> */}
            {/* <CartesianGrid horizontal={false} stroke="var(--ui-border-color)" strokeDasharray={3} /> */}
            <Area
              className={area({ intent })}
              fill={`url(#${dataKey})`}
              stroke="currentColor"
              dataKey={dataKey}
              type="monotone"
              activeDot={{
                color: 'var(--dv-primary)',
                r: 3,
                stroke: 'white',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        {showMessage && (
          <Caption size="xs" className="text-center absolute bottom-1 left-0 right-0">
            There are no statistics for the last period yet
          </Caption>
        )}
      </div>
    </div>
  );
}

export default GradientAreaChart;
