// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  ActionIcon,
  Flex,
  Group,
  Title,
  Tooltip,
  useComputedColorScheme,
  useMantineTheme
} from "@mantine/core";
import { ThemeModeSelector } from "@composites/headerPanel/ThemeModeSelector.tsx";
import { IconGithub } from "@theming/Icons.tsx";

export function HeaderPanel() {
  const theme = useMantineTheme();
  const computedColorScheme = useComputedColorScheme();
  return (
    <Flex justify="space-between">
      <Title>Scale Center Crop</Title>
      <Group>
        <Group gap="xs">
          <Tooltip label="Respository">
              <ActionIcon
                component="a"
                href="https://github.com/mattmag/scale-center-crop"
                target="_blank"
                variant="light"
                radius="xl"
                color={computedColorScheme === "light" ? theme.black : theme.white}
              >
                <IconGithub size={"sm"}/>
              </ActionIcon>
          </Tooltip>
        </Group>
        <ThemeModeSelector/>
      </Group>
    </Flex>
  )
}