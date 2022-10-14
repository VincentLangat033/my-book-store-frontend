import React from "react";
import { useForm } from "react-hook-form";




function Ratings() {
    
    const {handleSubmit, register} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="ratings">
            <p>Rate this Book:</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <select {...register("rating")}>
                    <option value="">Select...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                </select>
                <button type="submit">Submit Rating</button>
            </form>
        </div>
    )


}

export default Ratings 