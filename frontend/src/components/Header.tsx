import { AppShell, Button, Group, NavLink, Text } from "@mantine/core"
import { useSetAtom } from "jotai"
import { NavLink as RouterLink, useNavigate } from "react-router-dom"
import { UserAtom } from "../atoms/UserAtom"

function Header() {
    const setUser = useSetAtom(UserAtom)
    const navigate = useNavigate()
    const is_logged = localStorage.getItem("user")
    function logout(){
        localStorage.removeItem("user")
        setUser({})
        navigate("/login")
    }
  return (
    <AppShell.Header p={"sm"}>
        <Group justify="space-between" h={"100%"}>
            <Text fw={700} size="xl">My To-dos</Text>
            <Group gap={"md"} >
                <NavLink label="missions-list" component={RouterLink} to={"/missions-list"} w={"auto"}/>
                <NavLink label="New" component={RouterLink} to={"/new-mission"} w={"auto"}/>
                <NavLink label="My profile" component={RouterLink} to={"/user-details"} w={"auto"}/> 
            </Group>
            <Button onClick={logout}>{is_logged ? "Logout": "login"}</Button>
        </Group>
    </AppShell.Header>
  )
}

export default Header