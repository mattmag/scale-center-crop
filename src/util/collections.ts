// SPDX-License-Identifier: AGPL-3.0-or-later

export function groupBy<TItem, TKey>(array: TItem[], key: (item: TItem) => TKey): Map<TKey, TItem[]> {
  const map = new Map<TKey, TItem[]>();
  for (const item of array) {
    getOrAdd(map, key(item), () => []).push(item);
  }
  return map;
}

export function getOrAdd<TKey, TValue>(map: Map<TKey, TValue>, key: TKey, factory: () => TValue) {
  if (!map.has(key)) {
    map.set(key, factory());
  }
  return map.get(key)!;
}

/** Check if two sets have the same values */
export function areSetsEquivalent<T>(a: ReadonlySet<T>, b: ReadonlySet<T>) {
  if (a.size !== b.size) {
    return false;
  }
  const setA = new Set(a);
  for (const item of b) {
    if (!setA.has(item)) {
      return false;
    }
  }
  return true;
}