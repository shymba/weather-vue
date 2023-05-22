<template>
  <div class="hello">
    <h3 class="title">Weather App</h3>
    <div class="select-container">
      <form>
        <input
            type="search"
            placeholder="search"
            list="data"
            v-model="inputCityName"
            @keydown.enter="getCity(inputCityName)"
            v-on:input="changeCity($event)"
            @input="onChange($event)"
        />
        <datalist id="data">
          <option
              v-for="city in cities"
              :key="city.lat"
          >{{city.name}}, {{city.country}}</option>
        </datalist>
      </form>

      <CityList
          :cityData="cityData"
          :cityWeather="cityWeather.list"
      />
    </div>
  </div>
</template>

<script>
import ApiService from "@/modules/apiService";
import MyChart from "@/components/MyChart";
import CityList from "@/components/CityList";

const apiCityWeather = new ApiService()

export default {
  name: 'WeatherComponent',
  components: { MyChart, CityList },
  data() {
    return {
      cities: null,
      inputCityName: null,
      cityData: [],
      HourlyForecast: null,
      cityListData: [],
      cityID: Number,
      cityWeather: [
          {
            dt_txt: "2023-05-22 21:00:00",
            main: { temp: 14.34 }
          }
          ]
    }
  },
  methods: {
    async getCity(cityName) {
      const cityInp = cityName.split(', ');
      const city = this.cities.find((city) => {
        return city.name === cityInp[0] && city.country === cityInp[1]
      });

      const apiData = await apiCityWeather.getOneCity(city.lat, city.lon)
      this.cityData.push(
          {
            name: apiData.name,
            temp: apiData.main.temp,
            feels: apiData.main.feels_like,
            id: apiData.id
          }
      )
      this.inputCityName = null;
      this.cityWeather = await apiCityWeather.getHourlyForecastData(city.lat, city.lon);
    },
    changeCity(e) {
        if(!e.inputType) {
        this.getCity(this.inputCityName)
      }
    },
    async onChange(e) {
      let arr = [];
      this.inputCityName = e.target.value;
      this.cities = await apiCityWeather.getCitiesList(this.inputCityName);
    },
  },
}
</script>

<style scoped lang="scss">

$white-color: #FFFFFF;
$hover-yellow-color: #fdd114;
$dark-base-color: #6D6C58;
$dark-bg-color: #39343B;
$hover-basket-color: #CC0022;

.title {
  margin-bottom: 30px;
}

form input {
  border: 0;
  border-radius: 50px;
  font-size: 16px;
  padding: 15px 30px;
  width: 30%;
}

input:focus {
  outline: none;
}

h3 {
  color: white;
}

.card {
  margin: auto;
  width: 600px;
  color: #FFFFFF;
}

.card__city-name {

}

.card__chart {
  max-width: 600px;
}
</style>
