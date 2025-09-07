import {createContext, useContext} from "react";
import type {GridListItemID} from "@components/gridList/types.ts";

export type GridListItemContextValue = {
  id: GridListItemID;
  isSelected: boolean;
  select: () => void;
  unselect: () => void;
  toggle: () => void;
};

export const GridListItemContext = createContext<GridListItemContextValue | null>(null);

export function useGridListItem(): GridListItemContextValue {
  const ctx = useContext(GridListItemContext);
  if (!ctx) throw new Error("useGridListItem must be used inside <GridList.Item>");
  return ctx;
}
