<template>
  <div class="animate-pulse">
    <!-- Cart items skeleton -->
    <div class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section class="lg:col-span-7">
        <ul class="divide-y divide-gray-200 border-t border-b border-gray-200">
          <!-- Repeat for 2 skeleton items -->
          <li v-for="i in 2" :key="i" class="flex items-center py-4 relative">
            <!-- Product image skeleton -->
            <div class="shrink-0">
              <div class="size-28 rounded-md bg-gray-200 sm:size-36"></div>
            </div>
            
            <!-- Product details skeleton -->
            <div class="ml-4 sm:ml-6 relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-14 sm:pr-0">
              <div>
                <div class="h-5 w-56 bg-gray-200 rounded mb-2"></div>
                <div class="h-4 w-32 bg-gray-200 rounded mt-2"></div>
              </div>
              
              <div class="mt-4 sm:mt-0 sm:pr-9">
                <div class="grid w-full grid-cols-1">
                  <div class="flex items-center">
                    <div class="h-10 w-28 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        
        <!-- Update cart button skeleton -->
        <div class="flex justify-end mt-4">
          <div class="h-10 w-36 bg-gray-200 rounded-lg"></div>
        </div>
      </section>
      
      <!-- Order summary skeleton -->
      <section class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <!-- Coupon code skeleton -->
        <div class="flex items-center gap-2">
          <div class="relative flex-1 h-10 bg-gray-200 rounded-lg"></div>
          <div class="h-10 w-24 bg-gray-200 rounded-lg"></div>
        </div>
        
        <!-- Summary heading skeleton -->
        <div class="h-6 w-32 bg-gray-200 rounded mt-6"></div>
        
        <!-- Price details skeleton -->
        <div class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <div class="h-4 w-20 bg-gray-200 rounded"></div>
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <div class="h-4 w-32 bg-gray-200 rounded"></div>
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <div class="h-5 w-36 bg-gray-200 rounded"></div>
            <div class="h-5 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        
        <!-- Action buttons skeleton -->
        <div class="mt-6">
          <div class="h-12 w-full bg-gray-200 rounded-lg"></div>
        </div>
        <div class="mt-6">
          <div class="h-12 w-full bg-gray-200 rounded-lg"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// No props or state needed for the skeleton
</script>
