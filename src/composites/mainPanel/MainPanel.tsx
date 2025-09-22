// SPDX-License-Identifier: AGPL-3.0-or-later

import { filteredDevicesAtom } from "@data/filters.ts";
import { useAtomValue } from "@zedux/react";
import DeviceList from "@composites/mainPanel/DeviceList.tsx";
import { Tabs, Text } from "@mantine/core";
import { IconGridView, IconOverlayView } from "@theming/Icons.tsx";
import { useCallback, useState, useTransition } from "react";
import StickyTabsListWrapper from "@components/tabs/StickyTabsListWrapper.tsx";
import TabListWithRightSide from "@components/tabs/TabListWithRightSide.tsx";
import { DeviceListGroupingSelector } from "@composites/mainPanel/DeviceListGroupingSelector.tsx";
import type { DeviceGrouping, DeviceView } from "@composites/mainPanel/mainPanelTypes.ts";
import { useScaleResults } from "@composites/mainPanel/useScaleResults.tsx";
import { useDebouncedValue } from "@mantine/hooks";
import { OverlayPanel } from "./OverlayPanel";
import { baseResolutionAtom } from "@data/baseResolution.ts";


export default function MainPanel() {
  const filteredDevices = useAtomValue(filteredDevicesAtom);
  const [activeTab, setActiveTab] = useState<DeviceView>("overlay");
  const [activeGrouping, setActiveGrouping] = useState<DeviceGrouping>("screen-resolutions");
  const [deferredActiveGrouping, setDeferredActiveGrouping] = useState<DeviceGrouping>(activeGrouping);
  
  const baseResolution = useAtomValue(baseResolutionAtom);
  
  const individualResults = useScaleResults(
    {
      baseResolution,
      devices: filteredDevices,
      grouping: "devices"
    });
  
  const screenResolutionResults = useScaleResults(
    {
      baseResolution,
      devices: filteredDevices,
      grouping: "screen-resolutions"
    });
  
  const activeResultsItems = deferredActiveGrouping === "devices" ? individualResults : screenResolutionResults;
  const [ debouncedActiveResultsItems ] = useDebouncedValue(activeResultsItems, 500, { leading: true })
  const [, startTransition] = useTransition();
  
  const handleOnGroupingChanged = useCallback((newValue: DeviceGrouping) => {
    setActiveGrouping(newValue);
    startTransition(() => {
      setDeferredActiveGrouping(newValue);
      // return new Promise(resolve => setTimeout(resolve, 3000));
    })
  }, [setActiveGrouping, startTransition, setDeferredActiveGrouping])
  
  return (
    <Tabs
      value={activeTab}
      onChange={newValue => setActiveTab((newValue ?? "individual") as DeviceView)}
      keepMounted={true}
    >
      <StickyTabsListWrapper>
        <TabListWithRightSide
          style={{
            paddingLeft: "var(--mantine-spacing-sm)",
            paddingRight: "var(--mantine-spacing-sm)",
          }}
          rightSide={
            <>
              {activeTab === "individual" &&
                <DeviceListGroupingSelector
                  value={activeGrouping}
                  onChanged={handleOnGroupingChanged}
                  devicesLength={individualResults.length}
                  screenSizesLength={screenResolutionResults.length}
                />
              }
            </>
          }
        >
            <Tabs.Tab value="overlay" leftSection={<IconOverlayView size="md"/>}>
              <Text size="md">Overlay</Text>
            </Tabs.Tab>
            <Tabs.Tab value="individual" leftSection={<IconGridView size="md"/>}>
              <Text size="md">Individual</Text>
            </Tabs.Tab>
        </TabListWithRightSide>
      </StickyTabsListWrapper>
      
      <Tabs.Panel value="individual" pt="md">
        <div style={{ position: "relative" }}>
          <DeviceList resultItems={debouncedActiveResultsItems} isNumberOfDevicesVisible={deferredActiveGrouping === "screen-resolutions"}/>
        </div>
      </Tabs.Panel>
      
      <Tabs.Panel value="overlay">
        <OverlayPanel resultItems={screenResolutionResults}/>
      </Tabs.Panel>
    </Tabs>
  )
}