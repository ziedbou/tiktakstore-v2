<template>
  <div 
    class="root"
    :style="{
      '--banner-1-bg': data.values.banner_1_bg,
      '--banner-border-radius': data.values.banner_border_radius + 'px',
      '--image-1': `url('${data.values.image_1.image}')`,
      '--subtitle-1-color': data.values.subtitle_1_color,
      '--title-1-color': data.values.title_1_color,
      '--text-1-color': data.values.text_1_color,
      '--button-1-bg': data.values.button_1_bg,
      '--btn-1-color': data.values.btn_1_color,
      '--btn-1-border-radius': data.values.btn_1_border_radius + 'px',
      '--button-1-bg-hover': data.values.button_1_bg_hover,
      '--btn-1-color-hover': data.values.btn_1_color_hover,
      '--banner-2-bg': data.values.banner_2_bg,
      '--image-2': `url('${data.values.image_2.image}')`,
      '--subtitle-2-bg': data.values.subtitle_2_bg,
      '--subtitle-2-color': data.values.subtitle_2_color,
      '--subtitle-2-border-radius': data.values.subtitle_2_border_radius + 'px',
      '--title-2-color': data.values.title_2_color,
      '--text-2-color': data.values.text_2_color,
    }"
  >
    <div class="banner-container">
      <div class="promo-section">
        <div class="promo-content">
          <div class="sale-code">{{ data.values.subtitle_1 }}</div>
          <h1 class="promo-heading">{{ data.values.title_1 }}</h1>
          <p class="promo-subtext">{{ data.values.text_1 }}</p>
          <a :href="data.values.link_1" class="shop-button">{{ data.values.btn_texte_1 }}</a>
        </div>
      </div>
      
      <a :href="data.values.link_2" class="product-section">
        <div class="product-content">
          <span class="new-product-tag">{{ data.values.subtitle_2 }}</span>
          <h2 class="product-title">{{ data.values.title_2 }}</h2>
          <div class="release-info">{{ data.values.text_2 }}</div>
        </div>
      </a>
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
.banner-container {
  display: flex;
  gap: 20px;
}

.promo-section {
  flex: 1.5;
  background-color: var(--banner-1-bg);
  padding: 40px;
  border-radius: var(--banner-border-radius);
  position: relative;
  background-image: var(--image-1);
  background-size: cover;
  background-position: right center;
  display: flex;
  align-items: center;
  min-height: 400px;
}

.promo-content {
  max-width: 50%;
}

.sale-code {
  color: var(--subtitle-1-color);
  font-size: 14px;
  font-weight: 500;
}

.promo-heading {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
  margin: 15px 0;
  color: var(--title-1-color);
}

.promo-subtext {
  color: var(--text-1-color);
  margin-bottom: 25px;
}

.shop-button {
  background-color: var(--button-1-bg);
  color: var(--btn-1-color);
  padding: 12px 30px;
  border: none;
  border-radius: var(--btn-1-border-radius);
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}

.shop-button:hover {
  background-color: var(--button-1-bg-hover);
  color: var(--btn-1-color-hover);
}

.product-section {
  flex: 1;
  background-color: var(--banner-2-bg);
  padding: 30px;
  border-radius: var(--banner-border-radius);
  text-align: center;
  position: relative;
  background-image: var(--image-2);
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.product-content {
  z-index: 1;
}

.new-product-tag {
  background-color: var(--subtitle-2-bg);
  color: var(--subtitle-2-color);
  padding: 5px 15px;
  border-radius: var(--subtitle-2-border-radius);
  display: inline-block;
  margin-bottom: 15px;
  font-size: 14px;
}

.product-title {
  color: var(--title-2-color);
  font-size: 32px;
  margin: 10px 0;
}

.release-info {
  color: var(--text-2-color);
  font-weight: 500;
}

@media (max-width:992px) {
  .promo-content {
    max-width: 85%;
    margin: 0 auto;
    text-align: center;
  }
  .promo-section {
    flex: 1;
  }
}

@media (max-width:767px) {
  .banner-container {
    flex-direction: column;
  }
}
</style>


