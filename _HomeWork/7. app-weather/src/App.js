import React from 'react';
import Cityweather from './CityWeather';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'Moskow',
      favorites: []
    }

    this.reloadWeather = this.reloadWeather.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
  }

  reloadWeather() {
    const cityName = document.getElementById('cityName').value;

    this.setState({
      city: cityName
    })
  }

  addFavorite() {
    const cityName = document.getElementById('cityName').value;

    let favs = this.state.favorites;

    if (!favs.includes(cityName)) {
      favs.push(cityName);
      this.setState({
        favorites: favs
      })
    }
  }

  render() {

    return (
      <div className="container">
        <h3>Погода онлайн</h3>
        <input type="text" placeholder="Название города" id="cityName" defaultValue={this.state.city} />
        <div className="button_container">
          <button onClick={this.reloadWeather}>Показать</button>
          <button onClick={this.addFavorite}>Добавить в избранное</button>
        </div>
        <Cityweather city={this.state.city} />
        <h3>Избранные города</h3>
        {this.state.favorites.map((place, index) => (
          <Cityweather city={place} key={index} />
        ))}
      </div>
    )
  }
}

export default App
