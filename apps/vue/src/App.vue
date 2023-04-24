<script setup lang="ts">
import { reactive } from 'vue'
import { createList } from './utils/list'

const state = reactive({ list: createList() })

state.list = createList()
</script>

<template>
  <header><img src="./assets/logo.svg" alt="" height="50"> - Vue</header>
  <ul>
    <li v-for="item in state.list" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<style scoped>
header {
  text-align: center;
  font-size: 48px;
  padding-bottom: 10px;
  color: white;
}

header, img {
  vertical-align: middle;
}
ul {
  margin: 0;
  padding: 0;
  width: 100%;
  color: white;
}

li {
  list-style-type: none;
  padding: 10px;
  border: 1px solid grey;
  display: inline-block;
  width: 50%;
}

@media (min-width: 420px) {
  li {
    width: 33%;
  }
}

@media (min-width: 640px) {
  li {
    width: 20%;
  }
}

@media (min-width: 960px) {
  li {
    width: 10%;
  }
}

@media (min-width: 1200px) {
  li {
    width: 8%;
  }
}
</style>
