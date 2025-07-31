<template>
  <div class="premium-banner-simple-2-image-content max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-x-6"
    :style="{
      '--sub-title-color': data.values.sub_title_color,
      '--sub-title-color-hover': data.values.sub_title_color_hover,
      '--title-color': data.values.title_color,
      '--title-color-hover': data.values.title_color_hover,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-border-color': data.values.btn_border_color,
      '--btn-border-color-hover': data.values.btn_border_color_hover,
      '--image-border-radius': data.values.image_border_radius + 'px',
    }"
  >
    <div class="w-full md:w-1/2">
      <div class="banner banner-overlay overflow-hidden">
        <NuxtLink :to="data.values.link_1">
          <img :src="data.values.image_1.image" :alt="data.values.title_1" class="w-full object-cover banner-image" />
        </NuxtLink>
        <div class="banner-content banner-content-center">
          <h4 class="banner-subtitle">
            <NuxtLink :to="data.values.link_1">
              {{ data.values.sub_title_1 }}
            </NuxtLink>
          </h4>
          <h3 class="banner-title">
            <NuxtLink :to="data.values.link_1">
              <strong>{{ data.values.title_1 }}</strong>
            </NuxtLink>
          </h3>
          <NuxtLink
            :to="data.values.link_1"
            class="btn btn-outline-white banner-link underline"
          >
            {{ data.values.link_text_1 }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2">
      <div class="banner banner-overlay overflow-hidden">
        <NuxtLink :to="data.values.link_2">
          <NuxtImg :src="data.values.image_2.image" :alt="data.values.title_2" class="w-full object-cover banner-image" />
        </NuxtLink>
        <div class="banner-content banner-content-center">
          <h4 class="banner-subtitle">
            <NuxtLink :to="data.values.link_2">
              {{ data.values.sub_title_2 }}
            </NuxtLink>
          </h4>
          <h3 class="banner-title">
            <NuxtLink :to="data.values.link_2">
              <strong>{{ data.values.title_2 }}</strong>
            </NuxtLink>
          </h3>
          <NuxtLink
            :to="data.values.link_2"
            class="btn btn-outline-white banner-link underline"
          >
            {{ data.values.link_text_2 }}
          </NuxtLink>
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
.btn {
  text-decoration: none;
}

.banner {
  position: relative;
  border-radius: var(--image-border-radius);
}

.banner-image {
  height: 480px;
}

.premium-banner-simple-2-image-content .banner-content {
  opacity: 1;
  background: none;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  transform: none;
  transition: .3s all ease;
}

.premium-banner-simple-2-image-content .banner-content:hover {
  background: rgba(0,0,0,0.2);
}

.premium-banner-simple-2-image-content .banner-subtitle {
  font-weight: 400;
  font-size: 1.3rem;
  letter-spacing: 0.05em;
  margin-bottom: 1.3rem;
  text-transform: uppercase;
}

.premium-banner-simple-2-image-content .banner-subtitle a {
  color: var(--sub-title-color);
  text-decoration: none;
  transition: all 0.2s ease;
}

.premium-banner-simple-2-image-content .banner-subtitle a:hover {
  color: var(--sub-title-color-hover);
}

.premium-banner-simple-2-image-content .banner-title {
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 1.13;
  margin-bottom: 2.6rem;
  letter-spacing: -0.025em;
  text-transform: uppercase;
}

.premium-banner-simple-2-image-content .banner-title a {
  text-decoration: none;
}

.premium-banner-simple-2-image-content .banner-title strong {
  font-weight: 600;
  color: var(--title-color);
  transition: all 0.2s ease;
}

.premium-banner-simple-2-image-content .banner-title strong:hover {
  color: var(--title-color-hover);
}

.premium-banner-simple-2-image-content .banner .banner-link.btn {
  padding: 1.15rem 1rem;
  font-size: 1.3rem;
  min-width: 130px;
  letter-spacing: 0.1em;
  color: var(--btn-color);
  border-bottom: 3px solid var(--btn-border-color);
  transition: all 0.2s ease;
}

.premium-banner-simple-2-image-content .banner .banner-link.underline {
  border-radius: 0px;
  text-decoration: none;
}

.premium-banner-simple-2-image-content .banner .banner-link.underline:hover,
.premium-banner-simple-2-image-content .banner .banner-link.underline:focus,
.premium-banner-simple-2-image-content .banner .banner-link.underline:active {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  border-color: var(--btn-border-color-hover);
}

@media screen and (min-width: 768px) {
  .premium-banner-simple-2-image-content .banner-title {
    font-size: 2rem;
  }
  
  .premium-banner-simple-2-image-content .banner-subtitle {
    font-size: 1rem;
  }
  
  .premium-banner-simple-2-image-content .banner .banner-link.btn {
    padding-top: 1rem;
    padding-bottom: 0.45rem;
    font-size: 1rem;
    letter-spacing: 0.1em;
    min-width: 130px;
  }
}
</style>
