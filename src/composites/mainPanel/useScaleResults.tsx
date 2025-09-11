// SPDX-License-Identifier: AGPL-3.0-or-later

// SPDX-License-Identifier: AGPL-3.0-or-later

import { getKey, type Device, type Size } from "@data/deviceTypes.ts";
import type { DeviceGrouping, ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { groupBy } from "@util/collections.ts";
import { useMemo } from "react";


export interface UseScaleResultsProps {
  baseResolution: Size;
  devices: Device[];
  grouping: DeviceGrouping;
}


export function useScaleResults({
  baseResolution,
  devices,
  grouping }: UseScaleResultsProps
) : ScaleResultItem[] {
  return useMemo(() => getResultItems(baseResolution, devices, grouping),
    [baseResolution, devices, grouping]);
}


export function getResultItems(
  baseResolution: Size,
  devices: Device[],
  grouping: DeviceGrouping
) : ScaleResultItem[] {
  const largestDeviceDimension = Math.max(
    ...devices
      .flatMap(device => [device.display.resolution.width, device.display.resolution.height])
  );
  const groups = getGroupedDevices(devices, grouping);
  return groups.map(group => calculateResult(baseResolution, group, largestDeviceDimension));
}


export function getGroupedDevices(devices: Device[], grouping: DeviceGrouping): GroupedDevices[] {
  switch (grouping) {
    case "devices":
      return devices.map(device => ({
        key: getKey(device),
        screenResolution: device.display.resolution,
        devices: [device],
      }));
    case "screen-resolutions":
      return Array.from(
        groupBy(devices, 
            device => `${device.display.resolution.width}w_${device.display.resolution.height}h`
        )
      ).map(([key, devices]) => ({
        key,
        screenResolution: devices[0].display.resolution,
        devices: devices
      }));
  }
}

interface GroupedDevices {
  key: string;
  screenResolution: Size;
  devices: Device[];
}


function calculateResult(
  baseResolution: Size,
  group: GroupedDevices,
  largestDeviceDimension: number
): ScaleResultItem {
  const minimumWidthScale = group.screenResolution.width / baseResolution.width;
  const minimumHeightScale = group.screenResolution.height / baseResolution.height;
  const scaleFactor = Math.ceil(Math.max(minimumWidthScale, minimumHeightScale));
  const scaledBaseResolution: Size = {
    width: baseResolution.width * scaleFactor,
    height: baseResolution.height * scaleFactor
  }
  const drawingScale = Math.min(1.0, Math.max(scaledBaseResolution.width, scaledBaseResolution.height) / largestDeviceDimension);
  const croppedArea = group.screenResolution;
  const cropMarginX = (scaledBaseResolution.width - group.screenResolution.width) / 2;
  const cropMarginY = (scaledBaseResolution.height - group.screenResolution.height) / 2;
  const croppedAreaPercentage = (group.screenResolution.width * group.screenResolution.height)
    / (scaledBaseResolution.width * scaledBaseResolution.height);
  const wasteAreaPercentage = 1 - croppedAreaPercentage;
  
  return {
    key: group.key,
    devices: group.devices,
    result: {
      baseResolution: baseResolution,
      screenResolution: group.screenResolution,
      scaleFactor,
      croppedArea,
      cropMarginX,
      cropMarginY,
      croppedAreaPercentage,
      wasteAreaPercentage,
      scaledBaseResolution
    },
    drawingScale: drawingScale
  }
}