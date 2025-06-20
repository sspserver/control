import type { Ordering } from '@/generated/graphql';
import type { StatisticCustomAdItemKeys, StatisticPageInfo, StatisticsCustomAd } from '@/types/statistic';
import { StatisticOrderingKey } from '@/generated/graphql';
import ColumOrder from '@components/ColumOrder';
import { statisticValueToFix } from '@components/pages/Statistics/Statistics.const';
import { getHasStatisticDataField } from '@components/pages/Statistics/Statistics.utils';
import useStatisticsTable from '@components/pages/Statistics/StatisticsTable/useStatisticsTable';
import Pagination from '@components/Pagination/Pagination';
import Card from '@tailus-ui/Card';
import { format } from 'date-fns';
import React from 'react';
import {
  tableFields,
  tableFieldsSeparator,
} from './StatisticsTable.const';

type StatisticsTableProps = {
  data: StatisticsCustomAd;
  pageInfo?: StatisticPageInfo;
  pageSize?: number;
  onOrderChange: (field: StatisticOrderingKey, direction?: Ordering) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  orderField: StatisticOrderingKey | null;
  orderDirection: Ordering | null | undefined;
};

function StatisticsTable({
  orderField,
  orderDirection,
  data,
  pageInfo,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onOrderChange,
}: StatisticsTableProps) {
  const hasDateField = getHasStatisticDataField('date', data);
  const {
    changeColumnOrderHandler,
  } = useStatisticsTable(
    orderField,
    onOrderChange,
  );

  return (
    <div className="pt-6">
      <Pagination
        current={pageInfo?.page}
        total={pageInfo?.count}
        size={`${pageSize}`}
        onChangeSize={onPageSizeChange}
        onChange={onPageChange}
      />
      <Card fancy className="p-4 mt-4">
        <table className="border-collapse table-fixed w-full text-left " data-rounded="medium">
          <thead>
            <tr className="text-xs text-[--title-text-color] *:bg-[--ui-soft-bg] *:p-3 *:font-medium">
              {hasDateField && (
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
              )}
              {tableFields.map(({ name, value }) => {
                const hasSeparator = tableFieldsSeparator.has(value);
                const separatorClassName = hasSeparator ? 'border-r-2' : '';
                const classNames = `text-right text-nowrap first:rounded-l-[--card-radius] last:rounded-r-[--card-radius] ${separatorClassName}`;

                return (
                  <th key={value} className={classNames}>
                    <ColumOrder
                      direction={orderDirection}
                      active={orderField === value.toUpperCase()}
                      onChange={changeColumnOrderHandler(value.toUpperCase() as StatisticOrderingKey)}
                      className="justify-end"
                      align="right"
                    >
                      {name}
                    </ColumOrder>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody
            className="align-top text-xs pt-1 [--ui-soft-bg:theme(colors.gray.50)] dark:[--ui-soft-bg:theme(colors.gray.925)]"
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
                  {date && (
                    <td>
                      {/* {format(date, 'LLL dd, y')} */}
                      {format(date, 'dd.MM.y')}
                    </td>
                  )}
                  {tableFields.map(({ name, value }) => {
                    const keyValue = stats[value as StatisticCustomAdItemKeys] ?? 0;
                    const toFixed = statisticValueToFix[value];
                    const fieldValue = Number.isNaN(toFixed) || !keyValue ? keyValue : keyValue.toFixed(toFixed);
                    const hasSeparator = tableFieldsSeparator.has(value);
                    const separatorClassName = hasSeparator ? 'border-r-2' : '';
                    const classNames = `text-right ${separatorClassName}`;

                    return (
                      <td key={name} className={classNames}>
                        {fieldValue}
                      </td>
                    );
                  })}
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
