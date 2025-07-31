<template>
    <div
      :class="[
        'premium-banner-simple-template-10',
        {'no-padding': data.design.container === 'container-fluid'}
      ]"
    >
      <div
        class="cta cta-horizontal cta-horizontal-box bg-image scta flex items-center justify-center"
        :style="{
          backgroundImage: data.values.image.image ? `url('${data.values.image.image}')` : '',
          alignItems: data.values.bloc_vertical,
          borderRadius: data.values.image_border_radius + 'px'
        }"
      >
        <div class="cta-container flex flex-col items-center text-center">
          <h3 class="cta-title" :style="{ color: data.values.title_color }">
            {{ data.values.title }}
          </h3>
          <p class="cta-desc" :style="{ color: data.values.subtitle_color }">
            <em class="font-weight-medium">{{ data.values.subtitle }}</em>
          </p>
          <a
            :title="data.values.title"
            :href="data.values.link"
            class="inline-block px-6 py-1 text-black bg-white rounded-full transition hover:bg-white/40"
            :class="{ hovered: hover }"
          >
            <span>{{ data.values.link_text }}</span>
            <i class="icon-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      hover: false
    }
  }
}
</script>

<style scoped>
.cta-container {
  height: fit-content;
}

.btn.hovered {
  color: v-bind('data.values.btn_color_hover') !important;
  background-color: v-bind('data.values.btn_background_hover') !important;
}
.cta-horizontal-box {
    width: 100%;
    aspect-ratio: 1490 / 500;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.cta-container {
    height: fit-content;
}
@media (min-width: 992px) {
    .cta-title {
        font-size: 25px;
        font-weight: bold;
    }
    .cta-horizontal .cta-desc {
        font-size: 20px;
        margin: 0.2rem 0 0.4rem 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, .5);

    }
}

@media (max-width: 750px) {
  .cta-horizontal-box {
    aspect-ratio: auto;
    height: fit-content;
    min-height: 250px;
  }
}
@media (min-width: 576px) {
  .cta-horizontal-box {
    padding: 1rem;
  }
}
@media (min-width: 768px) {
  .cta-horizontal-box {
    padding: 1.5rem;
  }
}
@media (min-width: 992px) {
  .cta-horizontal-box {
    padding: 2rem;
  }
}
@media (min-width: 1200px) {
  .cta-horizontal-box {
    padding: 3.8rem;
  }
}
</style>
