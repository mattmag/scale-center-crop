// SPDX-License-Identifier: AGPL-3.0-or-later

import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from "./theme.ts";
import Layout from "@composites/layout/Layout.tsx";


function App() {
  return (
    <>
     <MantineProvider theme={theme} defaultColorScheme={"auto"}>
       <Layout/>
     </MantineProvider>
    </>
  )
}

export default App
