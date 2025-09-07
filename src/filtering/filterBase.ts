// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ion } from "@zedux/react";
import type { AtomOf, IonOf } from "@util/atoms.ts";


export type Predicate<TItem> = (item: TItem) => boolean

export interface FilterDefinitionBase<TItem, TValue> {
  kind: string;
  key: string;
  label: string;
  getValue: (item: TItem) => TValue
}

export interface FilterInstanceBase<TItem, TMeta, TUserInput> {
  kind: string;
  key: string;
  label: string;
  metaIon: IonOf<TMeta>;
  predicateIon: ReturnType<typeof ion<Predicate<TItem>>>;
  userInputIon: AtomOf<TUserInput>;
}

export type FilterFactory = <TItem>(definition: FilterDefinitionBase<TItem, unknown>, items: AtomOf<TItem[]>) =>
  FilterInstanceBase<TItem, unknown, unknown>; 
export type FilterFactories = Map<string, FilterFactory>;