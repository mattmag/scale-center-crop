// SPDX-License-Identifier: AGPL-3.0-or-later

import { AppShell } from "@mantine/core";
import DeviceFilterPanel from "@composites/deviceFilterPanel/DeviceFilterPanel.tsx";
import MainPanel from "@composites/mainPanel/MainPanel.tsx";
import { HeaderPanel } from "@composites/headerPanel/HeaderPanel.tsx";
import { SidePanel } from "@composites/sidePanel/SidePanel.tsx";
import { SidePanelContentProvider } from "@composites/sidePanel/SidePanelContentProvider.tsx";

export default function Layout() {
  return (
    <SidePanelContentProvider>
      <AppShell
        withBorder={false}
        padding={"md"}
        header={{ height: "10rem", offset: true }}
        navbar={{ width: "15%", breakpoint: "md", collapsed: { mobile: true, desktop: false }}}
        aside={{ width: "25%", breakpoint: "md", collapsed: { mobile: true, desktop: false } }}
      >
        <AppShell.Header p={"md"}>
          <HeaderPanel/>
        </AppShell.Header>
        <AppShell.Navbar p={"md"}>
          <DeviceFilterPanel/>
        </AppShell.Navbar>
        <AppShell.Aside p={"md"}>
          <SidePanel/>
        </AppShell.Aside>
        <AppShell.Main>
          <MainPanel/>
        </AppShell.Main>
      </AppShell>
    </SidePanelContentProvider>
  )
}