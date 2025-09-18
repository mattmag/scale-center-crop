// SPDX-License-Identifier: AGPL-3.0-or-later

import { Group, Text, Tooltip, useMantineTheme } from "@mantine/core";

export interface FilterLabelProps {
  label: string;
  helpText: string;
}

export function FilterLabel({ label, helpText}: FilterLabelProps) {
  const theme = useMantineTheme();
  return (
    <Group justify="start" align="center" gap={4}>
      <Text size="md">{label}</Text>
      <Tooltip label={helpText} events={{ focus: true, hover: true, touch: true }}>
        <Text size="sm" c={theme.colors.dark[2]} tabIndex={0} style={{ cursor: "help" }}>ⓘ</Text>
      </Tooltip>
    </Group>
  )
}