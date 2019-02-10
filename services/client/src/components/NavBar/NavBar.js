import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <nav className="navbar is-dark has-shadow" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <strong className="navbar-item">TestDriven.io</strong>
        <span
          className="nav-toggle navbar-burger"
          onClick={() => {
            let toggle = document.querySelector(".nav-toggle");
            let menu = document.querySelector(".navbar-menu");
            toggle.classList.toggle("is-active");
            menu.classList.toggle("is-active");
          }}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/about" className="navbar-item">About</Link>
        </div>
        <div className="navbar-end">
            {props.isAuthenticated ?
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  More
                </a>
                <div className="navbar-dropdown">
                  <Link to="/profile" className="navbar-item">Profile</Link>
                  <hr className="navbar-divider"></hr>
                  <Link to="/logout" className="navbar-item">Log Out</Link>
                </div>
              </div>
              :
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/register" className="button is-success is-outlined">Register</Link>
                  <Link to="/login" className="button is-white">Log In</Link>
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;