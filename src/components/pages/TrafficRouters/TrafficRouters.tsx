'use client';

import { ActiveStatus } from '@/generated/graphql';
import PageLoadSpinner from '@components/PageLoadSpinner';
import TrafficRouteActions from '@components/pages/TrafficRouters/TrafficRouteActions/TrafficRouteActions';
import Badge from '@tailus-ui/Badge';
import Card from '@tailus-ui/Card';
import IndicatorBadge from '@tailus-ui/IndicatorBadge';
import { Caption, Title } from '@tailus-ui/typography';
import { format } from 'date-fns';
import React from 'react';
import TrafficRoutersEmptyState from './TrafficRoutersEmptyState';
import useTrafficRouters from './useTrafficRouters';

function TrafficRouters() {
  const {
    trafficRoutersList,
    trafficRoutersListError,
    isTrafficRoutersLoading,
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

  if (isTrafficRoutersLoading) {
    return <PageLoadSpinner />;
  }

  if (isTrafficRoutersListEmpty) {
    return (<TrafficRoutersEmptyState />);
  }

  return (
    <Card fancy className="p-4">
      <table className="border-collapse table-auto w-full text-left" data-rounded="medium">
        <thead>
          <tr className="text-sm text-[--title-text-color] *:bg-[--ui-soft-bg] *:p-3 *:font-medium">
            <th className="rounded-l-[--card-radius]"></th>
            <th>Routes</th>
            <th>Date</th>
            <th className="rounded-r-[--card-radius] text-right"></th>
          </tr>
        </thead>
        <tbody className="align-top text-sm pt-1 [--ui-soft-bg:theme(colors.gray.50)] dark:[--ui-soft-bg:theme(colors.gray.925)]">
          {trafficRoutersList?.map(({ ID, active, title, description, applications, RTBSources, updatedAt }) => {
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
                        <Title>
                          {title}
                        </Title>
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
                  <div className="flex gap-2 items-baseline pb-2">
                    <span>
                      RTBSources:
                    </span>
                    {' '}
                    {RTBSources?.map(({ title, ID, active }) =>
                      (
                        <Badge key={ID} size="sm" intent="gray" className="flex items-center gap-1">
                          <IndicatorBadge intent={active === ActiveStatus.Active ? 'success' : 'warning'} />
                          {title}
                        </Badge>
                      ),
                    )}
                  </div>

                  <div>
                    Applications:
                    {' '}
                    {applications?.join(', ')}
                  </div>

                </td>
                <td>
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
  );
}

export default TrafficRouters;
