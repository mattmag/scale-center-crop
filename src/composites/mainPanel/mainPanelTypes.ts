// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ScaleResult } from "@data/results.ts";
import type { Device } from "@data/deviceTypes.ts";

export type DeviceView = "individual" | "overlay";
export type DeviceGrouping = "devices" | "screen-resolutions";

export interface ScaleResultItem {
  /* A unique key identifying this result item */
  key: string;
  /* The resulting scale data */
  result: ScaleResult;
  /* A computed scale factor to keep all pictograms the same scale in the grid. */
  drawingScale: number;
  /* The devices associated with this result */
  devices: Device[];
}