import React, { useEffect } from 'react';
import BookSearch from './features/books/BookSearch'
import Bookshelf from './features/bookshelf/Bookshelf'
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import Signup from './features/auth/Signup';
import Dashboard from './features/user/Dashboard';
import {useSelector, useDispatch} from "react-redux";
import { fetchCurrentUserAsync } from './features/auth/loginSlice';
import {Routes, Route, Navigate, Link} from "react-router-dom";
import './App.css';


function App() {

  const currentUser = useSelector(state => state.login.currentUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUserAsync())
    // eslint-disable-next-line
  }, [])

  if (currentUser) {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Book it!</h3>
        <ul className="Header-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/searchBooks">Search for books</Link></li>
          <li><Link to="/myBooks">Go to my books 2</Link></li>
        </ul>
        <Logout />
        </header>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/searchBooks" element={<BookSearch />} />
          <Route exact path="/myBooks" element={<Bookshelf />} />
          {/* my comments 
          my ratings */}
          <Route exact path="/*" element={<Navigate to="dashboard" />} /> 
        </Routes> 
      </div>
    )} else {
      return (
        <div className='App'>
          <header className="App-header">
            <h3>Book it!</h3>
          <ul className="Header-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
          </header>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
    )}
}

export default App;
