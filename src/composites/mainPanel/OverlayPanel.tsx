// SPDX-License-Identifier: AGPL-3.0-or-later

import { useMemo, useState } from "react";
import { SummaryOverlay } from "@components/pictograms/SummaryOverlay.tsx";
import type { ScaleResultItem } from "@composites/mainPanel/mainPanelTypes.ts";
import { Center, Group, Stack, Switch } from "@mantine/core";

export interface OverlayPanelProps {
  resultItems: ScaleResultItem[];
}


export function OverlayPanel({ resultItems }: OverlayPanelProps) {
  const results = useMemo(() => resultItems.map(r => r.result), [resultItems])
  const [showAll, setShowAll] = useState(true);
  return (
    <Stack mt="md">
      <Group justify="end">
        <Switch
          label="Show All"
          checked={showAll}
          onChange={(event) => setShowAll(event.currentTarget.checked)}
        />
      </Group>
      <div style={{ height: "50vh", alignItems: "start" }}>
        {results.length > 0 ?
          (
            <SummaryOverlay results={results} showAllResolutions={showAll} />
          ) : (
            <Center>No results.</Center>
          )
        }
      </div>
    </Stack>
  )
}
