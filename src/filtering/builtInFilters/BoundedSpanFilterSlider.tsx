// SPDX-License-Identifier: AGPL-3.0-or-later

import { useAtomState, useAtomValue } from "@zedux/react";
import { type BoundedSpanFilterInstance } from "./boundedSpanFilter.ts";
import { useState } from "react";
import { useThrottledCallback } from "@mantine/hooks";
import { RangeSlider, Stack, Text } from "@mantine/core";

export interface BoundedSpanFilterProps<TItem> {
  filter: BoundedSpanFilterInstance<TItem>
}


export function BoundedSpanFilterSlider<TItem>({ filter }: BoundedSpanFilterProps<TItem>) {
  const meta = useAtomValue(filter.metaIon);
  const [userInput, setUserInput] = useAtomState(filter.userInputAtom);
  
  const [sliderRange, setSliderRange] = useState<[number, number]>([userInput.lower, userInput.upper]);
  
  const setThrottled = useThrottledCallback((value: [number, number]) => {
    setUserInput({ lower: value[0], upper: value[1] })
  }, 120);
  
  const unitSuffix = meta.formattingSuffix
    ? " " + meta.formattingSuffix
    : "";
  
  return (
    <Stack gap={"0"}>
      <Text size="md">{filter.label}</Text>
      <Text size="xs">{sliderRange[0].toFixed(meta.formattingDecimals) + unitSuffix} - {sliderRange[1].toFixed(meta.formattingDecimals) + unitSuffix}</Text>
      <RangeSlider
        mt="0.5rem"
        label={null}
        value={sliderRange}
        step={meta.step}
        min={meta.lowerBound}
        max={meta.upperBound}
        onChange={([lower, upper]) => {
          setSliderRange([lower, upper]);
          setThrottled([lower, upper]);
        }}
        marks={[
          {
            value: meta.lowerBound,
            label: `${meta.lowerBound}${unitSuffix}`
          },
          {
            value: meta.upperBound,
            label: `${meta.upperBound}${unitSuffix}`
          }
        ]}
        minRange={0}
      />
    </Stack>
  )
}