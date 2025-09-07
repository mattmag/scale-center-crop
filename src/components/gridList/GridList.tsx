import { Box, SimpleGrid, type SimpleGridProps } from "@mantine/core";
import type { GridListItemID, GridListSelectionMode } from "./types.ts";
import { GridListContext, type GridListContextValue, useGridList } from "./useGridList";
import { GridListItemContext, type GridListItemContextValue } from "./useGridListItem.ts";
import {
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useCallback
} from "react";


export interface GridListProps extends SimpleGridProps {
  selectedIDs: GridListItemID[];
  onSelectedIDsChanged: (newValue: GridListItemID[]) => void;
  selectionMode?: GridListSelectionMode;
}


export function GridList({
  selectedIDs,
  onSelectedIDsChanged,
  selectionMode = "multiple",
  children,
  ...gridProps
}: GridListProps) {

  const select = useCallback((id: GridListItemID) => {
      if (selectionMode === "single") {
        onSelectedIDsChanged(selectedIDs.includes(id) ? [] : [id]);
      } else if (!selectedIDs.includes(id)) {
        onSelectedIDsChanged([...selectedIDs, id]);
      }
    },
  [selectionMode, selectedIDs, onSelectedIDsChanged]
  );

  const unselect = useCallback((id: GridListItemID) => {
      if (selectionMode === "single") {
        onSelectedIDsChanged([]);
      } else if (selectedIDs.includes(id)) {
        onSelectedIDsChanged(selectedIDs.filter(a => a !== id));
      }
    },
    [selectionMode, selectedIDs, onSelectedIDsChanged]
  );

  const toggle = useCallback((id: GridListItemID) =>
      (selectedIDs.includes(id) ? unselect(id) : select(id)),
    [selectedIDs, select, unselect]
  );

  const context: GridListContextValue = {
    mode: selectionMode,
    selectedIDs,
    select,
    unselect,
    toggle
  };

  return (
    <GridListContext.Provider value={context}>
      <SimpleGrid
        role={selectionMode === "single" ? "radiogroup" : "group"}
        {...gridProps}
      >
        {children}
      </SimpleGrid>
    </GridListContext.Provider>
  );
}


export type GridListItemProps = {
  id: GridListItemID;
  wrapperProps?: HTMLAttributes<HTMLElement>;
  children: ReactNode;
};

function GridListItem({
    id,
    wrapperProps,
    children
  }: GridListItemProps
) {
  const gridList = useGridList();

  const selected = gridList.selectedIDs.includes(id);
  const role = gridList.mode === "single" ? "radio" : "checkbox";

  const itemContextType: GridListItemContextValue = {
    id,
    isSelected: selected,
    select: () => gridList.select(id),
    unselect: () => gridList.unselect(id),
    toggle: () => gridList.toggle(id),
  };


  return (
    <GridListItemContext.Provider value={itemContextType}>
      <Box
        role={role}
        aria-checked={selected}
        tabIndex={0}
        className={"mantine-focus-auto"}
        onKeyDown={(e: ReactKeyboardEvent) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            gridList.toggle(id);
          }
        }}
        {...wrapperProps}
      >
        {children}
      </Box>
    </GridListItemContext.Provider>
  );
}

GridList.Item = GridListItem;
