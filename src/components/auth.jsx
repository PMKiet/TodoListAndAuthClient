import bg from '../assets/bg.png'
import { Outlet } from "react-router-dom"

export default function Auth() {
    return (
        <div className="w-screen flex">
            <Outlet />
        </div>
    )
}
