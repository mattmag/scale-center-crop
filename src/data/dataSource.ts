// SPDX-License-Identifier: AGPL-3.0-or-later

import { itemsSourceAtom } from "@filtering/core.ts"
import * as RawDevices from "./devices.json"
import type { Device } from "./deviceTypes.ts";

const Devices: Device[] = RawDevices as Device[];

const devicesAtom = itemsSourceAtom("devices", Devices);

export default devicesAtom;