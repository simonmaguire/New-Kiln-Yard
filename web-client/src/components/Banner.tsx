import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/AuthContext";

export const Banner = () => {
    const {session, signOut} = useContext(AuthContext)
    let navigate = useNavigate();
    return (
        <div className="flex flex-row justify-between">
            <h1 className="text-2xl">Kiln Yard</h1>
            <div>
                {session ? <Button onClick={signOut}>Signout</Button>
                : <Button onClick={() => navigate("/auth")}>Sign In</Button>
                }
            </div>
        </div>
    );
}