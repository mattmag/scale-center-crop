// SPDX-License-Identifier: AGPL-3.0-or-later

import { type SidePanelContent, SidePanelContentContext } from "./useSidePanelContent.ts";
import { type ReactNode, useMemo, useState } from "react";

export function SidePanelContentProvider({ children }: { children: ReactNode}) {
  const [content, setContent] = useState<SidePanelContent | null>(null);
  const context = useMemo(() => ({ content, setContent }), [content, setContent]);
  
  return (
    <SidePanelContentContext.Provider value={context}>
      {children}
    </SidePanelContentContext.Provider>
  );
}