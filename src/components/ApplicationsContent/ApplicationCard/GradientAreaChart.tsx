import { LinearGradient } from '@tailus-ui/visualizations';
import { area } from '@tailus/themer';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

type Fill = 'Primary' | 'Secondary' | 'Accent' | 'Gray' | 'Neutral';
type Intent = 'primary' | 'secondary' | 'accent' | 'gray' | 'neutral';

type GradientAreaChartProps = {
  intent: Intent;
  dataKey: Fill;
};

const data = [
  { name: 'Jan', Primary: 3000, Secondary: 4000, Accent: 5000, Gray: 6000, Neutral: 7000 },
  { name: 'Feb', Primary: 3000, Secondary: 4000, Accent: 5000, Gray: 6000, Neutral: 7000 },
  { name: 'Mar', Primary: 2000, Secondary: 3000, Accent: 4000, Gray: 5000, Neutral: 6000 },
  { name: 'Apr', Primary: 2780, Secondary: 3780, Accent: 4780, Gray: 5780, Neutral: 6780 },
  { name: 'May', Primary: 1890, Secondary: 2890, Accent: 3890, Gray: 4890, Neutral: 5890 },
  { name: 'Jun', Primary: 2390, Secondary: 3390, Accent: 4390, Gray: 5390, Neutral: 6390 },
  { name: 'Jul', Primary: 3490, Secondary: 4490, Accent: 5490, Gray: 6490, Neutral: 7490 },
  { name: 'Aug', Primary: 3490, Secondary: 4490, Accent: 5490, Gray: 6490, Neutral: 7490 },
  { name: 'Sep', Primary: 5490, Secondary: 6490, Accent: 7490, Gray: 8490, Neutral: 9490 },
  { name: 'Oct', Primary: 3490, Secondary: 4490, Accent: 5490, Gray: 6490, Neutral: 7490 },
  { name: 'Nov', Primary: 3000, Secondary: 4000, Accent: 5000, Gray: 6000, Neutral: 7000 },
  { name: 'Dec', Primary: 3490, Secondary: 4490, Accent: 5490, Gray: 6490, Neutral: 7470 },
];

function GradientAreaChart({ intent, dataKey }: GradientAreaChartProps) {
  return (
    <div className="-mb-[--card-padding] -mx-1">
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <LinearGradient id="Gray" intent="gray" />
              <LinearGradient id="Primary" intent="primary" />
              <LinearGradient id="Accent" intent="accent" />
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
      </div>
    </div>
  );
}

export default GradientAreaChart;
