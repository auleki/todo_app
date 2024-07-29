import { Outlet } from "react-router-dom"
import Navbar from "../navigation/Navbar"

const Layout = ({children}) => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout