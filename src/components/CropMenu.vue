<script setup>
import { crops } from './../scripts/data.js'

const props = defineProps(['currentCrops'])
</script>
<!-- : vor class -->
<template>
  <div class="plot">
    <button
      v-for="crop in crops"
      :key="crop.name"
      class="props.currentCrops.includes(crop) && 'active'"
      @click="$emit('clickCrop', crop)"
    >
      <img :src=crop.icon :alt="crop.name" />
    </button>
  </div>
</template>

<style scoped>
.plot {
  display: flex;
  gap: 10px;
  > button {
    padding: 0;
  }
}

img {
  width: 30px;
  height: 30px;
  padding: 5px;
}
</style>
