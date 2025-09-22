// SPDX-License-Identifier: AGPL-3.0-or-later

import type { ScaleResult } from "@data/results.ts";
import { StripedPattern } from "@components/pictograms/patterns.tsx";
import { usePictogramColors } from "./styles";
import type { Size } from "@data/deviceTypes.ts";
import { useAtomValue } from "@zedux/react";
import { baseResolutionAtom } from "@data/baseResolution.ts";



export interface SummaryOverlayProps {
  results: ScaleResult[];
  showAllResolutions?: boolean;
}

export type Point = {
  x: number;
  y: number
};

export interface Rectangle {
  topLeft: Point;
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
}

const SVG_PADDING = 2;

export function SummaryOverlay({ results, showAllResolutions = true }: SummaryOverlayProps) {
  const perimeter = getNormalizedPerimeter(results);
  const pictogramColors = usePictogramColors();
  const minimumArea: Size = results.reduce((min, result) => ({
    width: Math.min(min.width, result.croppedArea.width),
    height: Math.min(min.height, result.croppedArea.height),
  }), { width: Infinity, height: Infinity });
  
  const baseResolution = useAtomValue(baseResolutionAtom);
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`-${(baseResolution.width / 2) + SVG_PADDING}
        -${(baseResolution.height / 2) + SVG_PADDING}
        ${baseResolution.width + (SVG_PADDING * 2)}
        ${baseResolution.height + (SVG_PADDING * 2)}`
      }
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        <StripedPattern id={"summary-overlay-stripe"} color={pictogramColors.scaledBaseResolutionColor}/>
      </defs>
      <g transform={`translate(${SVG_PADDING} ${SVG_PADDING})`}>
        <rect
          x={0}
          y={0}
          width={baseResolution.width} height={baseResolution.height}
          fill={"url(#summary-overlay-stripe"}
          transform={`translate(-${baseResolution.width / 2} -${baseResolution.height / 2})`}
          vectorEffect="non-scaling-stroke"
          stroke={pictogramColors.screenResolutionColor}
          strokeWidth={1.5}
          strokeOpacity={0.8}
        />
        <path
          d={`M ${perimeter[0].x} ${perimeter[0].y} ${perimeter.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(" ")} Z`}
          fill={pictogramColors.screenResolutionColor}
        />
        {showAllResolutions && results.map(result => 
          <rect
            x={(result.screenResolution.width / result.scaleFactor) * -0.5}
            y={(result.screenResolution.height / result.scaleFactor) * -0.5}
            width={result.screenResolution.width / result.scaleFactor}
            height={result.screenResolution.height / result.scaleFactor}
            vectorEffect="non-scaling-stroke"
            strokeWidth="1"
            stroke={pictogramColors.screenOverlayOutline}
            fill="none"
          />
        )}
        <rect
          x={minimumArea.width * -0.5}
          y={minimumArea.height * -0.5}
          width={minimumArea.width}
          height={minimumArea.height}
          stroke={pictogramColors.usableAreaOutline}
          strokeWidth={1.5}
          fill="none"
        />
      </g>
    </svg>
  )
}

function getNormalizedPerimeter(results: ScaleResult[]) : Point[] {
  const bottomRightFront = getBottomRightStaircase(getBottomRightFront(results));
  const topRight = bottomRightFront.map(pt => ({ x: pt.x, y: -pt.y })).reverse();
  const topLeft = bottomRightFront.map(pt => ({ x: -pt.x, y: -pt.y }));
  const bottomLeft = bottomRightFront.map(pt => ({ x: -pt.x, y: pt.y })).reverse();
  return bottomRightFront.concat(topRight).concat(topLeft).concat(bottomLeft);
}

function getBottomRightStaircase(front: Point[]) : Point[] {
  const rval: Point[] = [];
  
  for (let i = 0; i < front.length - 1; i++) {
    rval.push(front[i]);
    rval.push({x: front[i].x, y: front[i + 1].y});
  }
  rval.push(front[front.length - 1]);
  
  return rval;
}

function getBottomRightFront(results: ScaleResult[]): Point[] {
  // scaled down to match base resolution, then sorted by y descending
  const normalizedBottomRightCorners = results.map(result => ({
      x: result.screenResolution.width / result.scaleFactor * 0.5,
      y: result.screenResolution.height / result.scaleFactor * 0.5 }))
    .sort((a, b) => b.y - a.y || a.x - b.x);
  
  const front: Point[] = [];
  let maxX = -Infinity;
  for (const corner of normalizedBottomRightCorners) {
    if (corner.x > maxX) {
      front.push(corner);
      maxX = corner.x;
    }
  }
  return front;
}