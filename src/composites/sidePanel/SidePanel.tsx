// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSidePanelContent } from "@composites/sidePanel/useSidePanelContent.ts";
import { getKey } from "@data/deviceTypes";
import { Center } from "@mantine/core";

export function SidePanel() {
  const sidePanelContent = useSidePanelContent();
  return (
    <>
      {sidePanelContent.content?.devices.map(getKey).join("\n") ?? <Center>Select a Device</Center>}
    </>
  )
}