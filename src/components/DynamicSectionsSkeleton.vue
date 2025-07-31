<template>
  <div class="animate-pulse">
    <!-- Header Skeleton -->
    <div class="container mx-auto px-4 py-8">
      <div class="h-8 bg-gray-200 rounded-md w-1/3 mb-4"></div>
      <div class="h-4 bg-gray-200 rounded-md w-2/3 mb-8"></div>
    </div>
    <!-- Banner Section Skeleton -->
    <div class="container mx-auto px-4 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="h-64 bg-gray-200 rounded-md"></div>
        <div class="h-64 bg-gray-200 rounded-md"></div>
        <div class="h-64 bg-gray-200 rounded-md"></div>
      </div>
    </div>
    <!-- Content Section Skeleton -->
    <div class="container mx-auto px-4 mb-12">
      <div class="h-6 bg-gray-200 rounded-md w-1/4 mb-4"></div>
      <div class="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded-md w-3/4 mb-6"></div>
    </div>
  </div>
</template>
<style>

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
