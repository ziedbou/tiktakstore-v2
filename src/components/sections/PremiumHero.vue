 
<template>
  <div class="hero-body-template--21073409212745__ss_hero_9_CHWKDr" 
  :style="{
  '--title-size-mobile': data.values.title_size_mobile + 'px',
  '--title-size-desktop': data.values.title_size_desktop + 'px',
  '--title-color': data.values.title_color,
  '--text-size-mobile': data.values.text_size_mobile + 'px',
  '--text-size-desktop': data.values.text_size_desktop + 'px',
  '--text-color': data.values.text_color,
  '--btn-color': data.values.btn_color,
  '--btn-color-hover': data.values.btn_color_hover,
  '--btn-bg': data.values.btn_backgroung,
  '--btn-bg-hover': data.values.btn_backgroung_hover,
  '--btn-radius': data.values.btn_border_radius + 'px',
  '--img-radius': data.values.img_border_radius + 'px'
}"

>
    <div class="hero-content-template--21073409212745__ss_hero_9_CHWKDr">
      <div class="hero-heading-template--21073409212745__ss_hero_9_CHWKDr">
        <p><strong>{{ data.values.title }}</strong></p>
      </div>
      <div class="hero-text-template--21073409212745__ss_hero_9_CHWKDr">
        <p>{{ data.values.description }}</p>
      </div>
		     <a
		  :href="data.values.link"
		  class="hero-button-template--21073409212745__ss_hero_9_CHWKDr">
		
		  {{ data.values.btn_text }}
		</a>

    </div>

    <div class="hero-images-template--21073409212745__ss_hero_9_CHWKDr">
      <div class="hero-images-wrapper-template--21073409212745__ss_hero_9_CHWKDr">
        <div class="hero-images-gradient-template--21073409212745__ss_hero_9_CHWKDr"></div>

        <div class="hero-images-left-template--21073409212745__ss_hero_9_CHWKDr">
          <div class="hero-images-inner-template--21073409212745__ss_hero_9_CHWKDr">
            <div
              v-for="(child, index) in data.values.imgs_1"
              :key="'left-' + index"
              class="hero-image-template--21073409212745__ss_hero_9_CHWKDr"
            >
              <img :src="imghttps(child.image)" alt="" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="hero-images-right-template--21073409212745__ss_hero_9_CHWKDr">
          <div class="hero-images-inner-template--21073409212745__ss_hero_9_CHWKDr">
            <div
              v-for="(child, index) in data.values.imgs_2"
              :key="'right-' + index"
              class="hero-image-template--21073409212745__ss_hero_9_CHWKDr"
            >
              <img :src="imghttps(child.image)" alt="" loading="lazy" />
            </div>
          </div>
        </div>

        <div class="hero-images-gradient-template--21073409212745__ss_hero_9_CHWKDr bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

function imghttps(url) {
  return url?.startsWith('http') ? url : url?.replace(/^\/?/, 'https://') || ''
}
</script>


 

<style scoped>
.hero-button-template--21073409212745__ss_hero_9_CHWKDr {
  color: var(--btn-color);
  background-color: var(--btn-bg);
  border-radius: var(--btn-radius);
  transition: all 0.25s ease;
  text-align: center;
  font-weight: 700;
  padding: 16px 24px;
  max-width: 250px;
  margin: auto;
  display: block;
  text-decoration: none;
}

.hero-button-template--21073409212745__ss_hero_9_CHWKDr:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-bg-hover);
}

.hero-heading-template--21073409212745__ss_hero_9_CHWKDr * {
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  margin: 0; /* Ajouté pour réinitialiser les marges potentiels des éléments enfants */
  line-height: 110%; /* Ajouté pour un meilleur espacement des lignes */
  text-transform: unset; /* Ajouté pour s'assurer que la transformation de texte est gérée par les données */
}

@media (min-width: 1024px) {
  .hero-heading-template--21073409212745__ss_hero_9_CHWKDr * {
    font-size: var(--title-size-desktop);
  }
}

.hero-text-template--21073409212745__ss_hero_9_CHWKDr * {
  font-size: var(--text-size-mobile);
  color: var(--text-color);
  margin: 0; /* Ajouté pour réinitialiser les marges potentiels des éléments enfants */
  line-height: 170%; /* Ajouté pour une meilleure lisibilité */
  text-transform: unset; /* Ajouté pour s'assurer que la transformation de texte est gérée par les données */
}

@media (min-width: 1024px) {
  .hero-text-template--21073409212745__ss_hero_9_CHWKDr * {
    font-size: var(--text-size-desktop);
  }
}

.hero-image-template--21073409212745__ss_hero_9_CHWKDr {
  border-radius: var(--img-radius);
  overflow: hidden; /* Ajouté pour s'assurer que le border-radius fonctionne correctement avec l'image */
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; /* Déplacé ici pour être appliqué à chaque image */
  aspect-ratio: 12 / 9; /* Ajouté pour maintenir un ratio d'aspect par défaut */
}

.hero-image-template--21073409212745__ss_hero_9_CHWKDr img,
.hero-image-template--21073409212745__ss_hero_9_CHWKDr svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image-template--21073409212745__ss_hero_9_CHWKDr svg {
  background-color: #AFAFAF;
}

.hero-body-template--21073409212745__ss_hero_9_CHWKDr {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
  align-items: center;
}

.hero-content-template--21073409212745__ss_hero_9_CHWKDr {
  margin-left: 0;
  text-align: center; /* Ajouté pour centrer le contenu par défaut sur mobile */
}

.hero-heading-template--21073409212745__ss_hero_9_CHWKDr {
  margin-top: 20px;
}

.hero-text-template--21073409212745__ss_hero_9_CHWKDr {
  margin-top: 18px;
}

.hero-button-template--21073409212745__ss_hero_9_CHWKDr {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 250px;
  margin: 16px auto 0; /* Simplification de la marge */
  font-size: 17px;
  line-height: 100%;
  text-transform: unset;
  padding: 16px 24px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
}

.hero-button-template--21073409212745__ss_hero_9_CHWKDr:hover {
  transition: all 0.25s ease 0s;
}

.hero-images-wrapper-template--21073409212745__ss_hero_9_CHWKDr {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  height: 300px;
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin: 0 auto; /* Ajouté pour centrer le wrapper des images sur mobile */
}

.hero-images-left-template--21073409212745__ss_hero_9_CHWKDr,
.hero-images-right-template--21073409212745__ss_hero_9_CHWKDr {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.hero-images-inner-template--21073409212745__ss_hero_9_CHWKDr {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0px 5px; /* Ajouté ici, semblait plus logique */
}

.hero-images-gradient-template--21073409212745__ss_hero_9_CHWKDr {
  height: 80px; /* Réduction de la hauteur par défaut */
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%); /* Exemple de gradient */
  z-index: 1; /* Pour s'assurer qu'il est au-dessus des images */
}

.hero-images-gradient-template--21073409212745__ss_hero_9_CHWKDr.bottom {
  top: auto;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, white 100%); /* Gradient inversé pour le bas */
}

@media (min-width: 1024px) {
  .hero-body-template--21073409212745__ss_hero_9_CHWKDr {
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
  }

  .hero-content-template--21073409212745__ss_hero_9_CHWKDr {
    margin-left: 20px;
    order: 1;
    text-align: left; /* Alignement à gauche sur desktop */
  }

  .hero-heading-template--21073409212745__ss_hero_9_CHWKDr {
    margin-top: 0;
  }

  .hero-text-template--21073409212745__ss_hero_9_CHWKDr {
    margin-top: 24px;
  }

  .hero-button-template--21073409212745__ss_hero_9_CHWKDr {
    margin-top: 40px;
    max-width: 250px;
    padding: 16px 24px;
    font-size: 18px;
    margin-left: 0 !important; /* Override le margin auto mobile */
    margin-right: 0 !important; /* Override le margin auto mobile */
  }

  .hero-images-template--21073409212745__ss_hero_9_CHWKDr {
    order: 2;
  }

  .hero-images-wrapper-template--21073409212745__ss_hero_9_CHWKDr {
    height: 700px;
    gap: 20px;
    margin: 0; /* Suppression du margin auto sur desktop */
  }

  .hero-images-gradient-template--21073409212745__ss_hero_9_CHWKDr {
    height: 220px;
  }

  .hero-image-template--21073409212745__ss_hero_9_CHWKDr {
    aspect-ratio: 12 / 12; /* Ratio d'aspect différent sur desktop */
  }
}

.hero-images-left-template--21073409212745__ss_hero_9_CHWKDr {
  animation: leftImagesAnimationtemplate--21073409212745__ss_hero_9_CHWKDr 60s linear infinite alternate;
}

.hero-images-right-template--21073409212745__ss_hero_9_CHWKDr {
  animation: rightImagesAnimationtemplate--21073409212745__ss_hero_9_CHWKDr 60s linear infinite alternate;
}

@keyframes leftImagesAnimationtemplate--21073409212745__ss_hero_9_CHWKDr {
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-50%);
  }
}

@keyframes rightImagesAnimationtemplate--21073409212745__ss_hero_9_CHWKDr {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

a:empty,
ul:empty,
dl:empty,
div:empty,
section:empty,
article:empty,
p:empty,
h1:empty,
h2:empty,
h3:empty,
h4:empty,
h5:empty,
h6:empty {
  display: none;
}
</style>