<template>
  <button
    @click.prevent="$emit('quick-view')"   
    class="relative w-8 h-8 md:h-10 md:w-10 rounded-full border border-gray-200 bg-white bg-opacity-95 backdrop-blur-sm shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ease-out overflow-hidden group hover:-translate-y-0.5"
  >
    <ScanEye class="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ease-out text-gray-600 group-hover:text-gray-800" />
  </button>
</template>

<script setup>
import { ScanEye } from "lucide-vue-next";

// Emits
defineEmits(['quick-view']);
</script>
