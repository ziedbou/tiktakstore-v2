<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Sync wishlist from API on app mount if user is authenticated

onMounted(async () => {
  console.log('version 1.0.0')
  if (import.meta.client) {
    const token = localStorage.getItem('_token')
    if (token) {
      const { syncWishlistFromApi } = useWishlist()
      await syncWishlistFromApi()
    }
  }
})
</script>