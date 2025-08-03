<template>
  <div 
    class="tech-hero"
    :style="{
      '--tl-color': data.values.gradiant_left_color,
      '--br-color': data.values.gradiant_right_color,
      '--btn-text-color': data.values.btn_text_color,
      '--btn-border-color': data.values.btn_border_color,
      '--btn-bg': data.values.btn_bg,
      '--tags-color': data.values.tags_color,
      '--title-color': data.values.title_color
    }"
  >
    <div class="tech-hero__left-content">
      <div class="tech-hero__title">
        <p>{{ data.values.title }}</p>
      </div>

      <img class="tech-hero__image tech-hero__image--mobile" :src="imghttps(data.values.product_image.image)">

      <a href="" class="tech-hero__button">
        {{ data.values.btn_text }}
      </a>

      <div class="tech-hero__icon-wrapper">
        <div 
          v-for="(item, index) in data.values.children" 
          :key="index"
          class="tech-hero__icon"
        >
          <img :src="imghttps(item.icon.image)" class="tech-hero__icon-image" alt="">
          <span class="tech-hero__icon-title">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>

    <img class="tech-hero__image tech-hero__image--desktop" :src="imghttps(data.values.product_image.image)">
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
.tech-hero {
  background: linear-gradient(
    93.9deg,
    var(--tl-color, #4222de) 0%,
    var(--br-color, #a931ee) 101.18%
  );
  display: flex;
  flex-direction: column;
  color: #fff;
}

.tech-hero__button {
  all: unset;
  cursor: pointer;
  border-radius: 21px;
  display: inline-block;
  font-size: 25px;
  padding: 3px 25px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  margin: 40px auto 0;
  width: fit-content;
  color: var(--btn-text-color);
  border: 1px solid var(--btn-border-color);
  background: var(--btn-bg);
}

.tech-hero__image--desktop {
  display: none;
}

.tech-hero__icon-image {
  height: 30px;
  width: 30px;
  object-fit: fill;
}

@media screen and (min-width: 750px) {
  .tech-hero__button {
    margin: 28px 0 0;
  }
  .tech-hero {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .tech-hero__image--mobile {
    display: none;
  }
  .tech-hero__image--desktop {
    display: block;
  }
}

.tech-hero__left-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.tech-hero__image {
  margin-top: 20px;
}

.tech-hero__title p {
  font-size: 25px;
  line-height: 1.25;
  margin: 0;
  color: var(--title-color);
}

@media screen and (min-width: 750px) {
  .tech-hero__left-content {
    padding: 100px;
    padding-right: 30px;
  }
  .tech-hero__image {
    width: 40%;
    margin-right: 40px;
  }
  .tech-hero__title p {
    font-size: 40px;
  }
}

.tech-hero__icon-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 24px;
  font-size: 12px;
  gap: 10px;
}

.tech-hero__icon {
  display: flex;
  gap: 10px;
}

.tech-hero__icon-title {
  display: flex;
  align-items: center;
  color: var(--tags-color);
}

@media screen and (min-width: 750px) {
  .tech-hero__icon-wrapper {
    margin-top: 60px;
    font-size: 14px;
    justify-content: flex-start;
    gap: 20px 60px;
  }
}
</style>