// SPDX-License-Identifier: AGPL-3.0-or-later

import { deviceFilterInstances } from "@data/filters";
import { getFilterComponent } from "@filtering/filterComponentFactories.tsx";


export default function DeviceFilterPanel() {
  return (
    <>
      {deviceFilterInstances.map(instance => getFilterComponent(instance))}
    </>
  )
}