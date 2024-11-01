/* eslint-disable no-unused-vars */
import { SignIn, useUser } from "@clerk/clerk-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);
    return (
        <div className="flex justify-center my-20 items-center">
            <SignIn />
        </div>
    )
}

export default SignInPage