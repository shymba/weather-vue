<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import ApiService from "@/modules/apiService";
import {Bar} from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const apiCityWeather = new ApiService()

export default {
  name: "BarChart",
  components: {Bar},
  props: {
    cityCoord: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Hourly Forecast',
          backgroundColor: '#efe6e6',
          data: [18.68, 12.72, 11.48, 11.09]
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  methods: {
    async getHourlyData(lat, lon) {
      console.log('chart', this.cityCoord)
      // lat = this.cityCoord[0];
      lat = 50.4500336;
      // lon = this.cityCoord[1];
      lon = 30.5241361;
      const apiRes = await apiCityWeather.getHourlyForecastData(lat, lon);
      const dataTemp = [];
      const dataLabel = [];
      apiRes.list.forEach((itemDataTemp) => {
        dataTemp.push(itemDataTemp.main.temp)
        dataLabel.push(itemDataTemp.dt_txt)
      })
      return {
        charData: {
          labels: dataLabel,
          datasets: [{
            label: 'Hourly Forecast',
            backgroundColor: '#efe6e6',
            data: dataTemp
          }]
        }
      }
    },
  },
  async created() {
    this.chartData = (await this.getHourlyData()).charData
  }
}
</script>

<style scoped>

</style>