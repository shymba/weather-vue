<template>
  <div class="card">
    <div class="card__info-block">
      <div class="card__city-name">City Name: {{city.name}}</div>
      <div class="card__city-temp">
        <div class="city-temp__feels">Temperature: {{city.temp}}</div>
        <div class="city-temp__temp">Feels like: {{city.feels}}</div>
      </div>
    </div>
    <div class="card__chart">
<!--      <MyChart-->
<!--          :labelsChart="dataLabelWeather"-->
<!--          :dataChart="dataWeather"-->
<!--          :id="city.id"-->
<!--      />-->
    </div>
  </div>

</template>

<script>
import MyChart from "@/components/MyChart";

export default {
  name: "CityItem",
  components: { MyChart },
  props: {
    city: {
      type: Object,
      required: true
    },
    cityWeather: {
      type: Array
    }
  },
  data() {
    return {
      dataLabels: [],
      datasetsForChart: []
    }
  },
  methods: {},
  computed: {
    dataLabelWeather() {
      this.cityWeather.forEach((dayInfo) => {
        this.dataLabels.push(dayInfo.dt_txt)
      })
      // console.log('cityItem dataLabels', this.dataLabels)
      return this.dataLabels
    },
    dataWeather() {
      this.cityWeather.forEach((dayInfo) => {
        this.datasetsForChart.push(dayInfo.main.temp)
      })
      // console.log('cityItem datasets', this.datasetsForChart)
      return this.datasetsForChart
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 30px 30px;
}

</style>