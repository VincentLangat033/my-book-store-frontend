import React, { useState } from "react";
import { useForm } from "react-hook-form"
import BookCard from "./BookCard"


const BookSearch = () => {
    const [searchResult, setSearchResult] = useState([])

    const {register, handleSubmit, reset } = useForm()

    const onSubmit = (data) => {
        const combinedData = data.bookQuery.split(" ").join("+")
        //google books search volumes fetch request and store in local state - move to book store? 
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${combinedData}`)
        .then( (r) => {
            if(r.ok){
                r.json()
                .then(bookSearch => setSearchResult(bookSearch.items))
                }
        })
        //process books search results
        reset()
    }

    const handleAddedBook = () => {
        setSearchResult([])
    }
    

    return (
        <div>
            <h3>Search for a Book...</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("bookQuery")}
                type="text"
                placeholder="Search for a book"
                required
                />
                <button type="submit">Search</button>
            </form>
            <div className="bookContainer">
            {searchResult.length > 0 ? searchResult.map((book) => <BookCard key={book.id} book={book.volumeInfo} onAddBook={handleAddedBook} />) : null}
            </div>
        </div>

    )
}

export default BookSearch