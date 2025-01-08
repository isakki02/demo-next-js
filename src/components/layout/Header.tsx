import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="/">Blog Spot</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/my-blogs">My Blogs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create-blog">Create Blog</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/account">Account</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header