'use client';

import Select from '@components/Select';
import { Button, Root, Separator, ToggleGroup, ToggleItem } from '@radix-ui/react-toolbar';
import React from 'react';

const statisticsLabels = [
  { value: 'impressions', name: 'Impressions' },
  { value: 'clicks', name: 'Clicks' },
  { value: 'CTR', name: 'CTR' },
  { value: 'profit', name: 'Profit' },
];

function SectionFilter() {
  const [selectedStatisticLabel, setSelectedStatisticLabel] = React.useState('impressions');

  return (
    <Root className="ToolbarRoot" aria-label="Formatting options">
      <ToggleGroup type="multiple" aria-label="Text formatting">
        <Select
          size="sm"
          variant="plain"
          value={selectedStatisticLabel}
          items={statisticsLabels}
          classNameTrigger="text-xs"
          selectItemClassName="text-xs"
          onChange={setSelectedStatisticLabel}
        />
      </ToggleGroup>
      <Separator className="ToolbarSeparator" />
      <ToggleGroup
        type="single"
        defaultValue="center"
        aria-label="Text alignment"
      >
        <ToggleItem
          className="ToolbarToggleItem"
          value="left"
          aria-label="Left aligned"
        >
          333
        </ToggleItem>
        <ToggleItem
          className="ToolbarToggleItem"
          value="center"
          aria-label="Center aligned"
        >
          sss
        </ToggleItem>
        <ToggleItem
          className="ToolbarToggleItem"
          value="right"
          aria-label="Right aligned"
        >
          xxx
        </ToggleItem>
      </ToggleGroup>
      <Separator className="ToolbarSeparator" />

      <Button className="ToolbarButton" style={{ marginLeft: 'auto' }}>
        Share
      </Button>
    </Root>
  );
}

export default SectionFilter;
