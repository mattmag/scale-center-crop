// SPDX-License-Identifier: AGPL-3.0-or-later

import './App.css'
import '@mantine/core/styles.css';
import {Center, MantineProvider} from '@mantine/core';
import {theme} from "./theme.ts";


function App() {
  return (
    <>
     <MantineProvider theme={theme} defaultColorScheme={"auto"}>
       <Center h="100vh">The Application</Center>
     </MantineProvider>
    </>
  )
}

export default App
