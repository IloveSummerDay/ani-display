<script setup>
import { ref } from 'vue'
import { storeToRefs } from "pinia"
import { useChoiceStore } from '../stores/choiceStore'
// ref
const sort = ref(['交互动画', '定格动画'])
const ref_nav = ref(null)
const choiceStore = useChoiceStore()
const { choice } = storeToRefs(choiceStore)

const handleClick = (e, navIndex) => {
  choiceStore.changeChoice(navIndex)
}
</script>

<template>
  <div class="bar">
    <div v-for="(text, index) in sort" :key="index" class="title" :class="choice == index ? 'highLight' : ''"
      ref="ref_nav" @click="handleClick($event, index)">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'FZMH';
  height: 100%;
  width: 150px;
  font-size: 150%;
  background-color: #C0736D;
  border-radius: 20px;
  color: white;
  box-shadow: 0 0 10px #C9999D;
  cursor: pointer;
  user-select: none;
}

.title:hover {
  color: #C0736D;
  background-color: white;
}

.highLight {
  color: #C0736D;
  background-color: white;
}
</style>
