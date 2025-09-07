// SPDX-License-Identifier: AGPL-3.0-or-later

import { atom, injectSignal, ion } from "@zedux/react"
import type { AtomOf, IonOf } from "@util/atoms.ts";
import type {
  FilterDefinitionBase,
  FilterFactories,
  FilterInstanceBase,
  Predicate
} from "./filterTypes.ts";
import { builtinFilterFactories } from "@filtering/filterFactories.ts";


export interface Filters<TItem> {
  filterInstances: FilterInstanceBase<TItem, unknown, unknown>;
}

export function buildFilters<TItem>(
  definitions: FilterDefinitionBase<TItem, unknown>[],
  itemsSourceAtom: AtomOf<TItem[]>,
  factories: FilterFactories = builtinFilterFactories 
) {
  const filterInstances: FilterInstanceBase<TItem, unknown, unknown>[] = [];
  for (const definition of definitions) {
    if (!factories.has(definition.kind)) {
      throw new Error(`Factory for definition ${definition.kind} was not found`);
    }
    const instance = factories.get(definition.kind)!<TItem>(definition, itemsSourceAtom);
    filterInstances.push(instance);
  }
  
  const filterResultsMaskIon = createFilterResultsMaskIon(itemsSourceAtom,
    filterInstances.map(instance => instance.predicateIon));
  const filteredItemsAtom = createFilteredItemsAtom(itemsSourceAtom, filterResultsMaskIon);
  return {
    filterInstances,
    filteredItemsAtom
  } 
}


export const itemsSourceAtom = <TItem>(key: string, initial: TItem[]) =>
  atom<TItem[]>(key, () => initial);


function createFilterResultsMaskIon<T>(
  itemsSourceAtom: AtomOf<T[]>,
  predicatesIons: Array<IonOf<Predicate<T>>>
) {
  return ion<Uint8Array>(`${itemsSourceAtom.key}:filtered:mask`, ({ get }) => {
    const items = get(itemsSourceAtom);
    const predicates = predicatesIons.map(t => get(t));
    
    const lastMaskSignal = injectSignal(new Uint8Array(items.length).fill(1));
    
    const newMask = new Uint8Array(items.length);
    for (let i = 0; i < items.length; i++) {
      newMask[i] = checkPredicates(items[i], predicates) ? 1 : 0;
    }
    
    const lastMask = lastMaskSignal.get()
    if (areArraysEquivalent(newMask, lastMask)) {
      return lastMask
    }
    
    lastMask.set(newMask);
    return newMask;
  });
}

function createFilteredItemsAtom<T>(
  itemsSourceAtom: AtomOf<T[]>,
  filterResultsMaskIon: IonOf<Uint8Array>
) {
  return ion<T[]>(`${itemsSourceAtom.key}:filtered:items`, ({ get }) => {
    const items = get(itemsSourceAtom);
    const mask = get(filterResultsMaskIon);
    
    return items.filter((_, index) => mask[index])
  });
}


function checkPredicates<T>(item: T, predicates: Predicate<T>[]) {
  for (const predicate of predicates) {
    if (!predicate(item)) {
      return false;
    }
  }
  return true;
}

function areArraysEquivalent<T>(a: ArrayLike<T>, b: ArrayLike<T>, comparer?: (a: T, b: T) => boolean) {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (comparer ? !comparer(a[i], b[i]) : a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
