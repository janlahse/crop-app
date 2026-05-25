import { crops } from './data.js'

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
  return !(nutrients.growth < 0 || nutrients.compost < 0 || nutrients.manure < 0)
}

export function checkSeason(combo, season) {
  let isSameSeason = true
  combo.forEach((crop) => {
    if (!crop.seasons.includes(season)) isSameSeason = false
  })
  return isSameSeason
}

function gcd() {
  //source: https://stackoverflow.com/questions/39764637/gcd-of-more-than-2-numbers
  let arr = Array.prototype.slice.call(arguments)
  return arr.reduce(function (a, b) {
    if (b === 0) {
      return a
    }
    return gcd(b, a % b)
  })
}

function toComboHelper(combo) {
  let comboHelper = {}

  combo.forEach((crop) => {
    if (Object.keys(comboHelper).includes(crop.name)) comboHelper[crop.name] += 1
    else comboHelper[crop.name] = 1
  })

  return comboHelper
}

function reduceCombo(combo) {
  let comboHelper = toComboHelper(combo)

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

export function findCombinations(lengthMin, lengthMax, season) {
  // source: https://stackoverflow.com/questions/32543936/combination-with-repetition
  let results = []

  for (let l = lengthMin; l <= lengthMax; l++) {
    if (l === void 0) l = crops.length // Length of the combinations
    let data = Array(l); // Used to store state

    (function f(pos, start) { // Recursive function
      if (pos === l) { // End reached
        let outputCombo = data.slice();
        if (checkSustainable(outputCombo)) { //only adds sustainable combos
          results.push(outputCombo) // Add a copy of data to results
        }
        return
      }

      for (let i = start; i < crops.length; ++i) {
        data[pos] = crops[i] // Update data
        f(pos + 1, i) // Call f recursively
      }
    })(0, 0) // Start at index 0
  }

  results = results.filter((combo) => checkSeason(combo, season)) // Filter for season
  return removeDuplicates(results) // Return results
}
