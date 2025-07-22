import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {createContext} from 'react'
import { type Session, type User } from "@supabase/supabase-js";


interface IAuthContext {
    user: User | null,
    session: Session | null,
    isLoading: boolean,
    signOut: (() => void) | undefined 
}

interface AuthContextProviderProps {
    children: React.ReactNode
}

const supabase = createClient(
  import.meta.env.VITE_SUPA_PROJECT_URL,
  import.meta.env.VITE_SUPA_ANON_KEY
);

export const AuthContext = createContext<IAuthContext>({user: null, session: null, signOut: undefined, isLoading: true})


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        }).finally(() => setIsLoading(false));
        
        const {data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user ?? null);
        })
        
        return () => subscription.unsubscribe();
    }, 
    []);
    
    const signOut = async () => {
        try{
            await supabase.auth.signOut().then(()=> {
                setSession(null)
            })
        } catch(err){
            console.log(err)   
        }
    }
    
    return(
        <AuthContext.Provider value={{user, session, signOut, isLoading}}>
        {children}
    </AuthContext.Provider>
    )
};

export const AuthSnippet = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
            </div>
        </div>
    )
}