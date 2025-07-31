<template>
  <div class="bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Titre -->
      <div class="text-center mb-12">
        <p class="text-sm text-gray-500">Larana, inc</p>
        <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">FASHION SALE</h2>
        <p class="mt-2 text-lg text-gray-600">NEW ARRIVAL</p>
        <a
          href="#"
          class="mt-6 inline-block bg-black text-white px-6 py-3 font-medium rounded-md hover:bg-gray-800 transition"
        >
          SHOP NOW
        </a>
        <p class="mt-2 text-sm text-gray-500">www.reallygreatsite.com</p>
      </div>

      <!-- Grid d'images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="overflow-hidden rounded-lg group relative"
        >
          <img
            :src="img"
            alt="fashion"
            class="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const images = [
  "https://images.unsplash.com/photo-1612423284934-94fdb588c781?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1520975918318-2c8e1b3b2a0d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1610901347025-44ef332e6a4d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617093725235-b2d0f087c393?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1602810317399-9f07b1eeb08d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1533674689011-5c93c2b20392?auto=format&fit=crop&w=800&q=80"
];
</script>
