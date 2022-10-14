
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRatingsAsync, fetchMyRatingsAsync } from "../ratings/ratingsSlice";
import { loadBookshelf } from "./bookshelfSlice";
import ShelfCard from "./ShelfCard";

const Bookshelf = () => {
    const currentUser = useSelector(state => state.login.currentUser)
    const bookshelves = useSelector(state => state.bookshelf.bookshelves)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(loadBookshelf(currentUser.bookshelves.data.map((att) => (att.attributes))))
        dispatch(fetchAllRatingsAsync())
        dispatch(fetchMyRatingsAsync())
        // eslint-disable-next-line
    }, [])

    
    return (    
        <div className="bookShelf"> 
            <h3>My books</h3>
            <div className="bookContainer"> 
            {bookshelves.map((shelf) => <ShelfCard key={shelf.id} shelf={shelf} book={shelf.book.data.attributes}/> )} 
            {/* use shelf.book.id to pull book info from BOOK store*/}   
            </div>
        </div>
    )
}

export default Bookshelf

/* The bookshelf will show all books added by the user
/* The bookshelf is created when a book is added to the database
/* The bookshelf will need to access user.shelf data and book data states
/* The bookshelf will need update this.shelf.data and update in store
/* A book can be selected from the shelf and more data provided. 
/* book will need to have access to bookshelf data and comment data */

/* fetch function for users.bookshelves to be tied to view shelf link/button does this need to be done separately?
/* as this will update when page accessed? However if direct route what happens? does it need on component load?*/

/* books store to be created and state to be accessible */
/* comments store to be created and state to be accessible */
/* check back end is working */ 