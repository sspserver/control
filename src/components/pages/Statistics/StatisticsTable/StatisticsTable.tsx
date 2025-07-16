import type { Ordering, StatisticOrderingKey } from '@/generated/graphql';
import type { StatisticCustomAdItemKeys, StatisticPageInfo, StatisticsCustomAd } from '@/types/statistic';

import { StatisticKey } from '@/generated/graphql';
import ColumOrder from '@components/ColumOrder';
import { statisticValueToFix } from '@components/pages/Statistics/Statistics.const';
import useStatisticsTable from '@components/pages/Statistics/StatisticsTable/useStatisticsTable';
import Pagination from '@components/Pagination/Pagination';
import Card from '@tailus-ui/Card';
import { format } from 'date-fns';
import {
  tableFields,
  tableFieldsSeparator,
  tableGroupFields,
} from './StatisticsTable.const';

type StatisticsTableProps = {
  data: StatisticsCustomAd;
  pageInfo?: StatisticPageInfo;
  pageSize?: number;
  onOrderChange: (field: StatisticOrderingKey, direction?: Ordering) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  groupByField: StatisticKey;
  orderField: StatisticOrderingKey | null;
  orderDirection: Ordering | null | undefined;
};

function StatisticsTable({
  groupByField,
  orderField,
  orderDirection,
  data,
  pageInfo,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onOrderChange,
}: StatisticsTableProps) {
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
              <th className="rounded-l-[--card-radius]">
                <ColumOrder
                  className="-ml-0"
                  direction={orderDirection}
                  active={orderField === (groupByField.toString() as StatisticOrderingKey)}
                  onChange={changeColumnOrderHandler(groupByField.toString() as StatisticOrderingKey)}
                >
                  {tableGroupFields.find(it => it.value === groupByField)?.name || groupByField}
                </ColumOrder>
              </th>
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
            {data?.map((stats, index) => {
              const groupField = stats.keys?.find(it => it.key === groupByField) || { value: '', text: '' };
              const key = `${groupField?.value}-${index}`;
              return (
                <tr
                  key={key}
                  className="*:p-3 [&:not(:last-child)>*]:border-b border-l-2 border-transparent"
                >
                  <td>
                    {groupByField === StatisticKey.Datemark
                      ? format(groupField?.value || '2000-01-01', 'dd.MM.y')
                      : (
                          groupByField === StatisticKey.Timemark
                            ? format(new Date(groupField?.value || '2000-01-01'), 'dd.MM.y HH:mm:ss')
                            : groupField?.text || groupField?.value
                        )}
                  </td>
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
