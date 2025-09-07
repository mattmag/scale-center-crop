// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Device } from "@data/deviceTypes.ts";
import type { BuiltinFilterDefinitions } from "@filtering/filters.ts";
import { buildFilters } from "@filtering/core.ts";
import devicesAtom from "@data/dataSource.ts";

const filters: BuiltinFilterDefinitions<Device>[] = [
  {
    key: "screen-size",
    kind: "bounded-span",
    label: "Screen Size",
    getValue: device => device.display.diagonal,
    step: 0.1,
    formattingDecimals: 1,
    formattingSuffix: "in"
  }
];

export const { filteredItemsAtom, filterInstances } = buildFilters(devicesAtom, filters);
