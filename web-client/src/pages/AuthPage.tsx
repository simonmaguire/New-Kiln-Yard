import { AuthContext } from "@/AuthContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { AuthSnippet } from "./Auth";


export const AuthPage = () => {
    const {session} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=> {
        if(session) navigate('/pottery')
    }, [session])


    return(
        <AuthSnippet/>
    )
    

}