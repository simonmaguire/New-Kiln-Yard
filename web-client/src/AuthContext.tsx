import {createContext} from 'react'
import { type Session } from "@supabase/supabase-js";


interface IAuthContext {
    session: Session | null,
    signOut: (() => void) | undefined 
}

export const AuthContext = createContext<IAuthContext>({session: null, signOut: undefined})