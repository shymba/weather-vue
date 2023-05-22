<template>
  <div>
    <canvas :id="id"  width="500" height="400"></canvas>
<!--    <button @click="test">click</button>-->
  </div>
</template>

<script>
import {Chart} from "chart.js/auto";

export default {
  name: "MyChart",
  props:{
    id: {
      type: Number,
      required: true
    },
    labelsChart: {
      type: Array,
      required: true
    },
    dataChart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartData: {
        // labels: ["Jan1", "Jan2", "Jan3", "Jan4", "Jan5", "Jan6", "Jan7"],
        labels: this.labelsChart,
        datasets: [
          {
            label: "This week",
            // data:  [12, 19, 10, 17, 6, 3, 7],
            data:  this.dataChart,
            backgroundColor: "rgba(224, 248, 255, 0.4)",
            borderColor: "#5cddff",
            lineTension: 0,
            pointBackgroundColor: "#5cddff",
          },
        ],
      },
      // chart: '',
      dataLabels: [],
      dataDatasets: []
    }
  },
  methods: {
    chartConstructor() {
      // const chartElement = document.querySelector("canvas");
      let chartElement = document.getElementById(`${this.id}`);
      this.chart = new Chart(chartElement, {
        type: "line",
        data: this.chartData,
      });
    },
    // getInfoWeather(inpInfo) {
    //   let temp = [];
    //   let label = [];
    //   inpInfo.forEach((dayInfo) => {
    //     // console.log(dayInfo.main.temp);
    //     temp.push(dayInfo.main.temp)
    //     label.push(dayInfo.dt_txt)
    //   })
    //   return {
    //     chartData: {
    //       labels: label,
    //       datasets: [
    //         {
    //           label: "This week",
    //           data:  temp,
    //           backgroundColor: "rgba(224, 248, 255, 0.4)",
    //           borderColor: "#5cddff",
    //           lineTension: 0,
    //           pointBackgroundColor: "#5cddff",
    //         },
    //       ],
    //     },
    //   }
    // },
    test() {
    },
  },
  // computed: {
  //   dataForChart() {
  //     this.cityWeather.forEach((dayInfo) => {
  //       this.dataLabels.push(dayInfo.main.dt_txt)
  //       this.dataDatasets.push(dayInfo.main.temp)
  //     })
  //     return this.chartData
  //   }
  // },
  mounted() {
    this.chartConstructor();
  }
}
</script>

<style scoped>

</style>