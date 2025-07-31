<template>
<BannerCard
  :mainBanner="{
    image: 'https://api.tiktak.space/media/static/media/banner-4.webp',
    category: 'Tendance',
    title: 'Camping & randonnée',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
    link: '#'
  }"
  :smallBanners="[
    {
      image: 'https://api.tiktak.space/media/static/media/banner-5_qR0BfgW.webp',
      category: 'Aux femmes',
      title: 'Actif & forme physique',
      link: '#'
    },
    {
      image: 'https://api.tiktak.space/media/static/media/banner-6.webp',
      category: 'Nouveautés',
      title: 'La plus grande remise de la saison',
      link: '#'
    },
    {
      image: 'https://api.tiktak.space/media/static/media/banner-7.webp',
      category: 'Pour hommes',
      title: 'Matériel de surf & Accessoires',
      link: '#'
    },
    {
      image: 'https://api.tiktak.space/media/static/media/banner-8.webp',
      category: 'Les meilleures ventes',
      title: 'Matériel de surf & Accessoires',
      link: '#'
    }
  ]"
/>

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
