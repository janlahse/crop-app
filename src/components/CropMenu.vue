<script setup>
import { crops } from './../scripts/data.js'

const props = defineProps(['currentCrops'])
</script>

<template>
  <div class="plot">
    <button
      v-for="crop in crops"
      :key="crop.name"
      :class="props.currentCrops.includes(crop) && 'active'"
      @click="$emit('clickCrop', crop)"
    >
      <img :src="crop.icon" :alt="crop.name" />
    </button>
  </div>
</template>

<style scoped>
.plot {
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  > button {
    padding: 0;
    border: none;
  }
}

img {
  width: 50px;
  height: 50px;
  padding: 10px;
  transition: 0.2s ease;
}

.active {
  > img {
    padding: 2px;
  }
}
</style>
