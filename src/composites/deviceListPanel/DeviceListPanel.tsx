// SPDX-License-Identifier: AGPL-3.0-or-later

import { Text } from "@mantine/core"
import { filteredDevicesAtom } from "@data/filters.ts";
import { useAtomValue } from "@zedux/react";

export default function DeviceListPanel() {
  const filteredDevices = useAtomValue(filteredDevicesAtom)
  return (
    <Text>Devices: {filteredDevices.length}</Text>
  )
}