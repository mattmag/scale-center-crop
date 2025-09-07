// SPDX-License-Identifier: AGPL-3.0-or-later

import type { FilterFactories, FilterFactory } from "@filtering/filterTypes.ts";
import {
  type BoundedSpanFilterDefinition,
  boundedSpanFilterFactory
} from "@filtering/builtInFilters/boundedSpanFilter.ts";


export type BuiltinFilterDefinitions<TItem> = BoundedSpanFilterDefinition<TItem>;

export const builtinFilterFactories: FilterFactories = new Map<string, FilterFactory>([
  ["bounded-span", boundedSpanFilterFactory]
]);

