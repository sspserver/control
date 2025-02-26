import type { StatisticAdItem } from '@/generated/graphql';
import { StatisticKey } from '@/generated/graphql';
import { vTooltip as tooltip, type VTooltipProps as TooltipVariants } from '@tailus/themer';
import { format } from 'date-fns';
import React from 'react';

type PayloadEntry = {
  name: string;
  value: number;
  color: string;
  payload: StatisticAdItem;
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
  const payloadKeys = firstPayload?.payload?.keys ?? [];
  const payloadKeyDate = payloadKeys.find(({ key }) => key === StatisticKey.Datemark);
  const eventDate = payloadKeyDate?.value;
  const tooltipLabel = eventDate ? format(eventDate, 'LLL dd, y') : label;

  if (active && payload && payload.length) {
    return (
      <div role="tooltip" className={root({ fancy, mixed, className })}>
        <span className={title({ className: 'text-xs' })}>{tooltipLabel}</span>
        <div role="separator" className={separator({ fancy, className: 'p-0 my-2' })} />

        <div className={content()}>
          {payload.map((entry: PayloadEntry) => (
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
                <span className={entryName()}>{entry.name}</span>
              </div>
              <span className={entryValue()}>{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

CustomTooltip.displayName = 'CustomTooltip';
export default CustomTooltip;
