// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Size } from "./deviceTypes";

export interface ScaleResult {
  /* The starting, base resolution of the game window, in pixels. */
  baseResolution: Size;
  /* The resolution of the screen */
  screenResolution: Size;
  /* The scale required to expand the base resolution up-to-or-over the device's screen resolution. */
  scaleFactor: number;
  /* The base resolution with the scaleFactor applied. Reported in pixels. */
  scaledBaseResolution: Size;
  /* The area within the base resolution that is visible after scaling and cropping. Reported in pixels */
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