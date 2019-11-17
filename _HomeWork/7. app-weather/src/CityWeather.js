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

async getWeatherData() {
    const city = this.props.city;
    const URL = "https://api.weatherbit.io/v2.0/current?city=" + city + "&key=183963103aa340a596e6496e6b5ba0af";
    let response = await fetch(URL);

    if (response.status == 200) {
      let json = await response.json();
      this.setState({ weatherData: json });
    } else {
      this.setState({
        weatherData: {
          "data": [{
            "temp": 'none',
            "wind_spd": 'none'
          }]
        }
      });
    }

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
        <div><b>Температура: </b><span>{data.temp} ℃</span></div>
        <div><b>Скорость ветра: </b><span>{data.wind_spd} m/s</span></div>
      </div>
    )
  }
}

export default Cityweather
