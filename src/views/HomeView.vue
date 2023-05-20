<template>
  <div class="home">
    <WeatherComponent />
  </div>
</template>

<script>
import WeatherComponent from '@/components/WeatherComponent.vue'

export default {
  name: 'HomeView',
  components: {
    WeatherComponent
  }
}
</script>
