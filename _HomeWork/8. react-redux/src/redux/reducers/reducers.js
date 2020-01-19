import cities from '../../data/cities.json';


export function itemsFavorite(state = [], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      const isFavoriteCity = state.findIndex(city => city.key === action.payload.key) !== -1
      if (isFavoriteCity) return state;

      return [...state, action.payload]

    case 'DEL_FAVORITE':
      const newListFavorites = state.filter(city => city.key !== action.payload.key)
      return [...newListFavorites]

    default:
      return state
  }
}

export function city(state = { ...cities[0] }, action) {
  switch (action.type) {
    case 'CHANGE_CITY':
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

export function dataWeather(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_WEATHER':
      return Object.assign({}, action.payload)

    default:
      return state
  }
}
