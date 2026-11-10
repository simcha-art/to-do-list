import { Navigate, Outlet, useLocation } from "react-router-dom"

function Protected() {
    useLocation()
    const is_logged = localStorage.getItem("user")
    if (!is_logged) {
        return <Navigate to={"/login"} replace/>
    }
  return (
        <Outlet />
  )
}

export default Protected