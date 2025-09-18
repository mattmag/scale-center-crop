// SPDX-License-Identifier: AGPL-3.0-or-later

import { MultiSelect } from "@mantine/core";
import type { SelectFilterInstance } from "@filtering/builtInFilters/selectFilter.ts";
import { useAtomState, useAtomValue } from "@zedux/react";
import { useMemo } from "react";


export interface SelectFilterPickerProps<TItem> {
  filter: SelectFilterInstance<TItem>
}

export function SelectFilterPicker<TItem>({ filter }: SelectFilterPickerProps<TItem>) {
  const meta = useAtomValue(filter.metaIon);
  const options = useMemo(() => [...meta.options], [meta.options]);
  const [userInput, setUserInput] = useAtomState(filter.userInputAtom);
  const selected = useMemo(() => [...userInput], [userInput]);
  
  return (
    <MultiSelect
      placeholder={selected.length ? undefined : "Pick a value"}
      data={options}
      value={selected}
      onChange={newValue => setUserInput(new Set(newValue))}
    />
  )
}