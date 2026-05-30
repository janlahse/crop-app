<script setup>
import { ref } from 'vue'
import SeasonMenu from './components/SeasonMenu.vue'
import FarmingPlot from './components/FarmingPlot.vue'
//import { crops } from './scripts/data.js'
import { allCombos } from './scripts/allCombos.js'
import { filterSeason, filterCrops } from './scripts/functions.js'
import CropMenu from '@/components/CropMenu.vue'

const seasons = ref(['Autumn'])
const currentCrops = ref([])

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
  <main>
    <h1>Crop App</h1>

    <SeasonMenu :currentSeasons="seasons" @clickSeason="(season) => changeSeasons(season)" />
    <CropMenu :currentCrops="currentCrops" @clickCrop="(crop) => changeCrops(crop)" />

    <hr/>

    <div>
      <FarmingPlot
        v-for="(combo, index) in filterCrops(filterSeason(allCombos, seasons), currentCrops)"
        :key="index"
        :combo="combo"
      />
    </div>
<!--
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Crop</th>
          <th>Growth</th>
          <th>Compost</th>
          <th>Manure</th>
          <th>Season</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crop in crops" :key="crop.name">
          <td>{{ crop.name }}</td>
          <td>{{ crop.growth }}</td>
          <td>{{ crop.compost }}</td>
          <td>{{ crop.manure }}</td>
          <td>{{ crop.seasons.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
    -->
  </main>
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

main {
  margin: 20px 20px;
  * {
    color: #111;
  }
}

main > * {
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
