// SPDX-License-Identifier: AGPL-3.0-or-later

import { ActionIcon, type ActionIconVariant, Tooltip } from "@mantine/core";
import type { ReactNode } from "react";

export interface ActionIconRadioGroupProps {
  items: ActionIconRadioGroupItem[];
  selectedItemID: string;
  onSelectedItemIDChange: (selectedItemID: string) => void;
  selectedVariant?: ActionIconVariant
  unselectedVariant?: ActionIconVariant
}

export type ActionIconRadioItemID = string;

export interface ActionIconRadioGroupItem {
  icon: ReactNode;
  id: string;
  tooltip?: string;
  ariaLabel?: string;
}

export function ActionIconRadioGroup({
  items,
  selectedItemID,
  onSelectedItemIDChange,
  selectedVariant = "outline",
  unselectedVariant = "default"
}: ActionIconRadioGroupProps) {
  return (
    <ActionIcon.Group>
      {items.map((item) => (
        <Tooltip label={item.tooltip} key={item.id}>
          <ActionIcon
            variant={selectedItemID === item.id ? selectedVariant : unselectedVariant}
            size="input-xs"
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