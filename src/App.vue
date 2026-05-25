<script setup>
import { ref } from 'vue'
import SeasonMenu from './components/SeasonMenu.vue'
import FarmingPlot from './components/FarmingPlot.vue'
import { crops } from './scripts/data.js'
import { findCombinations } from './scripts/functions.js'

const season = ref('Autumn')
const comboLengths = ref([2, 9])

console.log(findCombinations(2, 5, 'Autumn'))
</script>

<template>
  <main>
    <h1>Crop App</h1>

    <SeasonMenu :currentSeason="season" @changeSeason="(newSeason) => (season = newSeason)" />

    <div>
      <FarmingPlot
        v-for="(combo, index) in findCombinations(...comboLengths, season)"
        :key="index"
        :combo="combo"
      />
    </div>

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
          <td>{{ crop.seasons }}</td>
        </tr>
      </tbody>
    </table>
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
  margin: 20px 40px;
}

main > * {
  margin-bottom: 20px;
}

button {
  background-color: white;
  border: 2px solid #444;
  border-radius: 50px;
  padding: 5px 10px;
  font-family: inherit;
  font-weight: bold;
  transition: 0.2s;
}

button:hover,
.active {
  color: white;
  background-color: #444;
}

table {
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid grey;
}
</style>
