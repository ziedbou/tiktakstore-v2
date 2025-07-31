<template>
  <section class="w-full">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Grande bannière -->
        <div class="relative group overflow-hidden rounded-lg shadow-lg">
          <img :src="mainBanner.image" alt="Bannière principale" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
          <div class="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
            <h3 class="text-lg font-semibold italic">{{ mainBanner.category }}</h3>
            <h4 class="text-2xl font-bold">{{ mainBanner.title }}</h4>
            <p class="text-sm mt-2">{{ mainBanner.description }}</p>
            <a :href="mainBanner.link" class="mt-4 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition">
              Voir plus
            </a>
          </div>
        </div>

        <!-- Petites bannières -->
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(banner, index) in smallBanners" :key="index" class="relative group overflow-hidden rounded-lg shadow-lg">
            <img :src="banner.image" alt="Bannière secondaire" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
            <div class="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
              <h3 class="text-lg font-semibold">{{ banner.category }}</h3>
              <h4 class="text-md font-bold">{{ banner.title }}</h4>
              <a :href="banner.link" class="mt-2 inline-block bg-white text-black px-3 py-1 rounded text-sm hover:bg-gray-200 transition">
                Voir plus
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    mainBanner: Object,
    smallBanners: Array
  }
};
</script>

<style scoped>
/* Pas besoin de CSS supplémentaire avec Tailwind 😎 */
</style>
