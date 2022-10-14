import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import { signupNewUserAsync } from "./loginSlice";


const Signup = () =>{
    const { register, handleSubmit } = useForm()
    const errors = useSelector(state => state.login.errors)
    const dispatch = useDispatch()


    const onSubmit = (data) => {
        dispatch(signupNewUserAsync(data))
        }
    
    return (
        <div >
            New user? Sign up here
            <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
                <label htmlFor="username">Username</label>
                <input {...register("username")}
                type="text"
                placeholder="username"
                required
                />
                <label htmlFor="email">Email: </label>
                <input {...register("email")}
                type="text"
                placeholder="email"
                required
                />
                <label htmlFor="password">Password: </label>
                <input {...register("password")}
                placeholder="Password"
                type="password"
                required
                />
                <label htmlFor="passwordConfirmation">Confirm Password: </label>
                <input {...register("password_confirmation")}
                placeholder="Confirm Password"
                type="password"
                required
                />
                <button type="submit">Create new user</button>
                { errors?.length > 0 ? <div>{errors.map((err, index) => (<div key={index}>*{err}*</div>))}</div>: null}
            </form>
           
        </div>
    )

}

export default Signup