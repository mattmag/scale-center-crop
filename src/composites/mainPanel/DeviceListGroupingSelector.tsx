// SPDX-License-Identifier: AGPL-3.0-or-later

import { Group, SegmentedControl, Text } from "@mantine/core";
import { IconGroupByDevice, IconGroupByScreenResolution } from "@theming/Icons.tsx";
import type { DeviceGrouping } from "@composites/mainPanel/mainPanelTypes.ts";

export interface DeviceListGroupingSelector {
  selected: DeviceGrouping;
  setSelected: (newValue: DeviceGrouping) => void;
  devicesLength: number;
  screenSizesLength: number;
}

export function DeviceListGroupingSelector({
  selected,
  setSelected,
  devicesLength,
  screenSizesLength
}: DeviceListGroupingSelector) {
  return (
    <SegmentedControl
      radius="lg"
      size="sm"
      value={selected}
      onChange={newValue => setSelected(newValue as DeviceGrouping)}
      data={[
        {
          value: "devices",
          label: (
            <Group wrap="nowrap" gap="0.2rem">
              <IconGroupByDevice size="sm"/>
              <Text visibleFrom="sm" size="xs">Devices</Text>
              <Text size="xs">({devicesLength})</Text>
            </Group>
          )
        },
        {
          value: "screen-resolutions",
          label: (
            <Group wrap="nowrap" gap="0.2rem">
              <IconGroupByScreenResolution size="sm"/>
              <Text visibleFrom="sm" size="xs">Screen Sizes</Text>
              <Text size="xs">({screenSizesLength})</Text>
            </Group>
          )
        }
      ]}
    />
  )
}