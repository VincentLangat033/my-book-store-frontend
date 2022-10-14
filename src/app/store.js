import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/authentication/loginSlice';
import bookshelfReducer from '../components/bookshelf/bookshelfSlice'
import ratingsReducer from '../components/ratings/ratingsSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    bookshelf: bookshelfReducer,
    ratings: ratingsReducer
  },
});
