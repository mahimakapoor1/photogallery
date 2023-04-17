import React from 'react'
import { Link } from 'react-router-dom'
import "./Fun.css";
export default function Fun() {
  return (
   <>
   <div className="landing-page">
      <h1>Welcome to our Image Gallery App</h1>
      <p>Discover and search for beautiful images</p>
       <Link to='/app'><button>Gallery Page</button></Link>
      </div>
   </>
   
  )
}




