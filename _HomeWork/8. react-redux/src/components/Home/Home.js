import React, { Fragment } from 'react';
import { connect } from "react-redux";

import cities from '../../data/cities.json';
import Weather from './Weather';
import ItemFavors from './ItemFavors'

import { changeCity, addFavorite, getWeatherData } from '../../redux/actions/actions'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getWeatherData(this.props.city)
  }

  handleChange(e) {
    const newCity = cities.find(city => city.key === e.target.value);
    this.props.changeCity(newCity);
    this.props.getWeatherData(newCity)
  }

  handleClick() {
    this.props.addFavorite(this.props.city);
  }

  render() {
    const options = cities.map(city => (<option key={city.id} value={city.key}>{city.value}</option>));
    const city = this.props.city;

    return (
      <Fragment>
        <div className="input-group">
          <select className="custom-select" value={city.key} onChange={this.handleChange}>
            {options}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleClick}>В избранное</button>
          </div>
        </div>
        <hr />
        <Weather />
        <hr />
        <div className="card">
          <h5 className="card-header">Список избранных городов</h5>
          <ul className="list-group">
            <ItemFavors />
          </ul>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => dispatch(changeCity(city)),
  getWeatherData: (city) => dispatch(getWeatherData(city)),
  addFavorite: (city) => dispatch(addFavorite(city))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
