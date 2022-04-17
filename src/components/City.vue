<template>
  <div class="city-component">
    <h3 v-for="(city, indexCity) in listCity" :key="city.id">
      {{ `${city.id}__${city.code}__${city.name}` }}
      <button @click="pickCity(city)">Chọn {{ city.name }}</button>
      <button @click="deleteCity(indexCity)">Xóa {{ city.name }}</button>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'City',
  props: [
      // 'listCity'
  ],
  data() {
    return {

    }
  },
  methods: {
    pickCity(city) {
      console.log(city);
      this.$emit('pickCity', city);
    },
    deleteCity(indexCity) {
      this.$emit('deleteCity', indexCity);
    },
  }
}
</script>

<style scoped>
.city-component {
  border: 2px solid green;
}
</style>
