// SPDX-License-Identifier: AGPL-3.0-or-later

import { deviceFilterInstances } from "@data/filters";
import { getFilterComponent } from "@filtering/filterComponentFactories.tsx";
import { FilterLabel } from "@filtering/FilterLabel";
import { Stack } from "@mantine/core";


export default function DeviceFilterPanel() {
  return (
    <>
      <Stack>
        {deviceFilterInstances.map(instance =>
          <Stack gap={0}>
            <FilterLabel label={instance.label} helpText={instance.helpText}/>
            {getFilterComponent(instance)}
          </Stack>
        )}
      </Stack>
    </>
  )
}