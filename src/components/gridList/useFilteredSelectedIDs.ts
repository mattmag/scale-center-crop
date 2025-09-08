// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from "react";

export interface FilteredSelectedIDsProps<T> {
  filteredItems: T[];
  getId: (item: T) => string;
  initialSelection?: string[];
}

export type FilteredSelectedIDsValue = [string[], (ids: string[]) => void];

export function useFilteredSelectedIDs<T>({
  filteredItems, 
  initialSelection,
  getId
}: FilteredSelectedIDsProps<T>) : FilteredSelectedIDsValue {
  const [selectedIDs, setSelectedIDs] = useState<string[]>(initialSelection ?? []);

  useEffect(() => {
    setSelectedIDs(current => {
      const stillVisible = filteredItems
        .filter(item => current.includes(getId(item)))
        .map(item => getId(item));
      // not doing the below caused a ton of re-renders
      // could do a more thorough check though
      if (stillVisible.length === current.length) {
        return current;
      }
      return current.filter(id => stillVisible.includes(id));
    })
  }, [filteredItems, getId]);
  
  return [
    selectedIDs,
    setSelectedIDs,
  ]
}