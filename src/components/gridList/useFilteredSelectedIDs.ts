// SPDX-License-Identifier: AGPL-3.0-or-later

import { useEffect, useState } from "react";
import { areSetsEquivalent } from "@util/collections.ts";

export interface FilteredSelectedIDsProps<T> {
  filteredItems: T[];
  getId: (item: T) => string;
  initialSelection?: Set<string>;
}

export type FilteredSelectedIDsValue = [ReadonlySet<string>, (ids: ReadonlySet<string>) => void];

export function useFilteredSelectedIDs<T>({
  filteredItems, 
  initialSelection,
  getId
}: FilteredSelectedIDsProps<T>) : FilteredSelectedIDsValue {
  const [selectedIDs, setSelectedIDs] = useState<ReadonlySet<string>>(initialSelection ?? new Set());

  useEffect(() => {
    setSelectedIDs(current => {
      const stillVisibleIDs = new Set(
        filteredItems
        .filter(item => current.has(getId(item)))
        .map(item => getId(item))
      );
      
      // not doing the below caused a ton of re-renders
      if (areSetsEquivalent(current, stillVisibleIDs)) {
        return current;
      }
      
      return new Set(Array.from(current).filter(id => stillVisibleIDs.has(id)));
    })
  }, [filteredItems, getId]);
  
  return [
    selectedIDs,
    setSelectedIDs,
  ]
}