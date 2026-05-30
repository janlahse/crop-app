<script setup>
defineProps(['combo'])
</script>

<template>
  <div class="plot">
    <img v-for="(crop, index) in combo" :key="index" :src="crop.icon" :alt="crop.name"/>
  </div>
</template>

<style scoped>
.plot {
  display: flex;
}

img {
  width: 50px;
  padding: 5px;
}
</style>
