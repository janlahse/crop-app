<script setup>
const props = defineProps(['currentSeasons'])
const seasons = ['Autumn', 'Winter', 'Spring', 'Summer']

</script>

<template>
  <div>
    <button
      v-for="season in seasons"
      :key="season"
      :class="seasons === props.seasons && 'active'"
      @click="$emit('clickSeason', season)"
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
