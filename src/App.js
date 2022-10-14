import React, { useEffect } from 'react';
import BookSearch from './components/books/BookSearch'
import Bookshelf from './components/bookshelf/Bookshelf'
import Login from './components/authentication/Login';
import Logout from './components/authentication/Logout';
import Signup from './components/authentication/Signup';
import Dashboard from './components/user/Dashboard';
import {useSelector, useDispatch} from "react-redux";
import { fetchCurrentUserAsync } from './components/authentication/loginSlice';
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
      <div className='app-container'>
      <div className="login">
        <header className="App-header">
          <h3>Book_Store</h3>
        <ul className="header-links">
          <li ><Link to="/dashboard">Home</Link></li>
          <li><Link to="/searchBooks">Search for books</Link></li>
          <li><Link to="/myBooks">Go to my books</Link></li>
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
      </div>
    )} else {
      return (
        <div>
          <header className="App-header">
            <h3>Book it!</h3>
            <ul className="Header-links">
            <li className='loginLogo'><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
            </header>

            <div className='login'>
           <div className="loginWrapper">
           <div className="loginLeft"> 
     
          
          </div>
          </div>

          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/*" element={<Navigate to="/login" />} />
          </Routes>
          </div>
        </div>
    )}
}

export default App;
