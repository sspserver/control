'use client';

import type { StatisticsCustomAd } from '@/types/statistic';

import { StatisticKey } from '@/generated/graphql';
import { lineChartColors, listChatFields } from '@components/pages/Statistics/StatisticsChart/StatisticsChart.const';
import useStatisticsFilterStore from '@components/pages/Statistics/useStatisticsFilterStore';
import Multiselect from '@tailus-ui/Multiselect';
import CustomTooltip from '@tailus-ui/visualizations/CustomTooltip';
import { format } from 'date-fns';
import { Bar, BarChart, Customized, Legend, Line, LineChart, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';
import { CountryWorldMap } from './StatisticsWorldMapChart';

type StatisticsChartProps = {
  data: StatisticsCustomAd;
};

function StatisticsChart({ data }: StatisticsChartProps) {
  const {
    lineFields,
    storeLineFieldsHandler,
  } = useStatisticsFilterStore();
  const changeLineChatFieldsHandler = (value: (string | number)[]) => storeLineFieldsHandler(value);
  const isEmptyData = !data.length;
  const [firstDataItem = {}] = (data ?? []).filter(item => !!item && !!item.groupByKey) || [];
  const groupByKey = (firstDataItem.groupByKey || undefined) as StatisticKey;

  // Determine chart type and grouping
  const isDateGrouping = groupByKey === StatisticKey.Datemark;
  const isCountryGrouping = groupByKey === StatisticKey.Country;
  const ChartComponent = isDateGrouping ? LineChart : BarChart;

  // If country grouping, show world map
  if (isCountryGrouping) {
    return (
      <div>
        <Multiselect
          label=""
          data={listChatFields}
          values={lineFields}
          onChange={changeLineChatFieldsHandler}
        />
        <div className="mt-4">
          <CountryWorldMap data={data} lineFields={lineFields.map(String)} colors={lineChartColors} />
        </div>
      </div>
    );
  }

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
          <ChartComponent
            width={500}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {groupByKey && (
              <XAxis
                dataKey="groupByValue"
                name="keys"
                angle={-45}
                hide={isEmptyData}
                tick={(event) => {
                  const { y, payload: { value }, index } = event;
                  const item = data[index] || {};
                  const key = item.keys?.find(({ key }) => key === item.groupByKey || (!item.groupByKey && !!key));
                  const itemValue = item.groupByKey === StatisticKey.Datemark
                    ? format(value || '2000-01-01', 'dd.MM.y')
                    : key?.text || key?.value || value || '?';
                  const yIndent = y + 5;

                  return (<Text {...event} y={yIndent} className="text-xs">{itemValue}</Text>);
                }}
              />
            )}
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
            {isDateGrouping
              ? lineFields.map((field, index) => (
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
                ))
              : lineFields.map((field, index) => (
                  <Bar
                    key={field}
                    dataKey={field}
                    fill={lineChartColors[index]}
                  />
                ))}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatisticsChart;
