import { combineReducers } from 'redux'
import {itemsFavorite, city, dataWeather} from './reducers'


export default combineReducers({
  itemsFavorite,
  city,
  dataWeather
})
