import React from 'react';

class Cityweather extends React.Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    this.getWeatherData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.city !== prevProps.city) {
      this.getWeatherData();
    }
  }

  getWeatherData() {
    const city = this.props.city;
    const URL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=4f8c5f438bee12a910ccc921c3549a6a";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }

  render() {
    const weatherData = this.state.weatherData;

    if (!weatherData) {
      return (<div>Загрузка...</div>);
    }

    const data = weatherData.data[0]
    return (
      <div className="city_info">
        <div>Погода в {this.props.city}</div>
        <div><b>Температура: </b><span>{data.temp}</span></div>
        <div><b>Скорость ветра: </b><span>{data.wind_spd}</span></div>
      </div>
    )
  }
}

export default Cityweather
