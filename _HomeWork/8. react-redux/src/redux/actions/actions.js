export const addFavorite = (city) => ({
  type: 'ADD_FAVORITE',
  payload: city
});

export const delFavorite = (city) => ({
  type: 'DEL_FAVORITE',
  payload: city
});

export const changeCity = (city) => ({
  type: 'CHANGE_CITY',
  payload: city
});

export const updateWeatherData = (data) => ({
  type: 'UPDATE_WEATHER',
  payload: data
})


export const getWeatherData = (city) => {
  return (dispatch) => {
      dispatch(updateWeatherData({
        isLoaded: false,
        temp: null,
        speed: null
      }));

      fetch(`https://api.weatherbit.io/v2.0/current?city=${city.key}&key=183963103aa340a596e6496e6b5ba0af`)
      .then(res => res.json())
      .then(
        (result) => {
          const data = result.data[0];
          dispatch(updateWeatherData({
            isLoaded: true,
            temp: data.temp,
            speed: data.wind_spd
          }));
        }
      ).catch(
        () => {
          dispatch(updateWeatherData({
            isLoaded: true,
            temp: 'sory',
            speed: 'sory'
          }));
        }
      )
  };
}
