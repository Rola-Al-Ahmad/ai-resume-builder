/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className="p-[1rem] px-5 flex justify-between shadow-md items-center">
            <Link to={"/"}>
                <img src="/logo.svg" alt="Logo" width={100} height={100} />
            </Link>
            {
                isSignedIn ?
                    <div className="flex gap-3 items-center">
                        <Link to={"/dashboard"}>
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                        <UserButton />
                    </div>
                    :
                    <Link to={"/auth/sign-in"}>
                        <Button>Get Started</Button>
                    </Link>
            }
        </div>
    )
}

export default Header