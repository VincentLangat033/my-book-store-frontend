import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { signupNewUserAsync } from "./loginSlice";
import './logiin.css'

const Signup = () =>{
    const { register, handleSubmit } = useForm()
    const errors = useSelector(state => state.login.errors)
    const dispatch = useDispatch()


    const onSubmit = (data) => {
        dispatch(signupNewUserAsync(data))
        }
    
    return (
        <div >
            <div className="newUser">
            New user? Sign up here
            </div>
           <div className="contentAlign">
            <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
           
                <label htmlFor="username">Username</label>
                <input className="loginInput" {...register("username")}
                type="text"
                placeholder="username"
                required
                /> <br />
                <label htmlFor="email">Email: </label>
                <input className="loginInput" {...register("email")}
                type="text"
                placeholder="email"
                required
                /> <br />
                <label htmlFor="password">Password: </label>
                <input className="loginInput" {...register("password")}
                placeholder="Password"
                type="password"
                required
                /> <br />
                <label htmlFor="passwordConfirmation">Confirm Password: </label>
                <input className="loginInput" {...register("password_confirmation")}
                placeholder="Confirm Password"
                type="password"
                required
                /> <br />
                <button className="loginButtton" type="submit">Create new user</button>
                { errors?.length > 0 ? <div>{errors.map((err, index) => (<div key={index}>*{err}*</div>))}</div>: null}
            </form>
            </div>
        </div>
    )

}

export default Signup