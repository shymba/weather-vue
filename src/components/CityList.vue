<template>
  <CityItem
      v-for="city in cityData"
      :city="city"
      :cityWeather="cityWeather"
      :id="city.id"
  />
</template>

<script>
import CityItem from "@/components/CityItem";

export default {
  name: "CityList",
  components: {CityItem},
  props: {
    cityData: {
      type: Object
    },
    cityWeather: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>