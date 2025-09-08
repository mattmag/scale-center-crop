// SPDX-License-Identifier: AGPL-3.0-or-later

import { ActionIconRadioGroup } from "@components/actionIconRadioGroup/ActionIconRadioGroup";
import { type MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconThemeAutoMode, IconThemeDarkMode, IconThemeLightMode } from "@theming/Icons.tsx";

export function ThemeModeSelector() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  
  return (
    <>
      <ActionIconRadioGroup
        selectedItemID={colorScheme}
        onSelectedItemIDChange={newID => setColorScheme(newID as MantineColorScheme)}
        items={[
          {
            id: "light",
            icon: <IconThemeLightMode/>,
            tooltip: "Light",
          },
          {
            id: "auto",
            icon: <IconThemeAutoMode/>,
            tooltip: "Automatic",
          },
          {
            id: "dark",
            icon: <IconThemeDarkMode/>,
            tooltip: "Dark",
          },
        ]}
      />
    </>
  )
}