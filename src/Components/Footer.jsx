import { useContext } from "react";
import { UserContext } from "../App";

export default function Footer(){
    const user = useContext(UserContext)[0];

    // console.log(user)
    return (
        <div>
            <h1 className="display-6 text-center">Footer</h1>
            {user ? <h1 className="display-6">{user} is signed in</h1> : ''}
        </div>
    )
}
