// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSidePanelContent } from "@composites/sidePanel/useSidePanelContent.ts";
import { type Device, getFriendlyName, getKey, isStandaloneDevice } from "@data/deviceTypes";
import { Accordion, Badge, Center, Select, Stack, Table } from "@mantine/core";
import { groupBy } from "@util/collections.ts";
import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { useEffect, useState } from "react";

export function SidePanel() {
  const { content } = useSidePanelContent();
  return (
    <>
      {content ? (
        <Accordion defaultValue={["summary", "devices"]} multiple>
          <Accordion.Item key={"summary"} value={"summary"}>
            <Accordion.Control>Summary</Accordion.Control>
            <Accordion.Panel>
              <SummarySubPanel resultItem={content} />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"usable-area"} value={"usable-area"}>
            <Accordion.Control>Usable Area</Accordion.Control>
            <Accordion.Panel>
              <UsableAreaSubPanel resultItem={content} />
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item key={"devices"} value={"devices"}>
            <Accordion.Control>Devices</Accordion.Control>
            <Accordion.Panel>
              <DevicesSubPanel resultItem={content}/>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ) : (
        <Center>Select a Device</Center>
      )}
    </>
  )
}

interface SummarySubPanelProps {
  resultItem: ScaleResultItem
}

function SummarySubPanel({ resultItem }: SummarySubPanelProps) {
  const minScreenSize = resultItem.devices.reduce((min, dev) => Math.min(min, dev.display.diagonal), Infinity);
  const maxScreenSize = resultItem.devices.reduce((max, dev) => Math.max(max, dev.display.diagonal), -Infinity);
  const screenSizeRange =  Math.abs(maxScreenSize - minScreenSize) < 0.1
    ? `${minScreenSize.toFixed(1)} in`
    : `${minScreenSize.toFixed(1)} in – ${maxScreenSize.toFixed(1)} in`;
  return (
    <Table variant="vertical">
      <Table.Tbody>
        <Table.Tr>
          <Table.Th w="33%">Resolution</Table.Th>
          <Table.Td>{resultItem.result.screenResolution.width} × {resultItem.result.screenResolution.height}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Scale Factor</Table.Th>
          <Table.Td>
            <Badge size={"md"} color="teal" variant="light" display="block">{resultItem.result.scaleFactor}×</Badge>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Coverage</Table.Th>
          <Table.Td>
            <Badge size={"md"} color="grape" variant="light" display="block">{(100 * resultItem.result.croppedAreaPercentage).toFixed(0)}%</Badge>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Devices</Table.Th>
          <Table.Td>
            <Badge size={"md"} color="orange" variant="light">{resultItem.devices.length}●</Badge>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Screen Sizes</Table.Th>
          <Table.Td>
            {screenSizeRange}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}


interface UsableAreaSubPanelProps {
  resultItem: ScaleResultItem
}

function UsableAreaSubPanel({ resultItem }: UsableAreaSubPanelProps) {
  return (
    <Table variant="vertical">
      <Table.Tbody>
        <Table.Tr>
          <Table.Th>Usable Area</Table.Th>
          <Table.Td>{Math.floor(resultItem.result.croppedArea.width)} × {Math.floor(resultItem.result.croppedArea.height)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Waste</Table.Th>
          <Table.Td>{(100 * resultItem.result.wasteAreaPercentage).toFixed(0)}%</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>X Margin</Table.Th>
          <Table.Td>{Math.round(resultItem.result.cropMarginX)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Th>Y Margin</Table.Th>
          <Table.Td>{Math.round(resultItem.result.cropMarginY)}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}

interface DeviceSubPanelProps {
  resultItem: ScaleResultItem
}

function DevicesSubPanel({ resultItem } : DeviceSubPanelProps) {
  const [selectedDevice, setSelectedDevice] = useState<Device>(resultItem.devices[0]);
  
  useEffect(() => {
    setSelectedDevice(resultItem.devices[0]);
  }, [resultItem]);
  
  return (
    <Stack>
      <Select
        data={
          Array.from(groupBy(resultItem.devices, item => item.deviceClass).entries())
            .map(([k, v]) => ({
              group: k,
              items: v.map(device => ({ value: getKey(device), label: getFriendlyName(device) })),
            })
          )}
        value={getKey(selectedDevice)}
        onChange={key => setSelectedDevice(resultItem.devices.find(d => getKey(d) === key)!)}
        searchable
        nothingFoundMessage="No results."
        allowDeselect={false}
      />
      <Table variant="vertical">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w="33%">Device Class</Table.Th>
            <Table.Td>{selectedDevice.deviceClass}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Screen Size</Table.Th>
            <Table.Td>{selectedDevice.display.diagonal.toFixed(1)} in</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Pixel Density</Table.Th>
            <Table.Td>{selectedDevice.display.density}</Table.Td>
          </Table.Tr>
          {isStandaloneDevice(selectedDevice) && (
            <Table.Tr>
              <Table.Th>Operating System</Table.Th>
              <Table.Td>{selectedDevice.operatingSystem.name} {selectedDevice.operatingSystem.version}</Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Stack>
  )
}