// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Device, Size } from "@data/deviceTypes.ts";

export type DeviceView = "individual" | "overlay";
export type DeviceGrouping = "devices" | "screen-resolutions";


export interface ScaleResult {
  /* The starting, base resolution of the game window, in pixels. */
  baseResolution: Size;
  /* The resolution of the screen */
  screenResolution: Size;
  /* The scale required to expand the base resolution up-to-or-over the device's screen resolution. */
  scaleFactor: number;
  /* The base resolution with the scaleFactor applied. Reported in pixels. */
  scaledBaseResolution: Size;
  /* The area within the base resolution that is visible at the provided scale factor. Reported in pixels */
  croppedArea: Size;
  /* The margin in pixels along the x-axis from the edge of the base resolution to the edge of cropped area */
  cropMarginX: number;
  /* The margin in pixels along the y-axis from the edge of the base resolution to the edge of cropped area */
  cropMarginY: number;
  /* What percentage of the base resolution does the cropped area cover */
  croppedAreaPercentage: number;
  /* What percentage of the base resolution was cropped out */
  wasteAreaPercentage: number;
}


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