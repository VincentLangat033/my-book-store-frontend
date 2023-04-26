import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { /*logoutUser,*/ logoutCurrentUserAsync } from "./loginSlice";

const Logout = () => {
    
    // const currentUser = useSelector(state => state.login.currentUser)
    const status = useSelector(state => state.login.status)

    const dispatch = useDispatch()



    return (
        <div className={status === "idle" ? "green" : "red"}>

        <button className="logout-btn" onClick={() => dispatch(logoutCurrentUserAsync())}>Log out</button>

            {/* <p> hello {currentUser ? currentUser.username : "guest"}</p> */}

        </div>

    )
}

export default Logout