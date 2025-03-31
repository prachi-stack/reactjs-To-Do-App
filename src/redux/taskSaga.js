import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchWeatherSuccess, fetchWeatherFailure, fetchWeatherRequest } from './taskSlice';


const API_KEY = "77308d400dc6541850d2ad31b5f18dd0";

// Function to call the weather API
function* fetchWeatherSaga() {
    try {
        const response = yield call(axios.get,
            `https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=metric&appid=${API_KEY}`
        );
        yield put(fetchWeatherSuccess(response.data.main.temp)); // Dispatch success action
    } catch (err) {
        console.log(err)
        yield put(fetchWeatherFailure("Failed to fetch weather data")); // Dispatch failure action
    }
}

// Watcher Saga: Watches for FETCH_WEATHER_REQUEST action
function* taskSaga() {
    yield takeLatest(fetchWeatherRequest.type, fetchWeatherSaga);
}


export default taskSaga;
