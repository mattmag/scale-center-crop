// SPDX-License-Identifier: AGPL-3.0-or-later

import { Flex, Text } from "@mantine/core";
import { ThemeModeSelector } from "@composites/headerPanel/ThemeModeSelector.tsx";

export function HeaderPanel() {
  return (
    <Flex justify="space-between">
      <Text size="xl" fw="600">Scale Center Crop</Text>
      <ThemeModeSelector/>
    </Flex>
  )
}