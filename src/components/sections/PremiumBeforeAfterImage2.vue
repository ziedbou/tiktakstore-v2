<template>
  <div
    class="premium-before-after"
    :style="{
      '--section-bg': data.values.sectionBg || '#ffffff',
      '--title-color': data.values.title_color,
      '--btn-text-color': data.values.btnTextColor || '#ffffff',
      '--btn-color': data.values.btnColor || '#000000',
      '--border-radius': data.values.border_radius,
      '--clip-path-offset': '0px',
      background: 'var(--section-bg)',
    }"
  >
    <div
      class="premium-before-after-title"
      :style="{ '--color': 'var(--title-color)' }"
    >
      <h2 style="font-weight: 700">
        {{ data.values.title }}
      </h2>
      <div v-if="data.values.description" style="margin-bottom: 10px">
        <p>{{ data.values.description }}</p>
      </div>
    </div>

    <div
      class="before-after-image-wrapper"
      :style="{
        'aspect-ratio': data.values.aspect_ratio,
      }"
      ref="imageWrapper"
    >
      <div class="before-after-image-relative">
        <img
          :src="data.values.before_image?.image"
          alt=""
          loading="lazy"
          draggable="false"
          class="before-after-image"
        />
        <div class="before-after-image-text before-after-image-text--before">
          {{ data.values.before_txt }}
        </div>
      </div>

      <div
        class="before-after-image-clip"
        :style="{
          'clip-path': `inset(0 0 0 calc(var(--before-after-initial-drag-position, 50%) + var(--clip-path-offset, 0px)))`,
        }"
      >
        <img
          :src="data.values.after_image?.image"
          alt=""
          loading="lazy"
          draggable="false"
          class="before-after-image"
        />
        <div class="before-after-image-text before-after-image-text--after">
          {{ data.values.after_txt || "After" }}
        </div>
      </div>

      <div class="cursor-container">
        <div class="before-after-cursor" ref="cursor">
          <svg
            role="presentation"
            focusable="false"
            width="28"
            height="35"
            viewBox="0 0 32 40"
            style="width: 40px; height: 40px"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16V24C32 32.8366 24.8366 40 16 40C7.16344 40 0 32.8366 0 24V16Z"
              fill="#ffffff"
            ></path>
            <path
              fill="#000000"
              d="M11 14H13V26H11zM15 14H17V26H15zM19 14H21V26H19z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <a
      v-if="data.values.btn_txt"
      :href="data.values.btn_link"
      class="before-after-button"
      :style="{
        '--color': data.values.btn_text_color,
        '--background-color': data.values.btn_color,
        '--hover-color': data.values.btn_hover_color,
        '--hover-background-color': data.values.btn_hover_bg_color,
      }"
    >
      {{ data.values.btn_txt }}
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineProps({
  data: {
    type: Object,
  },
});

const cursor = ref(null);
const imageWrapper = ref(null);

onMounted(() => {
  setTimeout(setupDragFunctionality, 400);
});

function setupDragFunctionality() {
  if (!cursor.value || !imageWrapper.value) return;

  let xStart, xEnd, xDiff, originalOffset;

  function dragStart(event) {
    xStart = event.clientX;
    originalOffset =
      imageWrapper.value.style
        .getPropertyValue("--clip-path-offset")
        .slice(0, -2) || "0";

    document.addEventListener("pointermove", dragMove);
    document.addEventListener("pointerup", dragEnd);
  }

  function dragMove(event) {
    xEnd = event.clientX;
    xDiff = xEnd - xStart;

    // clamp the value to the imageWrapper's width
    let result = xDiff + parseInt(originalOffset);
    let cursorOffsetPercent = parseFloat(
      getComputedStyle(imageWrapper.value).getPropertyValue(
        "--before-after-initial-drag-position"
      )
    );
    let containerWidth = imageWrapper.value.offsetWidth;
    let pixelsOffset = (cursorOffsetPercent / 100) * containerWidth;

    const negativeMax = -1 * pixelsOffset;
    const positiveMax = containerWidth - pixelsOffset;

    if (result < negativeMax) {
      result = negativeMax;
    } else if (result > positiveMax) {
      result = positiveMax;
    }

    imageWrapper.value.style.setProperty("--clip-path-offset", result + "px");
  }

  function dragEnd() {
    document.removeEventListener("pointermove", dragMove);
    document.removeEventListener("pointerup", dragEnd);
  }

  cursor.value.addEventListener("pointerdown", dragStart);
}
</script>

<style scoped>
.premium-before-after {
  width: 100%;
}

.premium-before-after-title * {
  color: var(--color);
  text-align: center;
}

.before-after-image-wrapper {
  position: relative;
  --text-primary: 26 26 26;
  --shadow: 0 5px 15px rgb(var(--text-primary) / 0.1);
  filter: drop-shadow(var(--shadow));
  user-select: none;
  overflow: hidden;
  max-height: 80vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: calc(var(--border-radius) * 1px);
}

.filter-invert {
  filter: invert(1);
}

.before-after-image-relative {
  position: relative;
  color: rgb(255, 255, 255);
}

.before-after-image-clip {
  position: absolute;
  color: rgb(255, 255, 255);
}

.before-after-image-text {
  position: absolute;
  font-weight: 700;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 1px 6px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  font-size: 15px;
  color: #111;
  opacity: 0.8;
}

.before-after-image-text--before {
  left: 2rem;
}

.before-after-image-text--after {
  right: 2rem;
}

.before-after-image {
  width: 100%;
  display: block;
}

.cursor-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.before-after-cursor {
  height: 100%;
  width: max-content;
  touch-action: none;
  --transform-logical-flip: 1;
  transform: translate(
    calc(var(--transform-logical-flip) * -50% + var(--clip-path-offset, 0px)),
    -50%
  );
  cursor: grab;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))
    drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
  will-change: transform;
  place-items: center;
  display: grid;
  position: relative;
  top: 50%;
  left: var(--before-after-initial-drag-position, 50%);
}

.before-after-cursor:before {
  content: "";
  height: 100%;
  width: 2px;
  background: #ffffff;
  z-index: -1;
  position: absolute;
}

.before-after-button {
  display: block;
  text-decoration: none;
  text-align: center;
  color: var(--color);
  background-color: var(--background-color);
  border-style: solid;
  transition: all 0.3s ease-in-out;
  margin-top: 30px;
  width: 200px;
  font-size: 16px;
  border-radius: 2px;
  border-color: transparent;
  border-width: 0px;
  padding: 6px 0px;
  margin-left: auto;
  margin-right: auto;
}

.before-after-button:hover {
  color: var(--hover-color);
  background-color: var(--hover-background-color);
}

@media screen and (min-width: 750px) {
  .before-after-button {
    margin-top: 40px;
  }
}
</style>
