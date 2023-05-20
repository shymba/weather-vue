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
              :value="city.name"
          />
        </datalist>
      </form>
      <div class="table">
        <table id="weather">
          <tr>
            <th>City</th>
            <th>feels_like</th>
            <th>temp</th>
          </tr>
          <tr class="content" v-for="city in cityListData" :key="city.id">
            <td>{{ city.name }}</td>
            <td>{{ city.feels_like }}</td>
            <td>{{ city.temp }}</td>
<!--            <span class="trash" @click="removeCity(city.id)"><i class="far fa-trash-alt"></i></span>-->
          </tr>
<!--          <p class="text" v-else>*The list is empty, please select a city from the dropdown list</p>-->
        </table>
      </div>
      <BarChart
          :cityCoord="cityCoord"
      />
    </div>
  </div>
</template>

<script>
import ApiService from "@/modules/apiService";
import BarChart from "@/components/BarChart";

const apiCityWeather = new ApiService()

export default {
  name: 'WeatherComponent',
  components: { BarChart },
  data() {
    return {
      cities: null,
      inputCityName: null,
      cityData: null,
      HourlyForecast: null,
      cityListData: [],
      cityID: Number,
      cityCoord: []
    }
  },
  methods: {
    async getCity(cityName) {
      const city = this.cities.find((city) => city.name === cityName)
      // console.log('getCity: ', city.lat, city.lon)

      this.cityData = await apiCityWeather.getOneCity(city.lat, city.lon)
      console.log(this.cityData);

      this.cityCoord.push(city.lat, city.lon)
      this.cityListData.push({
        name: this.cityData.name,
        feels_like: this.cityData.main.feels_like,
        temp: this.cityData.main.temp,
        id: this.cityData.id
      })
      this.cities = null;
      this.inputCityName = null;

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

input {
  margin: 25px;
}

h3 {
  color: white;
}

.table {
  width: 100%;
  border-radius: 5px;
}

#weather {
  border-collapse: collapse;
  width: 100%;
  color: $white-color;
}

#weather td, #weather th {
  border: none;
  padding: 8px;
  color: $dark-base-color;
}

#weather tr:nth-child(even) {
  background-color: $dark-bg-color;
}

#weather tr:hover td, tr:focus td {
  color: $hover-yellow-color;
}

#weather th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  color: $white-color;
}

</style>
