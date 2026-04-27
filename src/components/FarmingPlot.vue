<script setup>
defineProps(['combo'])
</script>

<template>
  <div class="plot">
    <img v-for="(crop, index) in combo" :key="index" :src="crop.icon" />
  </div>
</template>

<style scoped>
.plot {
  display: flex;
  gap: 5px;
}

img {
  width: 32px;
  padding: 5px;
}
</style>
