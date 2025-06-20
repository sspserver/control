import { ActiveStatus } from '@/generated/graphql';
import ColumOrder from '@components/ColumOrder';
import PageLoadSpinner from '@components/PageLoadSpinner';
import TrafficRouteActions from '@components/pages/TrafficRouters/TrafficRouteActions/TrafficRouteActions';
import Pagination from '@components/Pagination/Pagination';
import Badge from '@tailus-ui/Badge';
import Card from '@tailus-ui/Card';
import IndicatorBadge from '@tailus-ui/IndicatorBadge';
import { Caption, Text } from '@tailus-ui/typography';
import { format } from 'date-fns';
import React from 'react';
import TrafficRoutersEmptyState from './TrafficRoutersEmptyState';
import useTrafficRouters from './useTrafficRouters';

function TrafficRouters() {
  const {
    orderDirection,
    orderField,
    pageInfo,
    countPageSize,
    pagination,
    trafficRoutersList,
    trafficRoutersListError,
    isTrafficRoutersLoading,
    isPaginationLoading,
    changePageHandler,
    changePageSizeHandler,
    changeColumnOrderHandler,
  } = useTrafficRouters();
  const isTrafficRoutersListEmpty = (!trafficRoutersList && !trafficRoutersListError && !isTrafficRoutersLoading) || !trafficRoutersList?.length;

  if (trafficRoutersListError) {
    return (
      <p>
        Error:
        {trafficRoutersListError.message}
      </p>
    );
  }

  if (isTrafficRoutersLoading && !isPaginationLoading) {
    return <PageLoadSpinner />;
  }

  if (isTrafficRoutersListEmpty) {
    return (<TrafficRoutersEmptyState />);
  }

  return (
    <div className="pt-6">
      <Pagination
        size={`${pagination.size}`}
        current={pageInfo?.page}
        total={countPageSize}
        onChangeSize={changePageSizeHandler}
        onChange={changePageHandler}
      />
      <Card fancy className="p-4 mt-4">
        <table className="border-collapse table-fixed w-full text-left" data-rounded="medium">
          <thead>
            <tr className="text-sm text-[--title-text-color] *:bg-[--ui-soft-bg] *:p-3 *:font-medium">
              <th className="rounded-l-[--card-radius]"></th>
              <th>RTB Sources</th>
              <th>Applications</th>
              <th className="text-right text-nowrap">
                <ColumOrder
                  direction={orderDirection}
                  active={orderField === 'percent'}
                  onChange={changeColumnOrderHandler('percent')}
                  className="justify-end"
                  align="right"
                >
                  Percent %
                </ColumOrder>
              </th>
              <th>
                <ColumOrder
                  direction={orderDirection}
                  active={orderField === 'createdAt'}
                  onChange={changeColumnOrderHandler('createdAt')}
                >
                  Date
                </ColumOrder>
              </th>
              <th className="rounded-r-[--card-radius] text-right"></th>
            </tr>
          </thead>
          <tbody className="align-top text-sm pt-1 [--ui-soft-bg:theme(colors.gray.50)] dark:[--ui-soft-bg:theme(colors.gray.925)]">
            {trafficRoutersList?.map(({ ID, percent, active, title, description, applications, RTBSources, updatedAt }) => {
              return (
                <tr
                  key={ID}
                  className="*:p-3 [&:not(:last-child)>*]:border-b border-l-2 border-transparent"
                >
                  <td>
                    <div className="flex">
                      <div className="pt-1 pr-2">
                        <IndicatorBadge intent={active === ActiveStatus.Active ? 'success' : 'warning'} />
                      </div>
                      <div>
                        {title && (
                          <Text as="div" size="sm" weight="bold">
                            {title}
                          </Text>
                        )}
                        {description && (
                          <Caption as="div">
                            {description}
                          </Caption>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap max-w-sm">
                      {RTBSources?.map(({ title, ID, active }) =>
                        (
                          <Badge key={ID} size="sm" intent="gray" className="flex items-center gap-1">
                            <IndicatorBadge intent={active === ActiveStatus.Active ? 'success' : 'warning'} />
                            {title}
                          </Badge>
                        ),
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-1 flex-wrap max-w-sm">
                      {applications?.map(({ title, ID, active }) =>
                        (
                          <Badge key={ID} size="sm" intent="gray" className="flex items-center gap-1">
                            <IndicatorBadge intent={active === ActiveStatus.Active ? 'success' : 'warning'} />
                            {title}
                          </Badge>
                        ),
                      )}
                    </div>
                  </td>
                  <td className="text-right">{percent}</td>
                  <td className="text-nowrap">
                    {format(updatedAt, 'LLL dd, y')}
                  </td>
                  <td>
                    <TrafficRouteActions
                      pause={active === ActiveStatus.Paused}
                      id={ID}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default TrafficRouters;
