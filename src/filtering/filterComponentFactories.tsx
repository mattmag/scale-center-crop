// SPDX-License-Identifier: AGPL-3.0-or-later

import type {
  FilterComponentFactories,
  FilterComponentFactory,
  FilterInstanceBase
} from "./filterTypes.ts";
import type { BoundedSpanFilterInstance } from "@filtering/builtInFilters/boundedSpanFilter.ts";
import { BoundedSpanFilterSlider } from "@filtering/builtInFilters/BoundedSpanFilterSlider.tsx";
import { Fragment } from "react";
import { SelectFilterPicker } from "@filtering/builtInFilters/SelectFilterPicker.tsx";
import type { SelectFilterInstance } from "@filtering/builtInFilters/selectFilter.ts";

export const builtinFilterComponentFactories: FilterComponentFactories = new Map<string, FilterComponentFactory>([
  ["bounded-span", instance => <BoundedSpanFilterSlider filter={instance as BoundedSpanFilterInstance<unknown>} />],
  ["select", instance => <SelectFilterPicker filter={instance as SelectFilterInstance<unknown>} />],
])

export function getFilterComponent<TItem>(instance: FilterInstanceBase<TItem, unknown, unknown>, factories: FilterComponentFactories = builtinFilterComponentFactories) {
  const factory = factories.get(instance.kind);
  if (!factory) {
    throw new Error(`Component factory for instance ${instance.kind} was not found`);
  }
  return (
    <Fragment key={instance.key}>
      {factory(instance)}
    </Fragment>
  );
} 