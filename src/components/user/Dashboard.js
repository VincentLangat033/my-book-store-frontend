import React from "react";
import { useSelector /*, useDispatch*/ } from "react-redux"; 
// import { Link } from "react-router-dom";
// import BookSearch from "../books/BookSearch"
// import Bookshelf from "../bookshelf/Bookshelf";



const Dashboard = () => {
    const currentUser = useSelector(state => state.login.currentUser)

    
    return (
        <div className="dashboard">
            <h1>Welcome to your store,  {currentUser.username}</h1>
    
        </div>
    )
}

export default Dashboard