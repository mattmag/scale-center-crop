// SPDX-License-Identifier: AGPL-3.0-or-later

import type {atom, ion} from "@zedux/react";

export type AtomOf<TItem> = ReturnType<typeof atom<TItem>>
export type IonOf<TItem>  = ReturnType<typeof ion<TItem>>