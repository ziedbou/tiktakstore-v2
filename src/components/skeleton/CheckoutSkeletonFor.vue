<template>
  <div class="mx-auto max-w-lg lg:max-w-none">
    <!-- Informations section skeleton -->
    <section aria-labelledby="contact-info-heading">
      <!-- Section title skeleton -->
      <div class="h-7 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>

      <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6">
        <!-- Name field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-28 mb-2 animate-pulse"></div>
          <div class="h-11 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <!-- Email field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
          <div class="h-11 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <!-- Phone field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
          <div class="flex rounded-md border border-gray-200">
            <div class="h-11 w-[110px] bg-gray-200 rounded-l-md animate-pulse"></div>
            <div class="h-11 flex-1 bg-gray-200 rounded-r-md animate-pulse border-l border-gray-300"></div>
          </div>
        </div>
        
        <!-- Phone extra field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-44 mb-2 animate-pulse"></div>
          <div class="flex rounded-md border border-gray-200">
            <div class="h-11 w-[110px] bg-gray-200 rounded-l-md animate-pulse"></div>
            <div class="h-11 flex-1 bg-gray-200 rounded-r-md animate-pulse border-l border-gray-300"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shipping address section skeleton -->
    <section aria-labelledby="shipping-heading" class="mt-10">
      <!-- Section title skeleton -->
      <div class="h-7 bg-gray-200 rounded w-40 mb-6 animate-pulse"></div>

      <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <!-- Address field skeleton (full width) -->
        <div class="sm:col-span-2">
          <div class="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
          <div class="h-11 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <!-- Delegation field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
          <div class="h-11 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <!-- Country field skeleton -->
        <div class="sm:col-span-1">
          <div class="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
          <div class="h-11 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Additional information section skeleton -->
    <section aria-labelledby="additional-info-heading" class="mt-10">
      <!-- Section title skeleton -->
      <div class="h-7 bg-gray-200 rounded w-52 mb-6 animate-pulse"></div>

      <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <!-- Comment field skeleton -->
        <div class="sm:col-span-2">
          <div class="h-4 bg-gray-200 rounded w-36 mb-2 animate-pulse"></div>
          <div class="h-20 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        <!-- Create account checkbox skeleton -->
        <div class="sm:col-span-2">
          <div class="flex items-center mt-2">
            <div class="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded w-56 ml-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment method section skeleton -->
    <div class="border-t border-gray-200 pt-6 mt-10">
      <div class="h-7 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <!-- Payment method option 1 -->
        <div class="relative flex rounded-lg border border-gray-200 p-4 bg-gray-50">
          <div class="flex flex-1">
            <div class="flex flex-col space-y-2">
              <div class="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
          <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        <!-- Payment method option 2 -->
        <div class="relative flex rounded-lg border border-gray-200 p-4 bg-gray-50">
          <div class="flex flex-1">
            <div class="flex flex-col space-y-2">
              <div class="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-52 animate-pulse"></div>
            </div>
          </div>
          <div class="h-5 w-5 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>

    <!-- Confirm button skeleton -->
    <div class="fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto lg:left-auto lg:right-auto z-50 lg:z-auto bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none border-t border-gray-200 lg:border-t-0 mt-0 lg:mt-6">
      <div class="h-12 bg-gray-200 rounded-md lg:rounded-lg animate-pulse"></div>
    </div>
  </div>
</template>

<script setup>
// No props or logic needed for skeleton component
</script>

<style scoped>
/* Ensure consistent animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
