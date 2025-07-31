<template>
  <div id="section default-container" class="section">
    <div class="image-with-text isolate">
      <div class="mx-auto">
        <div class="image-with-text__grid image-with-text__grid--reverse">
          <!-- Image Section -->
          <div class="image-with-text__media-item image-with-text__media-item--50 grid__item">
            <div class="image-with-text__media image-with-text__media--adapt global-media-settings media">
              <img :src="data.values.image.image" alt="" loading="lazy">
            </div>
          </div>
          
          <!-- Text Section -->
          <div class="image-with-text__text-item">
            <div class="image-with-text__content image-with-text__content--desktop-center image-with-text__content--mobile-center content-container">
              <p class="image-with-text__heading">
                {{ data.values.title }}
              </p>
              <div class="image-with-text__text">
                <p>{{ data.values.description }}</p>
              </div>
              <NuxtLink :to="data.values.link" class="image-with-text__button">
                {{ data.values.text_link }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* General Section Styles */
.section {
  margin-top: 0px;
  margin-bottom: 0px;
}

.image-with-text .grid {
  margin-bottom: 0;
}

.image-with-text .grid__item {
  position: relative;
  width: 100% !important;
  max-width: 100%;
}

/* Grid Layout */
.image-with-text__grid {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  background-color: #ffffff;
}

.image-with-text__grid--reverse {
  flex-direction: column;
}

.image-with-text__grid img {
  max-width: 100%;
  height: 100%;
  position: static !important;
}

.image-with-text__grid .image-with-text__text-item {
  width: 100%;
}

/* Media Styles */
.image-with-text__media {
  min-height: 100%;
  overflow: visible;
  border: none;
  border-radius: 20px;
}

.image-with-text__media img,
.image-with-text__media svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content Styles */
.image-with-text__content {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
  justify-content: center;
  align-self: center;
  padding-top: 27px;
  padding-bottom: 27px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
  z-index: 1;
  border-radius: 0px;
}

/* Mobile Text Alignment */
.image-with-text__content--mobile-center > * {
  align-self: center;
  text-align: center;
}

/* Text Elements */
.image-with-text__heading {
  margin: 0px;
  color: #000000;
  font-size: 27.2px;
  line-height: 100%;
  font-weight: 600;
}

.image-with-text__text p {
  margin: 0px;
  color: #000000;
  font-size: 15.3px;
  line-height: 150%;
}

.image-with-text__button {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  color: #ffffff;
  font-size: 18.7px !important;
  line-height: 100%;
  transition: all 0.3s ease 0s;
  border-radius: 12px;
  background-color: #000000;
  padding: 6px 30px;
  border: 1px solid #000000;
}

.image-with-text__button:hover {
  transition: all 0.3s ease 0s;
  color: #ffffff;
  background-color: #000000;
  border: 1px solid #000000;
}

/* Responsive Styles */
@media screen and (min-width: 750px) {
  .image-with-text .grid__item {
    max-width: 50% !important;
  }

  .image-with-text__grid--reverse {
    flex-direction: row-reverse !important;
  }

  .image-with-text__content {
    gap: 25px;
    padding-top: 36px;
    padding-bottom: 36px;
    padding-left: 0;
    padding-right: 5rem;
  }

  .image-with-text__grid--reverse .image-with-text__content {
    margin-left: auto;
  }

  /* Text Elements at Larger Screens */
  .image-with-text__heading {
    font-size: 32px;
  }

  .image-with-text__text p {
    font-size: 18px;
  }

  .image-with-text__button {
    font-size: 22px !important;
    padding: 8px 40px;
  }

  /* Desktop Text Alignment */
  .image-with-text__content--desktop-center > * {
    align-self: center;
    text-align: center;
  }
}

/* Mobile-specific adjustments */
@media screen and (max-width: 749px) {
  .image-with-text__grid {
    flex-direction: column;
    padding: 15px;
  }

  .image-with-text .grid__item {
    width: 100%;
  }

  .image-with-text__grid img {
    height: auto;
    object-fit: cover;
  }
}
</style>