// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ReactNode } from "react";
import { Box } from "@mantine/core";

export default function StickyTabsListWrapper({ children }: { children: ReactNode}) {
  return (
    <Box
      style={{
        position: "sticky",
        marginLeft: "calc(-1 * (var(--mantine-spacing-md)))",
        marginRight: "calc(-1 * (var(--mantine-spacing-md)))",
        top: "var(--app-shell-header-offset)",
        background: "var(--mantine-color-body)",
        zIndex: 5,
      }}
    >
      {children}
    </Box>
  )
}