// SPDX-License-Identifier: AGPL-3.0-or-later

import {ActionIcon, Paper} from "@mantine/core";
import {useGridListItem} from "@components/gridList/useGridListItem.ts";
import {type ReactNode} from "react";

export interface ItemWrapperTemplateProps {
  children?: ReactNode;
}

export function SquareCardItemWrapper({
  children,
}: ItemWrapperTemplateProps) {
  const { isSelected, toggle } = useGridListItem();

  return (
    <>
      <Paper
        withBorder={false}
        p={0}
        shadow="sm"
        style={{ aspectRatio: "1/1" }}
        onClick={toggle}
      >
        <ActionIcon
          component="div"
          variant={isSelected ? "outline" : "default"}
          styles={{
            root: {
              width: "100%",
              height: "100%",
            }
          }}
          onClick={toggle}
          >
          {children}
        </ActionIcon>
      </Paper>
    </>
  );
}