// SPDX-License-Identifier: AGPL-3.0-or-later

import { GridList } from "@components/gridList/GridList";
import { useFilteredSelectedIDs } from "@components/gridList/useFilteredSelectedIDs";
import { ItemWrapper } from "@components/gridList/ItemWrapper.tsx";
import { Badge, Box, Group, Stack, Tooltip } from "@mantine/core";
import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { useEffect } from "react";
import { useSidePanelContent } from "@composites/sidePanel/useSidePanelContent.ts";
import { SingleOverlay } from "@components/pictograms/SingleOverlay.tsx";
import { usePictogramColors } from "@components/pictograms/styles.ts";


export interface DeviceListProps {
  resultItems: ScaleResultItem[];
  isNumberOfDevicesVisible: boolean;
}

export default function DeviceList({ resultItems, isNumberOfDevicesVisible } : DeviceListProps) {
  const [selectedIDs, setSelectedIDs] = useFilteredSelectedIDs(
    {
      filteredItems: resultItems,
      getId: result => result.key
    });
  
  const { setContent: setSidePanelContent } = useSidePanelContent();
  
  useEffect(() => {
    setSidePanelContent(resultItems.filter(result => selectedIDs.has(result.key))[0] ?? null)
  }, [setSidePanelContent, selectedIDs, resultItems]);

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
      {resultItems.map((result) => 
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
  const pictogramColors = usePictogramColors();
  return (
    <ItemWrapper>
      <Box w={"100%"} h={"100%"} p={"sm"} style={{ boxSizing: "border-box" }}>
        <Stack gap="xs">
          <SingleOverlay
            aspectRatio={Math.max(1, resultItem.result.baseResolution.width / resultItem.result.baseResolution.height).toString()}
            // aspectRatio={"1 / 1"}
            screenResolution={resultItem.result.screenResolution}
            scaledBaseResolution={resultItem.result.scaledBaseResolution}
            drawingScale={resultItem.drawingScale}
            screenColor={pictogramColors.screenResolutionColor}
            scaledResolutionColor={pictogramColors.scaledBaseResolutionColor}
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