import type { StatisticCustomAdItem } from '@/types/statistic';
import type { VTooltipProps as TooltipVariants } from '@tailus/themer';
import { statisticValueToFix } from '@components/pages/Statistics/Statistics.const';
import { vTooltip as tooltip } from '@tailus/themer';
import { format } from 'date-fns';
import React from 'react';

type PayloadEntry = {
  name: string;
  value: number;
  color: string;
  payload: StatisticCustomAdItem;
};

type CustomTooltipProps = {
  active: boolean;
  payload: PayloadEntry[];
  label: string;
} & React.HTMLAttributes<HTMLDivElement> & TooltipVariants;

const { root, title, separator, content, entry: entryTheme, entryValue, entryNameContainer, entryName, entryIndicator } = tooltip({ fancy: true });

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  mixed,
  fancy,
  className,
}) => {
  if (mixed && fancy) {
    throw new Error('Tooltip cannot be both mixed and fancy');
  }
  const [firstPayload] = payload || [];
  const eventDate = firstPayload?.payload?.date ?? '';
  const tooltipLabel = eventDate ? format(eventDate, 'LLL dd, y') : label;

  if (active && payload && payload.length) {
    return (
      <div role="tooltip" className={root({ fancy, mixed, className })}>
        <span className={title({ className: 'text-xs' })}>{tooltipLabel}</span>
        <div role="separator" className={separator({ fancy, className: 'p-0 my-2' })} />

        <div className={content()}>
          {payload.map((entry: PayloadEntry) => {
            const payloadFieldName = entry.name;
            const payloadFieldValue = entry.value;
            const toFixed = statisticValueToFix[payloadFieldName];
            const fieldValue = Number.isNaN(toFixed) ? payloadFieldValue : payloadFieldValue.toFixed(toFixed);

            return (
              <div key={entry.name} className={entryTheme()}>
                <div className={entryNameContainer()}>
                  <div
                    aria-hidden
                    className={entryIndicator()}
                    style={
                      {
                        '--entry-indicator-color': entry.color,
                      } as React.CSSProperties
                    }
                  />
                  <span className={entryName()}>{payloadFieldName}</span>
                </div>
                <span className={entryValue()}>{fieldValue}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.displayName = 'CustomTooltip';
export default CustomTooltip;
