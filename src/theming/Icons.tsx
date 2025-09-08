// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  IconArrowsDiagonal,
  IconDevices,
  IconDimensions,
  IconLayersSelected,
  IconLayoutGrid, IconMoon,
  IconPlant2,
  type IconProps, IconSun
} from "@tabler/icons-react";
import type { ComponentType, ReactElement } from "react";

export type IconSize = "sm" | "md" | "lg";

const iconSizeProps: Record<IconSize, IconProps> = {
  sm: { size: 20, stroke: "1.5px" },
  md: { size: 24, stroke: "1.3px" },
  lg: { size: 32, stroke: "1.2px" }
}

export interface ThemedIconProps {
  size?: IconSize
}
const withThemedProps = (IconComponent: ComponentType<IconProps>) => {
  return ({ size = "md" }: ThemedIconProps): ReactElement => <IconComponent {...iconSizeProps[size]} />;
};


export const IconGridView = withThemedProps(IconLayoutGrid);
export const IconOverlayView = withThemedProps(IconLayersSelected);
export const IconGroupByDevice = withThemedProps(IconDevices);
export const IconGroupByScreenResolution = withThemedProps(IconDimensions);
export const IconThemeLightMode = withThemedProps(IconSun);
export const IconThemeAutoMode = withThemedProps(IconPlant2);
export const IconThemeDarkMode = withThemedProps(IconMoon);
export const IconScreenSizeDiagonal = withThemedProps(IconArrowsDiagonal);