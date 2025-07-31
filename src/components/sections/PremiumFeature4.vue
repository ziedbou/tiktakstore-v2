<template>
  <div
    class="feature-body"
    :style="{
      '--section-color': data.values.section_color,
      '--title-color': data.values.title_color,
      '--subtitle-color': data.values.subtitle_color,
      '--tabs-bg': data.values.tabs_bg,
      '--circle-color': data.values.circle_color,
      '--tab-text-color': data.values.tab_text_color,
      '--product-name-color': data.values.product_name_color,
      '--product-desc-color': data.values.product_desc_color,
      '--product-tag-color': data.values.product_tag_color,
      '--btn-text-color': data.values.btn_text_color,
      '--btn-color': data.values.btn_color,
      backgroundColor: 'var(--section-color)',
    }"
  >
    <div class="feature-content">
      <div class="feature-heading">
        <h2>{{ data.values.title }}</h2>
      </div>

      <div class="feature-subheading">
        <p>{{ data.values.sub_title }}</p>
      </div>

      <div class="feature-images-mobile">
        <div
          v-for="(item, index) in data.values.children"
          :key="'mobile-img-' + index"
          class="feature-image"
          :data-id="`feature_${index + 1}`"
          :class="{ active: activeIndex === index }"
        >
          <img :src="item.img.image" alt="" />
        </div>
      </div>

      <div class="feature-tabs-icons" ref="tabsWrapper">
        <div
          v-for="(item, index) in data.values.children"
          :key="'tab-' + index"
          class="feature-tabs-icon"
          :id="`feature_${index + 1}`"
          :class="{
            active: activeIndex === index && isAutoplay,
            'manual-active': activeIndex === index && !isAutoplay,
          }"
          @click="activateTab(index)"
        >
          <svg
            class="feature-progress-circle"
            viewBox="0 0 100 100"
            :data-id="`feature_${index + 1}`"
          >
            <circle
              class="feature-background"
              cx="50"
              cy="50"
              r="45"
              stroke-width="5"
              fill="none"
            ></circle>
            <circle
              class="feature-progress"
              cx="50"
              cy="50"
              r="45"
              stroke-width="5"
              fill="none"
            ></circle>
          </svg>
          <img :src="item.icon.image" alt="" />
        </div>
      </div>

      <div class="feature-tabs-text-body">
        <div
          v-for="(item, index) in data.values.children"
          :key="'tab-text-' + index"
          class="feature-tabs-title"
        >
          {{ item.nm }}
        </div>
      </div>

      <div class="feature-text-body" ref="textBody">
        <div
          v-for="(item, index) in data.values.children"
          :key="'content-' + index"
          class="feature-text-content"
          :data-id="`feature_${index + 1}`"
          :class="{ active: activeIndex === index }"
        >
          <p class="feature-title">{{ item.nm }}</p>
          <div class="feature-text">
            <p>{{ item.desc }}</p>
          </div>
          <div class="feature-subtext">
            <p>{{ item.tag }}</p>
          </div>
        </div>
      </div>

      <div class="feature-button-wrapper">
        <a :href="data.values.btn_link" class="feature-button">
          <p class="feature-button-inner">
            {{ data.values.btn_text }}
          </p>
        </a>
      </div>
    </div>

    <div class="feature-images">
      <div
        v-for="(item, index) in data.values.children"
        :key="'img-' + index"
        class="feature-image"
        :data-id="`feature_${index + 1}`"
        :class="{ active: activeIndex === index }"
      >
        <img :src="item.img.image" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Props
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Refs
const tabsWrapper = ref(null);
const textBody = ref(null);

// State
const activeIndex = ref(0);
const isAutoplay = ref(true);
let intervalId = null;

// Methods
const activateTab = (index) => {
  // Stop autoplay when a tab is clicked
  stopAutoplay();
  activeIndex.value = index;
  isAutoplay.value = false;
};

const startAutoplay = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Start with first tab
  activeIndex.value = 0;
  isAutoplay.value = true;

  intervalId = setInterval(() => {
    // Advance to next tab
    activeIndex.value =
      (activeIndex.value + 1) % (props.data.values.children?.length || 1);
  }, 8000);
};

const stopAutoplay = () => {
  clearInterval(intervalId);
  intervalId = null;
};

const setMaxHeight = () => {
  if (textBody.value) {
    const allTextContent = textBody.value.querySelectorAll(
      ".feature-text-content"
    );
    if (allTextContent.length) {
      const maxHeight = Math.max(
        ...Array.from(allTextContent).map((el) => el.offsetHeight)
      );
      textBody.value.style.minHeight = `${maxHeight}px`;
    }
  }
};

// Lifecycle
onMounted(() => {
  // Use intersection observer for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMaxHeight();
          startAutoplay();
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  if (tabsWrapper.value) {
    observer.observe(tabsWrapper.value);
  }
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.feature-body {
  display: block;
}

.feature-content {
  display: flex;
  flex-direction: column;
  grid-area: content;
}

.feature-images-mobile {
  margin-top: 10px;
  width: 100%;
  display: block;
}

.feature-images {
  display: none;
}

.feature-image {
  display: none;
  width: 100%;
  height: 100%;
  text-decoration: none;
  box-sizing: border-box !important;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.25s ease 0s;
}

.feature-image.active {
  animation: opacity 0.5s linear;
  display: block;
  transition: all 0.25s ease 0s;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.feature-image img,
.feature-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 12/12;
}

.feature-image svg {
  background-color: #afafaf;
}

.feature-heading {
  text-align: center;
  width: 100%;
}

.feature-heading * {
  margin: 0px;
  font-size: 20px;
  line-height: 130%;
  text-transform: unset;
  color: var(--title-color);
}

.feature-subheading {
  margin-top: 24px;
  text-align: center;
  width: 100%;
}

.feature-subheading * {
  margin: 0px;
  font-size: 16px;
  line-height: 150%;
  text-transform: unset;
  color: var(--subtitle-color);
}

.feature-tabs-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  gap: 10px;
  padding: 4px 6px;
  border-radius: 100px;
  background-color: var(--tabs-bg);
}

.feature-tabs-icon {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 13.5px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  aspect-ratio: 1/1;
}

.feature-tabs-icon img,
.feature-tabs-icon svg {
  display: block;
  height: 18px;
  width: 18px;
  object-fit: contain;
}

.feature-progress-circle {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100% !important;
  height: 100% !important;
  margin: auto;
  z-index: 1;
  transform: rotate(-90deg);
}

.feature-background {
  stroke: #ffffff;
}

.feature-progress {
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  stroke: var(--circle-color);
}

.feature-tabs-icon.active .feature-progress {
  animation: stroke 8s linear forwards;
}

.feature-tabs-icon.manual-active .feature-progress {
  animation: none;
  stroke-dasharray: 283;
  stroke-dashoffset: 0;
}

@keyframes stroke {
  0% {
    stroke-dashoffset: 283;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.feature-tabs-text-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 6px;
  gap: 10px;
}

.feature-tabs-title {
  text-align: center;
  margin: 0px;
  margin-top: 6px;
  font-size: 10px;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  width: calc(18px + (13.5px * 2));
  color: var(--tab-text-color);
}

.feature-text-body {
  margin-top: 40px;
  position: relative;
  min-height: 140px;
}

.feature-text-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateX(-20%);
  opacity: 0;
  pointer-events: none;
}

.feature-text-content.active {
  transform: translateX(0%);
  opacity: 1;
  pointer-events: all;
}

.feature-title {
  margin: 0px;
  width: 100%;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
  text-transform: unset;
  color: var(--product-name-color);
}

.feature-text {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.feature-text * {
  margin: 0px;
  font-size: 14px;
  line-height: 170%;
  text-transform: unset;
  color: var(--product-desc-color);
}

.feature-subtext {
  width: 100%;
  margin-top: 8px;
  text-align: center;
}

.feature-subtext * {
  margin: 0px;
  font-size: 12px;
  line-height: 170%;
  text-transform: unset;
  color: var(--product-tag-color);
}

.feature-button-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.feature-button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  gap: 10px;
  width: 100%;
  margin: 0;
  margin-top: 52px;
  font-size: 14px;
  color: #ffffff;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 10px 32px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  background-color: var(--btn-color);
  border: 1px solid var(--btn-color);
  cursor: pointer;
}

.feature-button-inner {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--btn-text-color);
}

.feature-button:hover {
  color: #39392d;
  transition: all 0.25s ease 0s;
}

.feature-button svg {
  width: 14px;
  height: 14px;
}

.feature-button svg path {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.feature-button:hover svg path {
  fill: #39392d;
  transition: all 0.25s ease 0s;
}

@media (min-width: 1024px) {
  .feature-body {
    display: grid;
    grid-template-columns: 1fr 40%;
    grid-template-areas: "content image";
    gap: 92px;
    align-items: center;
  }

  .feature-heading {
    text-align: center;
  }

  .feature-heading * {
    font-size: 28px;
  }

  .feature-subheading {
    margin-top: 16px;
    text-align: center;
  }

  .feature-subheading * {
    font-size: 16px;
  }

  .feature-images-mobile {
    display: none;
  }

  .feature-images {
    display: block;
  }

  .feature-tabs-icons {
    margin-top: 48px;
    gap: 16px;
    padding: 4px 6px;
    justify-content: space-between;
    width: 100%;
  }

  .feature-tabs-icon {
    padding: 19.5px;
  }

  .feature-tabs-icon svg,
  .feature-tabs-icon img {
    height: 26px;
    width: 26px;
  }

  .feature-tabs-text-body {
    padding: 0px 6px;
    gap: 16px;
  }

  .feature-text-body {
    margin-top: 52px;
  }

  .feature-tabs-title {
    font-size: 12px;
    margin-top: 6px;
    width: calc(26px + (19.5px * 2));
  }

  .feature-title {
    font-size: 20px;
    text-align: center;
  }

  .feature-text {
    text-align: center;
    margin-top: 12px;
  }

  .feature-text * {
    font-size: 14px;
  }

  .feature-subtext {
    text-align: center;
    margin-top: 10px;
  }

  .feature-subtext * {
    font-size: 12px;
  }

  .feature-button-wrapper {
    justify-content: center;
  }

  .feature-button {
    margin-top: 52px;
    padding: 10px 32px;
    font-size: 14px;
  }

  .feature-image img,
  .feature-image svg {
    aspect-ratio: 9.6/13;
  }
}
</style>
