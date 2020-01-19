import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";

const Navbar = (props) => {
  const favorites = props.itemsFavorite;
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-brand">
        Приложение погоды
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">Главная</NavLink>
        </li>

        {
          favorites.map(city => (
            <li className="nav-item" key={city.id}>
              <NavLink className="nav-link" to={`/cities/${city.key}`}>{city.value}</NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}


const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Navbar);
