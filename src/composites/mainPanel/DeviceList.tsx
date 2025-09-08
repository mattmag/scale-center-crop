// SPDX-License-Identifier: AGPL-3.0-or-later

import { GridList } from "@components/gridList/GridList";
import { useFilteredSelectedIDs } from "@components/gridList/useFilteredSelectedIDs";
import { SquareCardItemWrapper } from "@components/gridList/SquareCardItemWrapper.tsx";
import { Stack, Text } from "@mantine/core";
import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { useEffect } from "react";
import { useSidePanelContent } from "@composites/sidePanel/useSidePanelContent.ts";


export interface DeviceListProps {
  results: ScaleResultItem[]
}

export default function DeviceList({ results } : DeviceListProps) {
  const [selectedIDs, setSelectedIDs] = useFilteredSelectedIDs(
    {
      filteredItems: results,
      getId: result => result.key
    });
  
  const { setContent: setSidePanelContent } = useSidePanelContent();
  
  useEffect(() => {
    setSidePanelContent(results.filter(result => selectedIDs.has(result.key))[0] ?? null)
  }, [setSidePanelContent, selectedIDs, results]);

  // TODO: not stable
  useEffect(() => {
    return () => setSidePanelContent(null);
  }, []);
  
  return (
    <GridList
      selectedIDs={selectedIDs}
      onSelectedIDsChanged={setSelectedIDs}
      selectionMode={"single"}
      cols={{ sm: 2, md: 4, lg: 6}}>
      {results.map((result) => 
        <GridList.Item key={result.key} id={result.key}>
          <DeviceCard
            numberOfDevices={result.devices.length}
            width={result.result.screenResolution.width}
            height={result.result.screenResolution.height}
          />
        </GridList.Item>
      )}
    </GridList>
  )
}

type DeviceCardProps = {
  numberOfDevices: number;
  width: number;
  height: number;
};

function DeviceCard({
  numberOfDevices,
  width,
  height,
}: DeviceCardProps) {
  return (
    <SquareCardItemWrapper>
      <Stack>
        <Text>Devices: {numberOfDevices}</Text>
        <Text>
          {width} × {height}
        </Text>
      </Stack>
    </SquareCardItemWrapper>
  );
};