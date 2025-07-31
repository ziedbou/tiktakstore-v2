<template>
  <div 
    :class=" {'no-padding': data.design.container === 'container-fluid'}"
    :style="{
      '--title-color': data.values.title_color,
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`,
      '--sub-title-color': data.values.sub_title_color,
      '--sub-title-size-mobile': `${data.values.sub_title_size_mobile}px`,
      '--sub-title-size-desktop': `${data.values.sub_title_size_desktop}px`,
      '--text-color': data.values.text_color,
      '--text-size-mobile': `${data.values.text_size_mobile}px`,
      '--text-size-desktop': `${data.values.text_size_desktop}px`,
      '--btn-background': data.values.btn_background,
      '--btn-color': data.values.btn_color,
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-text-size-mobile': `${data.values.btn_text_size_mobile}px`,
      '--btn-text-size-desktop': `${data.values.btn_text_size_desktop}px`
    }"
  >
      <div 
        class="banner flex justify-center items-center text-center px-3 py-8 flex-col gap-5.5"
        :style="{
          'background-image': `url('${data.values.background_image.image}')`,
        }"
      >
     
          <img 
            :src="data.values.icone.image"
            class="mx-auto w-auto" 
            alt=""
          >
          <h3 class="banner-title">{{ data.values.title }}</h3>
          <h4 class="font-weight-normal sub_title">{{ data.values.sub_title }}</h4>
          <p class="banner-txt mx-auto">{{ data.values.text }}</p>
          <a 
            :href="data.values.link" 
            class="btn letter-spacing-large premium-image-with-info_btn"
          >
            {{ data.values.link_text }}
          </a>
        </div>


  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  }
});
</script>

<style scoped>
.banner-title {
  color: var(--title-color);
  font-size: var(--title-size-mobile);
}

.sub_title {
  color: var(--sub-title-color);
  font-size: var(--sub-title-size-mobile);
}

.banner-txt {
  color: var(--text-color);
  font-size: var(--text-size-mobile);
}

.premium-image-with-info_btn {
  background-color: var(--btn-background);
  color: var(--btn-color);
  border-bottom-color: var(--btn-color) !important;
  font-size: var(--btn-text-size-mobile) !important;
  transition: all .3s;
}

.premium-image-with-info_btn:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  border-color: var(--btn-background-hover);
  text-decoration: none !important;
}

@media (min-width: 767px) {
  .banner-title {
    font-size: var(--title-size-desktop);
  }

  .sub_title {
    font-size: var(--sub-title-size-desktop);
  }

  .banner-txt {
    font-size: var(--text-size-desktop);
  }

  .premium-image-with-info_btn {
    font-size: var(--btn-text-size-desktop) !important;
  }
}

/* Fixed styles */
.banner {
  background-position: left center;
  min-height: 500px;
}

.letter-spacing-large {
  letter-spacing: 0.1em;
}

.font-size-normal {
  font-size: 1.3rem;
}

.banner-content {
  font-size: 1rem;
  max-width: 400px;
  opacity: 1;
}

.banner-title {
  letter-spacing: -0.01em;
  line-height: 1.2;
}

.banner-txt {
  line-height: 1.7;
  max-width: 85%;
}

@media (min-width: 767px) {
  .banner-txt {
    max-width: 980px;
    width: 95%;
  }
}

.btn {
  min-width: 178px;
}

.premium-image-with-info_btn {
  padding: 8px 20px;
  border: 2px solid transparent;
  border-radius: 0;
  min-width: 130px;
  cursor: pointer;
}
</style> 