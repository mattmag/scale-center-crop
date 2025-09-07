// SPDX-License-Identifier: AGPL-3.0-or-later

import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from "./theme.ts";
import TriLayout from "@composites/layout/TriLayout.tsx";


function App() {
  return (
    <>
     <MantineProvider theme={theme} defaultColorScheme={"auto"}>
       <TriLayout/>
     </MantineProvider>
    </>
  )
}

export default App
