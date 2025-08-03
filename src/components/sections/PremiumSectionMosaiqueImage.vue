<template>
  <section
    class="premium-best-selling-2-col mt-10 mb-10 flex justify-center gap-4"
    :style="{
      '--sub-title-color': data.values.sub_title_color,
      '--title-color': data.values.title_color,
      '--btn-background': data.values.btn_background,
      '--btn-color': data.values.btn_color,
      '--btn-border-color': data.values.btn_border_color,
      '--btn-border-radius': data.values.btn_border_radius + 'px',
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-border-color-hover': data.values.btn_border_color_hover,
      '--img-border-radius': data.values.img_border_radius + 'px',
    }"
  >
    <!-- Colonne 1 -->
    <div class="best-selling-col-1 flex flex-col items-start justify-center max-w-[630px] flex-1">
      <div class="product-image_pbs flex-1 w-full text-center overflow-hidden" :style="{ borderRadius: 'var(--img-border-radius)' }">
        <NuxtLink :href="data.values.link_1">
          <NuxtImg :src="imghttps(data.values?.image_1.image)" alt="Product Image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        </NuxtLink>
      </div>
      <h2 class="text-base my-6" :style="{ color: 'var(--sub-title-color)' }">{{ data.values.sub_title_1 }}</h2>
      <h3 class="text-4xl font-normal my-0" :style="{ color: 'var(--title-color)' }">{{ data.values.title_1 }}</h3>
      <NuxtLink
        :href="data.values.link_1"
        class="discover-more_pbs px-6 py-3 my-8 no-underline transition-all duration-300 ease-in-out"
        :style="{
          backgroundColor: 'var(--btn-background)',
          color: 'var(--btn-color)',
          border: '0.1rem solid var(--btn-border-color)',
          borderRadius: 'var(--btn-border-radius)',
        }"
        @mouseover="hoverBtn(true, $event)"
        @mouseleave="hoverBtn(false, $event)"
      >
        {{ data.values.btn_text_1 }}
      </NuxtLink>
    </div>

    <!-- Colonne 2 -->
    <div class="best-selling-col-1-col-2 flex flex-col items-start justify-center max-w-[630px] flex-1">
      <h2 class="text-base my-6" :style="{ color: 'var(--sub-title-color)' }">{{ data.values.sub_title_2 }}</h2>
      <h3 class="text-4xl font-normal my-0" :style="{ color: 'var(--title-color)' }">{{ data.values.title_2 }}</h3>
      <NuxtLink
        :href="data.values.link_2"
        class="discover-more_pbs px-6 py-3 my-8 no-underline transition-all duration-300 ease-in-out"
        :style="{
          backgroundColor: 'var(--btn-background)',
          color: 'var(--btn-color)',
          border: '0.1rem solid var(--btn-border-color)',
          borderRadius: 'var(--btn-border-radius)',
        }"
        @mouseover="hoverBtn(true, $event)"
        @mouseleave="hoverBtn(false, $event)"
      >
        {{ data.values.btn_text_1 }}
      </NuxtLink>
      <div class="product-image_pbs flex-1 w-full text-center overflow-hidden" :style="{ borderRadius: 'var(--img-border-radius)' }">
        <NuxtLink :href="data.values.link_2">
          <NuxtImg :src="imghttps(data.values?.image_2.image)" alt="Product Image" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script>

import { imghttps } from '~/composables/services/helpers';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  // mounted() {
  //   console.log("Component mounted! ");
  //   console.log(this.data);
  // },
  methods: {
    hoverBtn(isHover, event) {
      const btn = event.target;
      if (isHover) {
        btn.style.backgroundColor = "var(--btn-background-hover)";
        btn.style.color = "var(--btn-color-hover)";
        btn.style.borderColor = "var(--btn-border-color-hover)";
      } else {
        btn.style.backgroundColor = "var(--btn-background)";
        btn.style.color = "var(--btn-color)";
        btn.style.borderColor = "var(--btn-border-color)";
      }
    },
  },
};
</script>


<style scoped>
.premium-best-selling-2-col {
  display: flex;
  justify-content: center;
  gap: 4%;
}

.premium-best-selling-2-col .best-selling-col-1,
.premium-best-selling-2-col .best-selling-col-1-col-2 {
  flex: 1 1 calc(50% - 1rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 630px;
}

.premium-best-selling-2-col h2 {
  font-size: 16px;
  color: var(--sub-title-color);
  margin: 1.5rem 0;
}

.premium-best-selling-2-col h3 {
  font-size: 35px;
  font-weight: 400;
  margin: 0;
  color: var(--title-color);
}

.premium-best-selling-2-col .discover-more_pbs {
  background: var(--btn-background);
  color: var(--btn-color);
  border: 0.1rem solid var(--btn-border-color);
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  margin: 2rem 0;
  border-radius: var(--btn-border-radius);
  transition: all 0.3s ease;
}

.premium-best-selling-2-col .discover-more_pbs:hover {
  background: var(--btn-background-hover);
  color: var(--btn-color-hover);
  border: 0.1rem solid var(--btn-border-color-hover);
}

.premium-best-selling-2-col .product-image_pbs {
  flex: 1 1 100%;
  text-align: center;
  overflow: hidden;
  border-radius: var(--img-border-radius);
}

.premium-best-selling-2-col .product-image_pbs img {
  max-width: 100%;
  height: 100%;
  width: 100%;
  transition: transform 0.5s;
}

.premium-best-selling-2-col .product-image_pbs:hover img {
  transform: scale(1.1);
}

@media (max-width: 767px) {
  .premium-best-selling-2-col {
    flex-direction: column;
    align-items: center;
  }

  .premium-best-selling-2-col .best-selling-col-1,
  .premium-best-selling-2-col .best-selling-col-1-col-2 {
    flex-basis: auto;
    align-items: center;
  }

  .premium-best-selling-2-col .best-selling-col-1-col-2 {
    flex-direction: column-reverse;
    margin-top: 25px;
  }
}
</style>