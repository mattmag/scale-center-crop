// SPDX-License-Identifier: AGPL-3.0-or-later

import { ActionIcon, Tooltip } from "@mantine/core";
import type { ReactNode } from "react";

export interface ActionIconRadioGroupProps {
  items: ActionIconRadioGroupItem[];
  selectedItemID: string;
  onSelectedItemIDChange: (selectedItemID: string) => void;
}

export type ActionIconRadioItemID = string;

export interface ActionIconRadioGroupItem {
  icon: ReactNode;
  id: string;
  tooltip?: string;
  ariaLabel?: string;
}

export function ActionIconRadioGroup({items, selectedItemID, onSelectedItemIDChange}: ActionIconRadioGroupProps) {
  return (
    <ActionIcon.Group>
      {items.map((item) => (
        <Tooltip label={item.tooltip} key={item.id}>
          <ActionIcon
            variant={selectedItemID === item.id ? "outline" : "default"}
            size="lg"
            aria-label={item.ariaLabel ?? item.tooltip ?? undefined}
            onClick={() => onSelectedItemIDChange(item.id)}
          >
            {item.icon}
          </ActionIcon>
        </Tooltip>
      ))}
    </ActionIcon.Group>
  )
}