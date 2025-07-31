<template>
    <div v-if="extra.message" class="col-12 my-6 ">
      <div class="text-center text-indigo-600">
        <span class="bg-indigo-600 text-white py-1 px-2">{{ visitors }}</span>
        {{ extra.message }}
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'

 defineProps({
    extra: {
      type: String,
      default: ''
    }
  })
const visitors = ref(100) 

  onMounted(() => {
    setInterval(()=>{
        visitors.value = Math.floor(Math.random() * 26) + 5;
    },3000)
  })
</script>
