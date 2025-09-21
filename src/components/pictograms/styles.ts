// SPDX-License-Identifier: AGPL-3.0-or-later

import { useComputedColorScheme, useMantineTheme } from "@mantine/core";

export interface PictogramColors {
  scaledBaseResolutionColor: string;
  screenResolutionColor: string;
  screenOverlayOutline: string;
  usableAreaOutline: string;
}

export function usePictogramColors(): PictogramColors {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();
  
  return {
    screenResolutionColor: colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.dark[3],
    scaledBaseResolutionColor: "#ad9191",
    screenOverlayOutline: colorScheme === "dark" ? "#bfbab3" : theme.colors.dark[4],
    usableAreaOutline: theme.colors.orange[7],
  }
}