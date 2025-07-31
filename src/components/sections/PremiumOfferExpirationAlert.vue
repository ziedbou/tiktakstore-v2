<template>
  <div 
    class="last-chance" 
    :style="{
      '--section-bg': data.values.section_bg,
      '--section-border-radius': `${data.values.section_border_radius}px`,
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--cta-bg': data.values.cta_bg,
      '--cta-color': data.values.cta_color,
      '--cta-border-radius': `${data.values.cta_border_radius}px`,
      '--cta-bg-hover': data.values.cta_bg_hover,
      '--cta-color-hover': data.values.cta_color_hover
    }"
  >
    <h2 class="title">{{ data.values.title }}</h2>
    <p class="text">{{ data.values.text }}</p>
    <a :href="data.values.link" class="cta">{{ data.values.text_link }}</a>
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

<style>
.last-chance {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: var(--section-bg);
  padding: 1.5rem;
  text-align: center;
  border-radius: var(--section-border-radius);
}

.title {
  color: var(--title-color);
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.text {
  color: var(--text-color);
  font-size: 15px;
}

.cta {
  background-color: var(--cta-bg);
  color: var(--cta-color);
  font-size: 13px;
  border-radius: var(--cta-border-radius);
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.cta:hover {
  background-color: var(--cta-bg-hover);
  color: var(--cta-color-hover);
}

@media (min-width: 1100px) {
  .last-chance {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
}
</style>