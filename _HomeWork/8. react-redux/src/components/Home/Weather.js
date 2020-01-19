import React from 'react';
import { connect } from "react-redux";

function Weather(props) {
  let result;

  if (!props.dataWeather.isLoaded) {
    result = (
      <div className="card-body">
        <h5 className="card-title"><span className="indicator">Температура: </span><span className="loaded">загрузка данных...</span></h5>
        <h5 className="card-title"><span className="indicator">Скорость ветра: </span><span className="loaded">загрузка данных...</span></h5>
      </div>
    )
  } else {
    result = (
      <div className="card-body">
        <h5 className="card-title"><span className="indicator">Температура: </span>{props.dataWeather.temp} ℃</h5>
        <h5 className="card-title"><span className="indicator">Скорость ветра: </span>{props.dataWeather.speed} м/с</h5>
      </div>
    )
  }

  return (
    <div className="card">
      <h5 className="card-header">Данные о погоде - {props.city.value}</h5>
      {result}
    </div>
  )
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Weather);
