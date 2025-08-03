<template>
  <div class="Banner5Images-container">
    <div class="featured-collection-block-inner">
      <!-- Main large block -->
      <div class="featured-collection-block featured-collection-block-1 bottom_left">
        <NuxtLink :to="data?.values?.link_1" :style="{ opacity: 1 }">
          <picture :style="{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            opacity: 1,
            transform: 'translate(0px, 0px)',
            aspectRatio: '569/417'
          }">
            <img :src="imghttps(data?.values?.image_1?.image)" :alt="data?.values?.text_1" class="" />
          </picture>
          <div class="featured_collection_text">
            <h3 class="featured_collection_title">
              {{ data?.values?.text_1 }}
            </h3>
          </div>
        </NuxtLink>
      </div>

      <!-- Top right block -->
      <div class="featured-collection-block featured-collection-block-2 bottom_left">
        <NuxtLink :to="data?.values?.link_2" :style="{ opacity: 1 }">
          <picture :style="{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            opacity: 1,
            transform: 'translate(0px, 0px)',
            aspectRatio: '342/225'
          }">
            <img :src="imghttps(data?.values?.image_2?.image)" :alt="data?.values?.text_2" />
          </picture>
          <div class="featured_collection_text">
            <h3 class="featured_collection_title">
              {{ data?.values?.text_2 }}
            </h3>
          </div>
        </NuxtLink>
      </div>

      <!-- Top far right block -->
      <div class="featured-collection-block featured-collection-block-3 bottom_left">
        <NuxtLink :to="data?.values?.link_3" :style="{ opacity: 1 }">
          <picture :style="{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            opacity: 1,
            transform: 'translate(0px, 0px)',
            aspectRatio: '342/225'
          }">
            <img :src="imghttps(data?.values?.image_3?.image)" :alt="data?.values?.text_3" class="" />
          </picture>
          <div class="featured_collection_text">
            <h3 class="featured_collection_title">
              {{ data?.values?.text_3 }}
            </h3>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom right block -->
      <div class="featured-collection-block featured-collection-block-4 bottom_left">
        <NuxtLink :to="data?.values?.link_4" :style="{ opacity: 1 }">
          <picture :style="{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            opacity: 1,
            transform: 'translate(0px, 0px)',
            aspectRatio: '342/225'
          }">
            <img :src="imghttps(data?.values?.image_4?.image)" :alt="data?.values?.text_4" class="" />
          </picture>
          <div class="featured_collection_text">
            <h3 class="featured_collection_title">
              {{ data?.values?.text_4 }}
            </h3>
          </div>
        </NuxtLink>
      </div>

      <!-- Bottom far right block -->
      <div class="featured-collection-block featured-collection-block-5 bottom_left">
        <NuxtLink :to="data?.values?.link_5" :style="{ opacity: 1 }">
          <picture :style="{
            translate: 'none',
            rotate: 'none',
            scale: 'none',
            opacity: 1,
            transform: 'translate(0px, 0px)',
            aspectRatio: '342/225'
          }">
            <img :src="imghttps(data?.values?.image_5?.image)" :alt="data?.values?.text_5" class="" />
          </picture>
          <div class="featured_collection_text">
            <h3 class="featured_collection_title">
              {{ data?.values?.text_5 }}
            </h3>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

// Define props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
.Banner5Images-container {
  margin: 0 auto;
  padding: 15px;

  .featured-collection-block-inner {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 16px;
    height: 500px;
  }

  .featured-collection-block {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .featured-collection-block:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .featured-collection-block-1 {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .featured-collection-block-2 {
    grid-column: 2;
    grid-row: 1;
  }

  .featured-collection-block-3 {
    grid-column: 3;
    grid-row: 1;
  }

  .featured-collection-block-4 {
    grid-column: 2;
    grid-row: 2;
  }

  .featured-collection-block-5 {
    grid-column: 3;
    grid-row: 2;
  }

  .featured-collection-block a {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: inherit;
  }

  .featured-collection-block picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  .featured-collection-block img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .featured-collection-block:hover img {
    transform: scale(1.05);
  }

  .featured_collection_text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    padding: 40px 20px 20px;
    color: white;
  }

  .featured_collection_title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .featured-collection-block-1 .featured_collection_title {
    font-size: 2rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .featured-collection-block-inner {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 200px);
      height: auto;
    }

    .featured-collection-block-1 {
      grid-column: 1;
      grid-row: 1;
    }

    .featured-collection-block-2 {
      grid-column: 1;
      grid-row: 2;
    }

    .featured-collection-block-3 {
      grid-column: 1;
      grid-row: 3;
    }

    .featured-collection-block-4 {
      grid-column: 1;
      grid-row: 4;
    }

    .featured-collection-block-5 {
      grid-column: 1;
      grid-row: 5;
    }

    .featured_collection_title {
      font-size: 1.2rem;
    }

    .featured-collection-block-1 .featured_collection_title {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    .default-container {
      padding: 10px;
    }

    .featured-collection-block-inner {
      gap: 10px;
    }

    .featured_collection_text {
      padding: 20px 15px 15px;
    }
  }
}

</style>