import { AppShell } from '@mantine/core'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <AppShell header={{height: 60}}>
        <Header />
        <AppShell.Main>
            <Outlet />
        </AppShell.Main>
    </AppShell>
  )
}

export default Layout