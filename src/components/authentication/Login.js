import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginNewUserAsync } from "./loginSlice";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import './logiin.css'

const Login = () => {
    const errors = useSelector(state => state.login.errors)
    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(loginNewUserAsync(data))
        reset()
    }
   
    return (
        <div className="">
            <div className="login">
            <h4>Welcome to your book store, please log in to continue:</h4>
            <div className="loginBox">

            <form onSubmit={handleSubmit(onSubmit)}>

                <h5>Login</h5>
                <label htmlFor="username">Username: </label>
                <input className="loginInput" {...register("username")}
                type="text"
                placeholder="username"
                required
                /> <br/>
                <label htmlFor="password">Password: </label>
                <input className="loginInput" {...register("password")}
                placeholder="password"
                type="password"
                required
                /> <br />
                <button className="loginRegisterButton" type="submit">Login</button>
                { errors?.length > 0 ? <div>{errors}</div>: null}
            </form>
            
            <br/>
            <p>Not a member yet? </p>
            <Link to="/signup">
                <button className="loginButtton" >Click here to sign up</button>
            </Link>
            </div>
            </div>

        </div>

    )
}

export default Login

// .loginInput{
//     margin: 15px;
//     height: 50px;
//     border-radius: 10px;
//     border: 1px solid gray;
//     font-size: 18px;
//     padding-left: 20px;

// }