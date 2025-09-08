// SPDX-License-Identifier: AGPL-3.0-or-later

import { filteredDevicesAtom } from "@data/filters.ts";
import { useAtomValue } from "@zedux/react";
import DeviceList from "@composites/mainPanel/DeviceList.tsx";
import { Tabs, Text } from "@mantine/core";
import { IconGridView, IconOverlayView } from "@theming/Icons.tsx";
import { useState } from "react";
import StickyTabsListWrapper from "@components/tabs/StickyTabsListWrapper.tsx";
import TabListWithRightSide from "@components/tabs/TabListWithRightSide.tsx";
import { DeviceListGroupingSelector } from "@composites/mainPanel/DeviceListGroupingSelector.tsx";
import type { DeviceGrouping, DeviceView } from "@composites/mainPanel/mainPanelTypes.ts";


export default function MainPanel() {
  const filteredDevices = useAtomValue(filteredDevicesAtom);
  const [activeTab, setActiveTab] = useState<DeviceView>("individual");
  const [activeGrouping, setActiveGrouping] = useState<DeviceGrouping>("devices");
  
  
  return (
    <Tabs
      value={activeTab}
      onChange={newValue => setActiveTab((newValue ?? "individual") as DeviceView)}
      keepMounted={false}
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
                  selected={activeGrouping}
                  setSelected={setActiveGrouping}
                  devicesLength={filteredDevices.length}
                  screenSizesLength={42}
                />
              }
            </>
          }
        >
            <Tabs.Tab value="individual" leftSection={<IconGridView size="md"/>}>
              <Text size="md">Individual</Text>
            </Tabs.Tab>
            <Tabs.Tab value="overlay" leftSection={<IconOverlayView size="md"/>}>
              <Text size="md">Overlay</Text>
            </Tabs.Tab>
        </TabListWithRightSide>
      </StickyTabsListWrapper>
      
      <Tabs.Panel value="individual" pt="md">
        <DeviceList devices={filteredDevices}/>
      </Tabs.Panel>
      
      <Tabs.Panel value="overlay">
        Overlay
      </Tabs.Panel>
    </Tabs>
  )
}