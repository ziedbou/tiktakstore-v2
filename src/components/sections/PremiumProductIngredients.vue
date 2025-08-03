<template>
  <div
    class="ingredients-section"
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-color': data.values.title_color,
      '--subtitle-color': data.values.subtitle_color,
      '--product-name-color': data.values.product_name_color,
      '--product-description-color': data.values.product_description_color,
    }"
  >
    <div class="ingredients-content">
      <div class="ingredients-heading">
        <h2>{{ data.values.title }}</h2>
      </div>
      <div class="ingredients-text">
        <p>{{ data.values.sub_title }}</p>
      </div>
    </div>

    <div class="ingredients-layout">
      <div class="ingredients-column ingredients-column-top">
        <div class="ingredients-item" v-if="data.values.img1">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img1.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm1 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc1 }}</p>
        </div>
      </div>

      <div class="ingredients-column ingredients-column-bottom">
        <div class="ingredients-item" v-if="data.values.img4">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img4.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm4 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc4 }}</p>
        </div>
      </div>

      <div class="ingredients-column ingredients-column-left">
        <div class="ingredients-item" v-if="data.values.img6">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img6.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm6 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc6 }}</p>
        </div>

        <div class="ingredients-item" v-if="data.values.img5">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img5.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm5 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc5 }}</p>
        </div>
      </div>

      <div class="ingredients-image">
        <img :src="imghttps(data.values.main_img.image)" alt="" />
      </div>

      <div class="ingredients-column ingredients-column-right">
        <div class="ingredients-item" v-if="data.values.img2">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img2.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm2 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc2 }}</p>
        </div>

        <div class="ingredients-item" v-if="data.values.img3">
          <div class="ingredients-item-image">
            <img :src="imghttps(data.values.img3.image)" alt="" />
          </div>
          <p class="ingredients-item-title">{{ data.values.nm3 }}</p>
          <p class="ingredients-item-text">{{ data.values.desc3 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  key: String,
  data: Object,
});
</script>

<style scoped>
.ingredients-section {
  overflow: hidden;
  background-color: var(--section-bg);
}

.ingredients-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ingredients-heading {
  text-align: center;
  width: 100%;
}

.ingredients-heading h2 {
  margin: 0;
  font-size: 42px;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  font-weight: 700;
  font-family: "Sabon Next", serif;
  font-weight: 400;
  font-style: normal;
  color: var(--title-color);
}

.ingredients-text {
  margin-top: 12px;
  text-align: center;
  width: 100%;
}

.ingredients-text p {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  color: var(--subtitle-color);
}

.ingredients-layout {
  margin-top: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.ingredients-image {
  display: none;
  border-radius: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
}

.ingredients-image img,
.ingredients-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ingredients-column {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.ingredients-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 140px;
  flex-shrink: 0;
}

.ingredients-item-image {
  width: 90px;
  height: 90px;
  border-radius: 100px;
  border: 0px solid #121212;
  overflow: hidden;
}

.ingredients-item-image img,
.ingredients-item-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ingredients-item-title {
  margin: 0;
  margin-top: 12px;
  text-align: center;
  font-size: 16px;
  line-height: 130%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  font-weight: 700;
  font-family: "Sabon Next", serif;
  font-weight: 400;
  font-style: normal;
  color: var(--product-name-color);
}

.ingredients-item-text {
  margin: 0;
  margin-top: 4px;
  text-align: center;
  font-size: 14px;
  line-height: 150%;
  text-transform: unset;
  text-decoration: none;
  word-break: break-word;
  color: var(--product-description-color);
}

@media (min-width: 1024px) {
  .ingredients-content {
    align-items: center;
  }

  .ingredients-heading {
    text-align: center;
    max-width: 50%;
  }

  .ingredients-heading h2 {
    font-size: 52px;
  }

  .ingredients-text {
    margin-top: 20px;
    text-align: center;
    max-width: 50%;
  }

  .ingredients-text p {
    font-size: 16px;
  }

  .ingredients-image {
    display: block;
  }

  .ingredients-layout {
    position: relative;
    margin-bottom: 50px;
    margin-top: calc(32px + 50px);
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    aspect-ratio: 1/1;
    flex-wrap: nowrap;
    justify-content: space-between;
    border-radius: 100%;
    border: 1px solid #ececec;
    gap: 50px;
  }

  .ingredients-item {
    max-width: 200px;
    align-items: center;
  }

  .ingredients-item-image {
    width: 100px;
    height: 100px;
  }

  .ingredients-column {
    gap: 50px;
    flex-direction: column;
    max-width: 200px;
    flex-shrink: 0;
    flex-wrap: nowrap;
    width: 100%;
  }

  .ingredients-column-top {
    flex-direction: row;
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    align-items: center;
    max-width: fit-content;
  }

  .ingredients-column-bottom {
    flex-direction: row;
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    align-items: center;
    max-width: fit-content;
  }

  .ingredients-column-left {
    position: relative;
    left: -50px;
  }

  .ingredients-column-right {
    position: relative;
    right: -50px;
  }

  .ingredients-item-title {
    margin-top: 12px;
    text-align: center;
    font-size: 24px;
  }

  .ingredients-item-text {
    margin-top: 4px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
