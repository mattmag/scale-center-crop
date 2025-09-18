// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  IconArrowsDiagonal,
  IconBrandGithub,
  IconDevices,
  IconDimensions,
  IconHelp,
  IconLayersSelected,
  IconLayoutGrid,
  IconMoon,
  IconPlant2,
  type IconProps,
  IconSun
} from "@tabler/icons-react";
import type { ComponentType, ReactElement } from "react";

export type IconSize = "sm" | "md" | "lg";

const iconSizeProps: Record<IconSize, IconProps> = {
  // xs: { size: 18, stroke: "1.5px" }, // Tabler icons do not render well at this scale
  sm: { size: 20, stroke: "1.4px" },
  md: { size: 24, stroke: "1.3px" },
  lg: { size: 32, stroke: "1.2px" }
}

export interface ThemedIconProps {
  size?: IconSize
  color?: string;
}
const withThemedProps = (IconComponent: ComponentType<IconProps>) => {
  return ({ size = "md", color }: ThemedIconProps): ReactElement =>
    <IconComponent {...iconSizeProps[size]} color={color} />;
};


export const IconGridView = withThemedProps(IconLayoutGrid);
export const IconOverlayView = withThemedProps(IconLayersSelected);
export const IconGroupByDevice = withThemedProps(IconDevices);
export const IconGroupByScreenResolution = withThemedProps(IconDimensions);
export const IconThemeLightMode = withThemedProps(IconSun);
export const IconThemeAutoMode = withThemedProps(IconPlant2);
export const IconThemeDarkMode = withThemedProps(IconMoon);
export const IconScreenSizeDiagonal = withThemedProps(IconArrowsDiagonal);
export const IconGithub = withThemedProps(IconBrandGithub)
export const IconShowHelp = withThemedProps(IconHelp)