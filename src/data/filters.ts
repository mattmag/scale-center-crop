// SPDX-License-Identifier: AGPL-3.0-or-later

import { type Device, isSpecificDevice } from "@data/deviceTypes.ts";
import type { BuiltinFilterDefinitions } from "@filtering/filterFactories.ts";
import { buildFilters } from "@filtering/core.ts";
import devicesAtom from "@data/dataSource.ts";

const filters: BuiltinFilterDefinitions<Device>[] = [
  {
    key: "screen-size",
    kind: "bounded-span",
    label: "Screen Size",
    helpText: "The diagonal measurement of the screen, in inches.",
    getValue: device => device.display.diagonal,
    step: 0.1,
    formattingDecimals: 1,
    formattingSuffix: "in"
  },
  {
    key: "year-issued",
    kind: "bounded-span",
    label: "Year of Release",
    helpText: "The year that the device was first released. Non-specific devices (like PC monitor resolutions) are always included.",
    getValue: device => (isSpecificDevice(device) ? device.modelInfo.yearOfRelease : undefined),
    step: 1,
    formattingDecimals: 0,
    valueUndefinedBehavior: "include"
  },
  {
    key: "device-class",
    kind: "select",
    label: "Device Class",
    selectionMode: "multi",
    valueUndefinedBehavior: "include",
    helpText: "A broad description of the type of device",
    getValue: device => device.deviceClass,
  }
];

export const { filteredItemsAtom: filteredDevicesAtom, filterInstances: deviceFilterInstances } = buildFilters(filters, devicesAtom);
