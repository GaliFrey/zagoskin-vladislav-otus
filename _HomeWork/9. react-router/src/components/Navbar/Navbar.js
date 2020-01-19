import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-brand">
        Приложение погоды
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">Главная</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">О приложении</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
