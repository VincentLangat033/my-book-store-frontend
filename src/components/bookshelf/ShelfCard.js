import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookshelfAsync, deleteBookshelfAsync } from "./bookshelfSlice";
import { createNewRatingAsync, updateRatingAsync, deleteRatingAsync} from "../ratings/ratingsSlice";
import { useForm } from "react-hook-form";


const ShelfCard = ( { shelf, book }) => {
    const {id, read, owned } = shelf
    const {title, author, /*genre, synopsis,*/ image_url } = book
    const myRatings = useSelector(state => state.ratings.myRatings)

    const dispatch = useDispatch()

    const thisRating = myRatings.find(rating => rating.book_id === book.id)
    

    const {handleSubmit, register, reset} = useForm()

    const onNewSubmit = (formdata) => {
        const rating  = formdata.rating
        const data = {rating, book_id: book.id}
        dispatch(createNewRatingAsync(data))
    }

    const onUpdateSubmit = (formdata) => {
        const rating  = formdata.rating
        const data = {rating, id: thisRating.id}
        dispatch(updateRatingAsync(data))
        reset()
    }

    function handleRemoveRating() {
        dispatch(deleteRatingAsync(thisRating.id))
    }

    function handleRemoveBook() {
        dispatch(deleteBookshelfAsync(id))
    }

    const handleReadUpdate = () => {
        const data = { id: id, read: !read }
        dispatch(updateBookshelfAsync(data))
    }  

    const handleOwnedUpdate = () => {
        const data = {id: id, owned: !owned }
        dispatch(updateBookshelfAsync(data))
    }

    return (
        <div className="book">
            {/*some link to book to DRY out code*/}
            <img src={image_url} alt={title} width="75" length="90"/>
            <h4>{title}</h4>
            <h4>{author}</h4>
            <div className="bookInfo">
                {read ? (<h4>Read it!</h4>) : (<h4>I still need to read this.</h4>) }
                {owned ? (<h4>Own a copy!</h4>) : (<h4>Don't own a copy.</h4>) }
            </div>
            { read ? (<button onClick={handleReadUpdate}>Have you read this book yet?</button>) : (<button onClick={handleReadUpdate}>Yes, I have read this</button>)}
            { owned ? (<button onClick={handleOwnedUpdate}>I don't own this yet!</button>) : (<button onClick={handleOwnedUpdate}>I own this one.</button>) }
            <button onClick={handleRemoveBook}>Remove from my Library</button>
            {/* ratings section */}
            {thisRating ? (
                <div>
                    <div className="ratings">
                        <p>I have rated this book <strong>{thisRating.rating}/5</strong>!</p>
                        <p>Update my rating:</p>
                        <form onSubmit={handleSubmit(onUpdateSubmit)}>
                            <select {...register("rating")}>
                                <option value="">Select...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </select>
                            <button type="submit">Update Rating</button>
                        </form>
                    </div>
                    <button onClick={handleRemoveRating}>Remove my rating</button>
                </div>
            ) : (
                <div className="ratings">
                    <p>Rate this Book:</p>
                    <form onSubmit={handleSubmit(onNewSubmit)}>
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
            )}
        </div>
    )

}

export default ShelfCard