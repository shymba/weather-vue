export default class ApiService {

    _apiKey = '74793db7b6b9e806a38511a9fcd8a506'
    // _apiKey = '595981581c5f85755a86767360e209a1'

    async getCitiesList(city) {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this._apiKey}`)
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this._apiKey}`)
                            .then((res) => res.json())
        console.log(response);
        return response
    }

    async getOneCity(lat, lon) {
        // const response = await fetch(`${this._apiBase}`).then((res) => res.json())
        // const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${this._apiKey}`)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric`)
            .then((res) => res.json())
        console.log(response);
        return response
    }

    async getHourlyForecastData(lat, lon) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this._apiKey}&units=metric`)
                        .then((res) => res.json())
        console.log(response);
        return response
    }

}