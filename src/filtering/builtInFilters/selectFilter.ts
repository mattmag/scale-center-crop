// SPDX-License-Identifier: AGPL-3.0-or-later

import type {
  FilterDefinitionBase,
  FilterInstanceBase,
  Predicate
} from "@filtering/filterTypes.ts";
import type { AtomOf } from "@util/atoms.ts";
import {
  api,
  atom,
  injectCallback,
  injectEcosystem,
  injectEffect,
  injectSignal,
  ion
} from "@zedux/react";
import type { UndefinedBehavior } from "@filtering/builtInFilters/boundedSpanFilter.ts";

export type SelectionMode = "single" | "multi";

export interface SelectFilterDefinition<TItem> extends FilterDefinitionBase<TItem, string> {
  kind: "select";
  selectionMode: SelectionMode;
  valueUndefinedBehavior?: UndefinedBehavior;
}

export interface SelectMeta {
  selectionMode: SelectionMode;
  options: Set<string>;
}

export type SelectUserInput = Set<string>;

export type SelectFilterInstance<TItem> = FilterInstanceBase<TItem, SelectMeta, SelectUserInput>;

export function isSelectFilterDefinition<TItem>(filter: FilterDefinitionBase<TItem, unknown>): filter is SelectFilterDefinition<TItem> {
  return filter.kind === "select";
}

export function selectFilterFactory<TItem>(
  definition: FilterDefinitionBase<TItem, unknown>,
  sourceItemsAtom: AtomOf<TItem[]>
): FilterInstanceBase<TItem, unknown, unknown> {
  if (!isSelectFilterDefinition<TItem>(definition)) {
    throw new Error(`Expected a selectFilterDefinition but received ${definition.kind}`);
  } 
  
  return createSelectFilterInstance<TItem>(definition, sourceItemsAtom) as FilterInstanceBase<TItem, unknown, unknown>;
}

export function createSelectFilterInstance<TItem>(
  definition: SelectFilterDefinition<TItem>,
  sourceItemsAtom: AtomOf<TItem[]>
): SelectFilterInstance<TItem> {
  const getKey = (part: string) => `${sourceItemsAtom.key}:filters:${definition.key}:${part}`;
  
  const metaIon = ion<SelectMeta>(getKey("meta"), ({ get }) => {
    const items = get(sourceItemsAtom)
    const options = new Set<string>();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = definition.getValue(item);
      if (value) {
        options.add(value);
      }
    }
    
    return {
      selectionMode: definition.selectionMode,
      valueUndefinedBehavior: definition.valueUndefinedBehavior ?? "include",
      options,
    }
  });
  
  const userInputAtom = atom<SelectUserInput>(getKey("user-input"), () => {
    const { get } = injectEcosystem()
    const meta = get(metaIon);
    const signal = injectSignal<SelectUserInput>(new Set(meta.options))
    
    const setValue = injectCallback((newValue: SelectUserInput) => {
      signal.set(newValue);
    }, [get(metaIon)]);
    
    // remove selected items that have been removed from the options, in case they change
    injectEffect(() => {
      const { options } = get(metaIon)
      signal.set(prev => new Set(Array.from(prev).filter(sel => options.has(sel))))
    }, [get(metaIon)], { synchronous: true })
    
    const reset = injectCallback(() => {
      signal.set(new Set())
    }, [])
    
    return api(signal).setExports({ setValue, reset })
  });
  
  const predicateIon = ion<Predicate<TItem>>(getKey("predicate"), ({ get }) => {
    const selectedValues = get(userInputAtom)
    
    return (item: TItem) => {
      const value = definition.getValue(item);
      if (value) {
        return selectedValues.has(value)
      } else {
        return definition.valueUndefinedBehavior === "include";
      }
    }
  })
  
  return {
    key: definition.key,
    kind: definition.kind,
    label: definition.label,
    helpText: definition.helpText,
    metaIon,
    predicateIon,
    userInputAtom: userInputAtom
  }
}