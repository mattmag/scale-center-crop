// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { createContext, useContext } from "react";

export type SidePanelContent = ScaleResultItem;

export interface SidePanelContentContextValue {
  content: SidePanelContent | null;
  setContent: (content: SidePanelContent | null) => void;
}

export const SidePanelContentContext = createContext<SidePanelContentContextValue>(
  {
    content: null,
    setContent: () => {}
  });

export const useSidePanelContent = () => {
  return useContext(SidePanelContentContext);
}