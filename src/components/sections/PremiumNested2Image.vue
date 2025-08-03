<template>
  <div class="section-container" 
       :style="{
         '--title-size-mobile': `${data.values.title_size_mobile}px`,
         '--title-size-tablet': `${data.values.title_size_tablet}px`,
         '--title-size-desktop': `${data.values.title_size_desktop}px`,
         '--title-color': data.values.title_color,
         '--text-color': data.values.text_color,
         '--link-background': data.values.link_background,
         '--link-color': data.values.link_color,
         '--link-background-hover': data.values.link_background_hover,
         '--link-color-hover': data.values.link_color_hover,
         '--images-border-radius': `${data.values.images_border_radius}px`
       }">
    <div class="flex flex-wrap section-container">
      <div class="images w-full md:w-full lg:w-1/2 xl:w-1/2 relative">
        <img :src="imghttps(data.values.image_1.image)" alt="" class="image image-1">
        <img :src="imghttps(data.values.image_2.image)" alt="" class="image image-2">
      </div>
      <div class="w-full md:w-full lg:w-1/2 xl:w-1/2">
        <div class="content">
          <h2 class="title">{{ data.values.title }}</h2>
          <p class="description">{{ data.values.text }}</p>
          <a :href="data.values.link" class="shop-button">
            {{ data.values.link_text }}
            <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.section-container {
  align-items: center;
}

.images {
  display: flex;
  gap: 0;
}

.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: var(--images-border-radius);
}

.image-1 {
  width: 50%;
  aspect-ratio: 1/1;
}

.image-2 {
  width: 50%;
  aspect-ratio: 1/1;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 500px;
  margin-left: 0;
  margin-top: 20px;
}

.title {
  font-size: var(--title-size-mobile);
  font-weight: bold;
  margin: 0;
  color: var(--title-color);
}

.description {
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-color);
  margin: 0;
}

.shop-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--link-background);
  color: var(--link-color);
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: sans-serif;
  text-decoration: none;
  width: fit-content;
  transition: all 0.3s ease;
}

.shop-button:hover {
  background: var(--link-background-hover);
  color: var(--link-color-hover);
}

.arrow-icon {
  width: 14px;
  height: 14px;
}

@media (min-width: 768px) {
  .shop-button {
    padding: 10px 20px;
    font-size: 15px;
    gap: 7px;
  }
  
  .arrow-icon {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .content {
    margin-left: 30px;
    margin-top: 0;
  }
  .title {
    font-size: var(--title-size-tablet);
  }
  .shop-button {
    padding: 12px 24px;
    font-size: 16px;
    gap: 8px;
  }
  
  .arrow-icon {
    width: 16px;
    height: 16px;
  }
}

@media (min-width: 1400px) {
  .image-2 {
    width: 60%;
    position: absolute;
    right: 10px;
    top: 40%;
  }

  .image-1 {
    width: 60%;
  }

  .title {
    font-size: var(--title-size-desktop);
  }

  .section-container {
    align-items: flex-end;
    padding-bottom: 13%;
  }
}
</style>