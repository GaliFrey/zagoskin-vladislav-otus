import React from 'react'
import Cities from '../../data/cities.json'
import moment from 'moment'
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${this.props.match.params.key}&key=183963103aa340a596e6496e6b5ba0af`)
      .then(res => res.json())
      .then(
        (result) => {
          const data = result.data.slice(1, 4);
          this.setState({
            data: data
          })
        }
      ).catch(
        () => {
          this.setState({
            data: null
          })
        }
      )
  }

  render() {
    const data = this.state.data;
    const city = Cities.find(city => city.key === this.props.match.params.key);
    if (data) {
      return (
        <div className="card">
          <h5 className="card-header">Данные о погоде - {city.value}</h5>
          {
            data.map((item, index) => (
              <ShowWeatherAnyDays key={index} parameters={item} />
            ))
          }
        </div>
      )
    } else {
      return (
        <div className="card">
          <h5 className="card-header">Данные о погоде 3 дня- {city.value}</h5>
        </div>
      )
    }
  }
}

function ShowWeatherAnyDays(props) {
  const date = moment(props.parameters.datetime).format('DD.MM.YYYY');
  return (
    <div className="card-body">
      <h5 className="card-title"><span className="indicator">Дата: </span>{date}</h5>
      <h5 className="card-title"><span className="indicator">Температура: </span><span>{props.parameters.temp} ℃</span></h5>
      <h5 className="card-title"><span className="indicator">Скорость ветра: </span><span>{props.parameters.wind_spd} м/с</span></h5>
    </div>
  )
}

export default About
