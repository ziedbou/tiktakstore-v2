<template>
    <div 
      :style="{
        backgroundColor: data.values.section_bg,
      }"
    >
      <div class="section-premium-feature-settings">
        <div class="features-heading-premium-feature">
          <h2>{{ data.values.title }}</h2>
        </div>

        <div class="features-items-premium-feature">
          <a 
            v-for="item in data.values.children" 
            :key="item.text"
            :href="item.link" 
            class="features-item-premium-feature"
          >
            <div class="features-icon-premium-feature">
              <img :src="imghttps(item.icon.image)" :alt="item.text">
            </div>

            <div class="features-title-premium-feature">
              <h3>{{ item.text }}</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.section-premium-feature-settings {
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.features-heading-premium-feature {
  margin-top: 12px;
  text-align: center;
}

.features-heading-premium-feature h2 {
  margin: 0;
  font-size: 30px;
  line-height: 130%;
  text-transform: unset;
  color: v-bind('data.values.title_color');
  font-size: v-bind('`${data.values.title_size || "32"}px`') !important;
}

.features-items-premium-feature {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.features-item-premium-feature {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  border-radius: 20px;
  border: 1px solid #e9e9e9;
  transition: all 0.25s ease 0s;
  text-decoration: none;
  background-color: v-bind('data.values.card_bg');
  box-shadow: v-bind('`${data.values.shadow_color} 2px 3px ${data.values.shadow_spread}px 0px`');
}

.features-icon-premium-feature {
  width: 48px;
  height: 48px;
}

.features-icon-premium-feature img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.features-title-premium-feature {
  text-align: center;
  margin-top: 24px;
}

.features-title-premium-feature h3 {
  margin: 0;
  font-size: 14px;
  line-height: 130%;
  text-transform: unset;
  word-wrap: break-word;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: v-bind('data.values.text_card_color') !important;
}

@media(min-width: 1024px) {
  .section-premium-feature-settings {
    padding: 0 5rem;
  }

  .features-heading-premium-feature {
    margin-top: 16px;
  }

  .features-heading-premium-feature h2 {
    font-size: 48px;
  }

  .features-items-premium-feature {
    margin-top: 32px;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .features-item-premium-feature {
    align-items: start;
    padding: 30px 30px;
  }

  .features-title-premium-feature {
    text-align: left;
    margin-top: 32px;
  }

  .features-title-premium-feature h3 {
    font-size: 18px;
  }
}
</style>