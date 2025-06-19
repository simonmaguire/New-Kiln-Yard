import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { type Session } from "@supabase/supabase-js";
import { AuthContext } from "@/AuthContext";

interface AuthContextProviderProps {
    children: React.ReactNode
}

const supabase = createClient(
  import.meta.env.VITE_SUPA_PROJECT_URL,
  import.meta.env.VITE_SUPA_ANON_KEY
);

export const AuthSnippet = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
            </div>
        </div>
    )
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
    });

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    });

    return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        try{
            await supabase.auth.signOut().then(()=> {
                setSession(null)
            })
        } catch(err){
            console.log(err);
            
        }

    }


    return(
    <AuthContext.Provider value={{session, signOut}}>
        {children}
    </AuthContext.Provider>
    )
  };