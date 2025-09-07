import type {GridListItemID, GridListSelectionMode} from "@components/gridList/types.ts";
import {createContext, useContext} from "react";

export type GridListContextValue = {
  mode: GridListSelectionMode;
  selectedIDs: GridListItemID[];
  select: (id: GridListItemID) => void;
  unselect: (id: GridListItemID) => void;
  toggle: (id: GridListItemID) => void;
};


export const GridListContext = createContext<GridListContextValue | null>(null);

export function useGridList(): GridListContextValue {
  const ctx = useContext(GridListContext);
  if (!ctx) throw new Error("useGridListItem must be used inside <GridList>");
  return ctx;
}
