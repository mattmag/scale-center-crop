// SPDX-License-Identifier: AGPL-3.0-or-later

import { AppShell } from "@mantine/core";
// import DevicesListPanel from "@composites/devicesListPanel/DevicesListPanel.tsx";
import DeviceFilterPanel from "@composites/deviceFilterPanel/DeviceFilterPanel.tsx";
import DeviceListPanel from "@composites/deviceListPanel/DeviceListPanel";

export default function TriLayout() {
  return (
    <AppShell
      padding={"md"}
      header={{ height: "9rem", offset: true }}
      navbar={{ width: "15%", breakpoint: "md", collapsed: { mobile: true, desktop: false }}}
      aside={{ width: "25%", breakpoint: "md", collapsed: { mobile: true, desktop: false } }}
    >
      <AppShell.Header p={"md"}>
      </AppShell.Header>
      <AppShell.Navbar p={"md"}>
        <DeviceFilterPanel/>
      </AppShell.Navbar>
      <AppShell.Aside p={"md"}>
        Details on the selected device.
      </AppShell.Aside>
      <AppShell.Main>
        <DeviceListPanel/>
      </AppShell.Main>
    </AppShell>
  )
}