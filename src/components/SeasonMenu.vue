<script setup>
const props = defineProps(['currentSeason'])

const seasons = ['Autumn', 'Winter', 'Spring', 'Summer']
</script>

<template>
  <div>
    <button
      v-for="season in seasons"
      :key="season"
      :class="season === props.currentSeason && 'active'"
      @click="$emit('changeSeason', season)"
    >
      {{ season }}
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 15px;
}
</style>
