import { Box } from "@mantine/core";
import type { ReactNode } from "react";

export default function TabListRightSide({ children }: { children: ReactNode}) {
  return (
    <Box
      mr="5"
      pb="3"
      style={{
        position: "absolute",
        insetInlineEnd: "var(--mantine-spacing-sm)",
        top: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  )
}