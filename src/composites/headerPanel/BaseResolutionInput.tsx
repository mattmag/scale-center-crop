// SPDX-License-Identifier: AGPL-3.0-or-later

import { Group, NumberInput, Stack, Text } from "@mantine/core";
import { baseResolutionAtom } from "@data/baseResolution.ts";
import { useAtomState } from "@zedux/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import type { Size } from "@data/deviceTypes";

export function BaseResolutionInput() {
  const [baseResolution, setBaseResolution] = useAtomState(baseResolutionAtom);
  const [userInputWidth, setUserInputWidth] = useState<string | number>(baseResolution.width);
  const [userInputHeight, setUserInputHeight] = useState<string | number>(baseResolution.height);
  const currentResolution = useRef(baseResolution);
  
  const setDebounced = useDebouncedCallback((value: Size) => {
    setBaseResolution(value)
  }, 250);
  
  const updateResolution = useCallback((newValue: Partial<Size>) => {
    currentResolution.current = {...currentResolution.current, ...newValue};
    setDebounced(currentResolution.current);
  }, [setDebounced])
  
  useEffect(() => {
    if (typeof userInputWidth === "number") {
      updateResolution({ width: userInputWidth });
    }
  }, [updateResolution, userInputWidth]);
  
  useEffect(() => {
    if (typeof userInputHeight === "number") {
      updateResolution({ height: userInputHeight });
    }
  }, [updateResolution, userInputHeight]);
  
  const handleWidthBlur = useCallback(() => {
    setUserInputWidth(current => typeof current === "number" ? current : currentResolution.current.width);
  }, [])
  
  const handleHeightBlur = useCallback(() => {
    setUserInputHeight(current => typeof current === "number" ? current : currentResolution.current.height);
  }, [])
  
  return (
    <Stack gap={0}>
      <Text>Base Resolution</Text>
      <Group>
        <NumberInput
          label="Width"
          size="xs"
          min={1}
          value={userInputWidth}
          onChange={setUserInputWidth}
          onFocus={e => e.target.select()}
          onBlur={handleWidthBlur}
        />
        <NumberInput
          label="Height"
          size="xs"
          min={1}
          value={userInputHeight}
          onChange={setUserInputHeight}
          onFocus={e => e.target.select()}
          onBlur={handleHeightBlur}
        />
      </Group>
    </Stack>
  )
}