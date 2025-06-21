import { AuthContext } from "@/AuthContext"
import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"

export const ProtectedRoute = ({children}: {children?: React.ReactNode}) => {
    const {session, isLoading} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=> {
        if(!session && !isLoading){navigate('/auth')}
    },[session])

    return children ? children : <Outlet/>
}