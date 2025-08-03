<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse h-full flex flex-col">
    <!-- Image Skeleton -->
    <div class="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>
    
    <!-- Content Skeleton -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title Skeleton -->
      <div class="mb-2">
        <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5 mb-2"></div>
        <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/5"></div>
      </div>
      
      <!-- Price Skeleton -->
      <div class="flex items-center justify-center gap-2 mb-2">
        <div class="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
        <div class="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
      </div>
      
      <!-- Stock Status Skeleton -->
      <div class="flex items-center justify-center gap-2 mb-4">
        <div class="w-2 h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
        <div class="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
      </div>
      
      <!-- Buttons Skeleton -->
      <div class="flex items-center gap-3 mt-auto">
        <div class="flex-1 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md"></div>
        <div class="w-10 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for skeleton
</script>
