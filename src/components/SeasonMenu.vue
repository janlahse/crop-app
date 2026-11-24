<script setup>
const props = defineProps(['currentSeasons'])
const seasons = ['Autumn', 'Winter', 'Spring', 'Summer']
</script>

<template>
  <div>
    <button
      v-for="season in seasons"
      :key="season"
      :class="props.currentSeasons.includes(season) ? 'active button' : 'button'"
      @click="$emit('clickSeason', season)"
    >
      {{ season }}
    </button>
  </div>
</template>

<style scoped>
div {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
