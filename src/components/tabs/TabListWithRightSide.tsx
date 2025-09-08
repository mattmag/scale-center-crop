// SPDX-License-Identifier: AGPL-3.0-or-later

import { Box, Tabs, type TabsListProps } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import type { ReactNode } from "react";

export interface TabListWithRightSideProps {
  rightSide?: ReactNode
}
export default function TabListWithRightSide({ children, rightSide, style, ...rest }: TabListWithRightSideProps & TabsListProps) {
  const { ref: rightSideRef, width: rightSideWidth } = useElementSize();
  const pad = `calc(${rightSideWidth}px + var(--mantine-spacing-sm))`;
  const mergedStyle = [style, { paddingRight: pad }];
  
  return (
    <Box style={{ position: "relative"}}>
      <Tabs.List
        {...rest}
        style={mergedStyle}
      >
        {children}
      </Tabs.List>
      {rightSide &&
        <Box
          ref={rightSideRef}
          style={{
            position: "absolute",
            insetInlineEnd: "var(--mantine-spacing-sm)",
            top: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {rightSide}
        </Box>
      }
    </Box>
  )
}