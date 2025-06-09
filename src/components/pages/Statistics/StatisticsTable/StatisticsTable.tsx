import type { Ordering } from '@/generated/graphql';
import type { StatisticCustomAdItemKeys, StatisticPageInfo, StatisticsCustomAd } from '@/types/statistic';
import { StatisticOrderingKey } from '@/generated/graphql';
import ColumOrder from '@components/ColumOrder';
import { listChatFields } from '@components/pages/Statistics/StatisticsChart/StatisticsChart.const';
import useStatisticsTable from '@components/pages/Statistics/StatisticsTable/useStatisticsTable';
import Pagination from '@components/Pagination/Pagination';
import Card from '@tailus-ui/Card';
import { format } from 'date-fns';
import React from 'react';

type StatisticsTableProps = {
  data: StatisticsCustomAd;
  pageInfo?: StatisticPageInfo;
  onOrderChange: (field: StatisticOrderingKey, direction?: Ordering) => void;
  onPageChange: (page: number) => void;
  orderField: StatisticOrderingKey | null;
  orderDirection: Ordering | null | undefined;
};

function StatisticsTable({ orderField, orderDirection, data, pageInfo, onPageChange, onOrderChange }: StatisticsTableProps) {
  const {
    changeColumnOrderHandler,
  } = useStatisticsTable(
    orderField,
    onOrderChange,
  );

  console.log('xxx pageInfo', pageInfo);

  return (
    <div className="pt-6">
      <Pagination
        current={pageInfo?.page}
        total={pageInfo?.count}
        onChange={onPageChange}
      />
      <Card fancy className="p-4 mt-4">
        <table className="border-collapse table-fixed w-full text-left" data-rounded="medium">
          <thead>
            <tr className="text-sm text-[--title-text-color] *:bg-[--ui-soft-bg] *:p-3 *:font-medium">
              <th className="rounded-l-[--card-radius]">
                <ColumOrder
                  className="-ml-0"
                  direction={orderDirection}
                  active={orderField === StatisticOrderingKey.Datemark}
                  onChange={changeColumnOrderHandler(StatisticOrderingKey.Datemark)}
                >
                  Date
                </ColumOrder>
              </th>
              {listChatFields.map(({ name }) => (
                <th key={name} className="text-right text-nowrap last:rounded-r-[--card-radius]">
                  <ColumOrder
                    direction={orderDirection}
                    active={orderField === name.toUpperCase()}
                    onChange={changeColumnOrderHandler(name.toUpperCase() as StatisticOrderingKey)}
                    className="justify-end"
                    align="right"
                  >
                    {name}
                  </ColumOrder>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="align-top text-sm pt-1 [--ui-soft-bg:theme(colors.gray.50)] dark:[--ui-soft-bg:theme(colors.gray.925)]"
          >
            {data?.map(({
              date,
              ...stats
            }, index) => {
              const key = `${date}-${index}`;
              return (
                <tr
                  key={key}
                  className="*:p-3 [&:not(:last-child)>*]:border-b border-l-2 border-transparent"
                >
                  <td>
                    {format(date, 'LLL dd, y')}
                  </td>
                  {listChatFields.map(({ name, value }) => (
                    <td key={name} className="text-right">
                      {(stats[value as StatisticCustomAdItemKeys] ?? 0).toFixed(2)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default StatisticsTable;
