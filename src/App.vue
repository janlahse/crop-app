<script setup>
import { ref } from 'vue'
import SeasonMenu from './components/SeasonMenu.vue'
import FarmingPlot from './components/FarmingPlot.vue'
import { allCombos } from './scripts/allCombos.js'
import { filterSeason, filterCrops } from './scripts/functions.js'
import CropMenu from '@/components/CropMenu.vue'
import CropTable from '@/components/CropTable.vue'

const seasons = ref(['Autumn'])
const currentCrops = ref([])
const darkMode = ref(false)

function changeSeasons(clickedSeason) {
  if (seasons.value.includes(clickedSeason)) {
    const index = seasons.value.indexOf(clickedSeason)
    if (index > -1) {
      seasons.value.splice(index, 1)
    }
  } else {
    seasons.value.push(clickedSeason)
  }
}

function changeCrops(clickedCrop) {
  if (currentCrops.value.includes(clickedCrop)) {
    const index = currentCrops.value.indexOf(clickedCrop)
    if (index > -1) {
      currentCrops.value.splice(index, 1)
    }
  } else {
    currentCrops.value.push(clickedCrop)
  }
}
</script>

<template>
  <div :class="darkMode ? 'body dark' : 'body'">
    <header>
        <h1>Crop App</h1>
        <button
          :class="button"
          @click="darkMode = !darkMode"
        >
          {{ darkMode ? "Light" : "Dark" }}
        </button>
      </header>
      <main>
        <SeasonMenu :currentSeasons="seasons" @clickSeason="(season) => changeSeasons(season)" />

        <CropMenu :currentCrops="currentCrops" @clickCrop="(crop) => changeCrops(crop)" />

        <hr />

        <div>
          <FarmingPlot
            v-for="(combo, index) in filterCrops(filterSeason(allCombos, seasons), currentCrops)"
            :key="index"
            :combo="combo"
          />
        </div>

        <CropTable />
      </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

* {
  font-family: 'Trebuchet MS', Arial, sans-serif;
}

header {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.body {
  padding: 20px;
  color: #111;

  &.dark {
    color: white;
    background-color: #111;
  }
}

header, main > * {
  margin-bottom: 20px;
}

button {
  background-color: white;
  border: 2px solid #111;
  border-radius: 50px;
  padding: 5px 10px;
  font-size: 1em;
  font-family: inherit;
  font-weight: bold;
  transition: 0.2s;
}

.button {
  &.active {
    color: white;
    background-color: #111;
  }
}

table {
  border-collapse: collapse;
  max-width: 100vw;
  overflow-x: auto;
}

th,
td {
  padding: 5px;
  text-align: center;
  border: 1px solid grey;
}
</style>
