// SPDX-License-Identifier: AGPL-3.0-or-later

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
import { clamp } from "@util/math.ts";

export interface BoundedSpanFilterDefinition<TItem> extends FilterDefinitionBase<TItem, number> {
  step: number;
  formattingDecimals?: number;
  formattingSuffix?: string;
}

export interface BoundedSpanMeta {
  lowerBound: number;
  upperBound: number;
  step: number;
  formattingDecimals?: number;
  formattingSuffix?: string;
}

export interface BoundedSpanUserInput {
  lower: number;
  upper: number;
}

export type BoundedSpanFilterInstance<TItem> = FilterInstanceBase<TItem, BoundedSpanMeta, BoundedSpanUserInput>;

export function isBoundedSpanFilterDefinition<TItem>(
  definition: FilterDefinitionBase<TItem, unknown>
): definition is BoundedSpanFilterDefinition<TItem> {
  return definition.kind === "bounded-span";
}


export function boundedSpanFilterFactory<TItem>(
  definition: FilterDefinitionBase<TItem, unknown>,
  sourceItemsAtom: AtomOf<TItem[]>
): FilterInstanceBase<TItem, unknown, unknown> {
  if (!isBoundedSpanFilterDefinition<TItem>(definition)) {
    throw new Error(`Expected a BoundedSpanFilterDefinition but received ${definition.kind}`);
  } 
  
  return createBoundedSpanFilterInstance<TItem>(definition, sourceItemsAtom) as FilterInstanceBase<TItem, unknown, unknown>;
}


export function createBoundedSpanFilterInstance<TItem>(
  definition: BoundedSpanFilterDefinition<TItem>,
  sourceItemsAtom: AtomOf<TItem[]>
): BoundedSpanFilterInstance<TItem> {
  
  const getKey = (part: string) => `${sourceItemsAtom.key}:filters:${definition.key}:${part}`;
  const metaIon = ion<BoundedSpanMeta>(getKey("meta"), ({ get }) => {
    const items = get(sourceItemsAtom)
    let min = Infinity;
    let max = -Infinity;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const value = definition.getValue(item);
      min = Math.min(value, min);
      max = Math.max(value, max);
    }
    
    return {
      lowerBound: min,
      upperBound: max,
      formattingSuffix: definition.formattingSuffix,
      formattingDecimals: definition.formattingDecimals,
      step: definition.step
    }
  });
  
  const userInputAtom = atom<BoundedSpanUserInput>(getKey("user-input"), () => {
    const signal = injectSignal<BoundedSpanUserInput>({ lower: -Infinity, upper: Infinity })
    const { get } = injectEcosystem()
    
    const setValue = injectCallback((newValue: BoundedSpanUserInput) => {
      const { lowerBound, upperBound } = get(metaIon)
      signal.set({
        lower: clamp(newValue.lower, lowerBound, upperBound),
        upper: clamp(newValue.upper, lowerBound, upperBound)
      })
    }, [get(metaIon)]);

    // keep the user input clamped incase the range changes
    injectEffect(() => {
      const { lowerBound, upperBound } = get(metaIon)
      signal.set(prev => {
        return {
          lower: clamp(prev.lower, lowerBound, upperBound),
          upper: clamp(prev.upper, lowerBound, upperBound)
        };
      })
    }, [get(metaIon)], { synchronous: true })

    const reset = injectCallback(() => {
      const { lowerBound, upperBound } = get(metaIon)
      signal.set({ lower: lowerBound, upper: upperBound })
    }, [get(metaIon)])

    return api(signal).setExports({ setValue, reset })
  })
  
  const predicateIon = ion<Predicate<TItem>>(getKey("predicate"), ({ get }) => {
    const { lowerBound, upperBound } = get(metaIon)
    const { lower, upper } = get(userInputAtom)
    
    const clampedLower = Math.max(lowerBound, Math.min(lower, upperBound))
    const clampedUpper = Math.max(lowerBound, Math.min(upper, upperBound))

    return (item: TItem) => {
      const value = definition.getValue(item);
      return value >= clampedLower && value <= clampedUpper
    }
  })

  
  return {
    key: definition.key,
    kind: definition.kind,
    label: definition.label,
    metaIon,
    predicateIon,
    userInputAtom: userInputAtom
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isBoundedSpanFilterInstance<TItem>(
  instance: FilterInstanceBase<TItem, any, any>
): instance is BoundedSpanFilterInstance<TItem> {
  return instance.kind === "bounded-span";
}
/* eslint-enable @typescript-eslint/no-explicit-any */