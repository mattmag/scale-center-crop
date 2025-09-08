// SPDX-License-Identifier: AGPL-3.0-or-later

import { GridList } from "@components/gridList/GridList";
import { useFilteredSelectedIDs } from "@components/gridList/useFilteredSelectedIDs";
import { type Device, getKey } from "@data/deviceTypes.ts";
import { SquareCardItemWrapper } from "@components/gridList/SquareCardItemWrapper.tsx";
import { Stack, Text } from "@mantine/core";



export interface DeviceListProps {
  devices: Device[]
}

export default function DeviceList({ devices } : DeviceListProps) {
  const [selectedIDs, setSelectedIDs] = useFilteredSelectedIDs({ filteredItems: devices, getId: getKey});
  
  return (
    <GridList
      selectedIDs={selectedIDs}
      onSelectedIDsChanged={setSelectedIDs}
      selectionMode={"single"}
      cols={{ sm: 2, md: 4, lg: 6}}>
      {devices.map((device) => 
        <GridList.Item key={getKey(device)} id={getKey(device)}>
          <DeviceCard
            deviceClass={device.deviceClass}
            width={device.display.resolution.width}
            height={device.display.resolution.height}
          />
        </GridList.Item>
      )}
    </GridList>
  )
}

type DeviceCardProps = {
  deviceClass: string;
  width: number;
  height: number;
};

function DeviceCard({
  deviceClass,
  width,
  height,
}: DeviceCardProps) {
  return (
    <SquareCardItemWrapper>
      <Stack>
        <Text>{deviceClass}</Text>
        <Text>
          {width} × {height}
        </Text>
      </Stack>
    </SquareCardItemWrapper>
  );
};