import "./App.css";
import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { type Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cryznzcgasvgtshvlupo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeXpuemNnYXN2Z3RzaHZsdXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5OTA1ODAsImV4cCI6MjA2NDU2NjU4MH0.a0-iogDDZ53nKuLk5LcMs0Vx0VBrwVHUYp13wA6jHww"
);

const App = () => {
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

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return <div>Logged in!</div>;
  }
};

export default App;
