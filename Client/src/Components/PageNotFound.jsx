import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='pagenotfound'>
      <div>
        <h1>404 Page Not Found</h1>
        <p>
          The page you are looking for could not be found.
        </p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default PageNotFound
