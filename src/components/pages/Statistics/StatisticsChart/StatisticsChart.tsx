'use client';

import type { StatisticsCustomAd } from '@/types/statistic';
import { lineChartColors, listChatFields } from '@components/pages/Statistics/StatisticsChart/StatisticsChart.const';
import Multiselect from '@tailus-ui/Multiselect';
import CustomTooltip from '@tailus-ui/visualizations/CustomTooltip';
import { format } from 'date-fns';
import { useState } from 'react';
import { Customized, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';

type StatisticsChartProps = {
  data: StatisticsCustomAd;
};

function StatisticsChart({ data }: StatisticsChartProps) {
  const [lineFields, setLineFields] = useState<(string | number)[]>(['views', 'impressions']);
  const changeLineChatFieldsHandler = (value: (string | number)[]) => setLineFields(value);
  const isEmptyData = !data.length;

  return (
    <div>
      <Multiselect
        label=""
        data={listChatFields}
        values={lineFields}
        onChange={changeLineChatFieldsHandler}
      />
      <div className="h-[500px] w-full relative pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={250}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="date"
              name="date"
              angle={-45}
              hide={isEmptyData}
              tick={(event) => {
                const { y, payload: { value } } = event;
                const date = format(value, 'dd.MM');
                const yIndent = y + 5;

                return (<Text {...event} y={yIndent} className="text-xs ">{date}</Text>);
              }}
            />
            <YAxis
              hide={isEmptyData}
              tick={(event) => {
                const { payload: { value } } = event;

                return (<Text {...event} className="text-xs">{value}</Text>);
              }}
            />
            {!isEmptyData && (<Tooltip content={<CustomTooltip payload={[]} active fancy label="keys" className="px-2 py-2 " />} />)}
            {!isEmptyData && (<Legend />)}
            <Customized
              component={() => {
                return isEmptyData
                  ? (
                      <Text
                        style={{ transform: `translate(50%, 50%)` }}
                        x={0}
                        textAnchor="middle"
                        verticalAnchor="middle"
                      >
                        No data available
                      </Text>
                    )
                  : null;
              }}
            />
            {lineFields.map((field, index) => (
              <Line
                key={field}
                type="monotone"
                dataKey={field}
                stroke={lineChartColors[index]}
                activeDot={{
                  color: 'var(--dv-warning-700)',
                  r: 3,
                  stroke: 'white',
                }}
              />
            ))}
            {/* <Line */}
            {/*  type="monotone" */}
            {/*  dataKey="views" */}
            {/*  stroke="#2563eb" */}
            {/*  activeDot={{ */}
            {/*    color: 'var(--dv-warning-700)', */}
            {/*    r: 3, */}
            {/*    stroke: 'white', */}
            {/*  }} */}
            {/* /> */}
            {/* <Line */}
            {/*  type="monotone" */}
            {/*  dataKey="impressions" */}
            {/*  stroke="#65a30d" */}
            {/*  activeDot={{ */}
            {/*    color: 'var(--dv-primary)', */}
            {/*    r: 3, */}
            {/*    stroke: 'white', */}
            {/*  }} */}
            {/* /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatisticsChart;
