<script setup>
import { crops } from './../scripts/data.js'
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Crop</th>
        <th>Name</th>
        <th>Growth</th>
        <th>Compost</th>
        <th>Manure</th>
        <th>Season</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="crop in crops" :key="crop.name">
        <td><img :src="crop.icon" :alt="crop.name" /></td>
        <td>{{ crop.name }}</td>
        <td>{{ crop.growth }}</td>
        <td>{{ crop.compost }}</td>
        <td>{{ crop.manure }}</td>
        <td>{{ crop.seasons.join(', ') }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
