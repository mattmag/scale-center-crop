// SPDX-License-Identifier: AGPL-3.0-or-later

import { atom } from "@zedux/react";
import type { Size } from "./deviceTypes";

export const baseResolutionAtom = atom<Size>("base-resolution", { width: 320, height: 240})