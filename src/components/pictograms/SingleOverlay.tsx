// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Size } from "@data/deviceTypes";
import { StripedPattern } from "./patterns.tsx";


export interface SingleOverlayProps {
  scaledBaseResolution: Size;
  screenResolution: Size;
  drawingScale: number;
  aspectRatio: string;
  screenColor: string;
  scaledResolutionColor: string;
}

export function SingleOverlay({
  scaledBaseResolution,
  screenResolution,
  aspectRatio,
  drawingScale,
  screenColor,
  scaledResolutionColor
}: SingleOverlayProps) {
 const largerScaledSizeDimension = Math.max(scaledBaseResolution.width, scaledBaseResolution.height)

  const deviceHeight = ((screenResolution.height / largerScaledSizeDimension) * 100) * drawingScale;
  const deviceWidth = ((screenResolution.width / largerScaledSizeDimension) * 100) * drawingScale;
  
  const scaledHeight = ((scaledBaseResolution.height / largerScaledSizeDimension) * 100) * drawingScale;
  const scaledWidth = ((scaledBaseResolution.width / largerScaledSizeDimension) * 100) * drawingScale;
  

  return (
    <svg
      width="100%"
      height="100%"
      style={{ display: "block", aspectRatio: aspectRatio, overflow: "visible" }}
    >
      <defs>
        <StripedPattern id={"stripe"} color={scaledResolutionColor}/>
      </defs>
      <g>
        <rect
          x={"50%"}
          y={"50%"}
          width={`${scaledWidth}%`}
          height={`${scaledHeight}%`}
          fill={`url(#stripe)`}
          vectorEffect="non-scaling-stroke"
          stroke={scaledResolutionColor}
          strokeWidth={1.5}
          strokeOpacity={0.8}
          style={{
            transform: "translate(-50%, -50%)",
            transformOrigin: "center center",
            transformBox: "fill-box"
          }}
        />
        <rect
          radius="5 5"
          x={"50%"}
          y={"50%"}
          width={`${deviceWidth}%`}
          height={`${deviceHeight}%`}
          fill={screenColor}
          fillOpacity={1}
          vectorEffect="non-scaling-stroke"
          style={{
            transform: "translate(-50%, -50%)",
            transformOrigin: "center center",
            transformBox: "fill-box"
          }}
        />
      </g>
    </svg>
  )
}