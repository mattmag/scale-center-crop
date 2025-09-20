// SPDX-License-Identifier: AGPL-3.0-or-later

export interface StripedPatternProps {
  id: string;
  color: string;
}

export function StripedPattern({ id, color }: StripedPatternProps) {
  return (
    <pattern
        id={id}
        width="6"
        height="6"
        patternTransform="rotate(45 0 0)" 
        patternUnits={"userSpaceOnUse"}
        patternContentUnits="userSpaceOnUse"
      >
          <rect
            x="0" y="0" width="6" height="6"
            fill={`${color}`}
            fillOpacity={0.25}
          />
          <line
            x1="0" y1="0" x2="0" y2="6"
            vectorEffect="non-scaling-stroke"
            stroke={`${color}`}
            strokeWidth={1.5}
            strokeOpacity={0.6}
          />
      </pattern>
  )
}