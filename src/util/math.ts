// SPDX-License-Identifier: AGPL-3.0-or-later

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}