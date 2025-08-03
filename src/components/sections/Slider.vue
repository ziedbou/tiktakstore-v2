<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
        <img :src="imghttps(slide.image)" :alt="slide.alt" class="slide-image" />
        <div class="slide-content">
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>
    <!-- Ajoutez la pagination si nécessaire -->
    <div class="swiper-pagination"></div>

    <!-- Ajoutez les boutons de navigation si nécessaire -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; // Importez les styles de Swiper
import { imghttps } from '~/composables/services/helpers';

export default {
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  mounted() {
    // Initialisez Swiper après que le composant est monté
    new Swiper('.swiper-container', {
      loop: true, // Active le mode boucle
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 3000 // Active l'autoplay avec un délai de 3 secondes
      }
    });
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 400px; /* Ajustez la hauteur selon vos besoins */
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Assurez-vous que l'image couvre tout l'espace */
}

.slide-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5); /* Fond semi-transparent pour le texte */
  padding: 10px;
  border-radius: 5px;
}

.swiper-button-next,
.swiper-button-prev {
  color: white; /* Couleur des flèches de navigation */
}
</style>