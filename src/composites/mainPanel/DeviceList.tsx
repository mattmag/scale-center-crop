// SPDX-License-Identifier: AGPL-3.0-or-later

import { GridList } from "@components/gridList/GridList";
import { useFilteredSelectedIDs } from "@components/gridList/useFilteredSelectedIDs";
import { ItemWrapper } from "@components/gridList/ItemWrapper.tsx";
import {
  Badge,
  Box,
  Group,
  Stack,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme
} from "@mantine/core";
import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { useEffect } from "react";
import { useSidePanelContent } from "@composites/sidePanel/useSidePanelContent.ts";
import { SingleOverlay } from "@components/pictograms/SingleOverlay.tsx";


export interface DeviceListProps {
  results: ScaleResultItem[];
  isNumberOfDevicesVisible: boolean;
}

export default function DeviceList({ results, isNumberOfDevicesVisible } : DeviceListProps) {
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
      cols={{ base: 2, sm: 3, lg: 4, xl: 5}}>
      {results.map((result) => 
        <GridList.Item key={result.key} id={result.key}>
          <DeviceCard resultItem={result} isNumberOfDevicesVisible={isNumberOfDevicesVisible}/>
        </GridList.Item>
      )}
    </GridList>
  )
}

type DeviceCardProps = {
  resultItem: ScaleResultItem
  isNumberOfDevicesVisible: boolean
};

function DeviceCard({
  resultItem,
  isNumberOfDevicesVisible
}: DeviceCardProps) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  return (
    <ItemWrapper>
      <Box w={"100%"} h={"100%"} p={"sm"} style={{ boxSizing: "border-box" }}>
        <Stack gap={0}>
          <SingleOverlay
            aspectRatio={(320 / 240).toString()}
            screenResolution={resultItem.result.screenResolution}
            scaledBaseResolution={resultItem.result.scaledBaseResolution}
            drawingScale={resultItem.drawingScale}
            screenColor={colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[3]}
            scaledResolutionColor={"#ad9191"}
          />
          <Group gap={"xs"} justify={"start"}>
            <Tooltip label="Scale Factor">
              <Badge size={"xs"} color="teal" variant="light" display="block">{resultItem.result.scaleFactor}×</Badge>
            </Tooltip>
            <Tooltip label="Coverage">
              <Badge size={"xs"} color="grape" variant="light" display="block">{(100 * resultItem.result.croppedAreaPercentage).toFixed(0)}%</Badge>
            </Tooltip>
            {isNumberOfDevicesVisible &&
              <Tooltip label={"Devices"}>
                <Badge size={"xs"} color="orange" variant="light">{resultItem.devices.length}●</Badge>  
              </Tooltip>
            }
          </Group>
        </Stack>
      </Box>
    </ItemWrapper>
  );
};