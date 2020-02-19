import React from 'react'
import { connect } from "react-redux";

import { changeCity, delFavorite, getWeatherData } from '../../redux/actions/actions'

class ItemFavors extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(city) {
    this.props.changeCity(city);
    this.props.getWeatherData(city)
    console.log(city);
  }

  render() {
    const favorites = this.props.itemsFavorite;

    const listFavorites = favorites.map(city => (
      <li key={city.id} className="list-group-item">
        {city.value}
        <span className="buttons">
          <button
            type="button"
            className="btn btn-outline-success"
            data-city={city.key}
            onClick={() => this.handleClick(city)}
          >Показать
      </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={
              () => this.props.delFavorite(city)
            }
          >Удалить
      </button>
        </span>
      </li>
    ))

    return listFavorites
  }
}


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = (dispatch) => ({
  changeCity: (city) => dispatch(changeCity(city)),
  getWeatherData: (city) => dispatch(getWeatherData(city)),
  delFavorite: (city) => dispatch(delFavorite(city))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemFavors);
