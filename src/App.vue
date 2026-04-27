<script setup>
import { ref } from 'vue'
import FarmingPlot from './components/FarmingPlot.vue'
import { crops } from './data.js'
import SeasonMenu from './components/SeasonMenu.vue'

const season = ref('Autumn')
const comboLengths = ref([2, 9])

function addNutrients(combo) {
  return {
    name: combo.reduce((a, c) => a + c.name + ' ', '').trim(),
    growth: combo.reduce((a, c) => a + c.growth, 0),
    compost: combo.reduce((a, c) => a + c.compost, 0),
    manure: combo.reduce((a, c) => a + c.manure, 0),
  }
}

function checkSustainable(combo) {
  const nutrients = addNutrients(combo)
  return nutrients.growth < 0 || nutrients.compost < 0 || nutrients.manure < 0 ? false : true
}

function checkSeason(combo, season) {
  let isSameSeason = true
  combo.forEach((crop) => {
    if (!crop.seasons.includes(season)) isSameSeason = false
  })
  return isSameSeason
}

function gcd() {
  //source: https://stackoverflow.com/questions/39764637/gcd-of-more-than-2-numbers
  var arr = Array.prototype.slice.call(arguments)
  return arr.reduce(function (a, b) {
    if (b == 0) {
      return a
    }
    return gcd(b, a % b)
  })
}

function reduceCombo(combo) {
  let comboHelper = {}
  combo.forEach((crop) => {
    if (Object.keys(comboHelper).includes(crop.name)) comboHelper[crop.name] += 1
    else comboHelper[crop.name] = 1
  })

  let cropAmounts = Object.entries(comboHelper).map((crop) => crop[1])
  const divisor = gcd(...cropAmounts)
  let output = []
  Object.keys(comboHelper).forEach((crop) => (comboHelper[crop] = comboHelper[crop] / divisor))
  Object.keys(comboHelper).forEach((crop) => {
    for (let i = 0; i < comboHelper[crop]; i++) {
      output.push(combo.find((currentCrop) => currentCrop.name === crop))
    }
  })
  return output
}

function isDuplicate(firstArray, secondArray) {
  const longerArrayLength = firstArray < secondArray ? secondArray.length : firstArray.length
  for (let i = 0; i < longerArrayLength; i++) {
    if (firstArray[i] !== secondArray[i]) return false
  }
  return true
}

function removeDuplicates(comboList) {
  for (let i = 0; i < comboList.length; i++) {
    for (let j = i + 1; j < comboList.length; j++) {
      if (isDuplicate(comboList[i], reduceCombo(comboList[j]))) comboList.splice(j, 1)
    }
  }
  return comboList
}

function findCombinations(lengthMin, lengthMax, season) {
  // source: https://stackoverflow.com/questions/32543936/combination-with-repetition
  let output = []

  for (let l = lengthMin; l <= lengthMax; l++) {
    if (l === void 0) l = crops.length // Length of the combinations
    var data = Array(l), // Used to store state
      results = [] // Array of results
    ;(function f(pos, start) {
      // Recursive function
      if (pos === l) {
        // End reached
        results.push(data.slice()) // Add a copy of data to results
        return
      }
      for (var i = start; i < crops.length; ++i) {
        data[pos] = crops[i] // Update data
        f(pos + 1, i) // Call f recursively
      }
    })(0, 0) // Start at index 0
    results = results.filter((combo) => checkSustainable(combo)) // Filter for sustainability
    results = results.filter((combo) => checkSeason(combo, season)) // Filter for season
    output = [...output, ...results]
  }
  return removeDuplicates(output) // Return results
}
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
