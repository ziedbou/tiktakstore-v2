<template>

  <div
    class="premium-before-after"
    :style="{
      '--title-color': data.values.titleColor,
      '--text-color': data.values.textColor,
      '--icon-title-color': data.values.iconTitleColor,
      '--icon-text-color': data.values.iconTextColor,
      '--background-color': data.values.backgroundColor,
    }"
  >
    <div class="premium-before-after-title">
      <h2>{{ data.values.title }}</h2>
    </div>
    <div class="premium-before-after-text">
      <p>{{ data.values.Sub_title }}</p>
    </div>
    <div class="premium-before-after-body">
      <div class="premium-before-after-left">
        <div class="premium-before-after-desktop">
          <div v-if="data.values.icon_img_1" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_1.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_1 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_1 }}
              </p>
            </div>
          </div>

          <div v-if="data.values.icon_img_2" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_2.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_2 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_2 }}
              </p>
            </div>
          </div>
        </div>

        <div class="premium-before-after-mobile">
          <div v-if="data.values.icon_img_1" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_1.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_1 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_1 }}
              </p>
            </div>
          </div>

          <div v-if="data.values.icon_img_2" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_2.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_2 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_2 }}
              </p>
            </div>
          </div>

          <div v-if="data.values.icon_img_3" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_3.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_3 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_3 }}
              </p>
            </div>
          </div>

          <div v-if="data.values.icon_img_4" class="premium-before-after-item">
            <div class="premium-before-after-item-icon">
              <img :src="imghttps(data.values.icon_img_4.image)" alt="" loading="lazy" />
            </div>
            <div class="premium-before-after-item-content">
              <p class="premium-before-after-item-title">
                {{ data.values.icon_title_4 }}
              </p>
              <p class="premium-before-after-item-text">
                {{ data.values.icon_description_4 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="premium-before-after-center">
        <div ref="imageWrapper" class="premium-before-after-image-wrapper">
          <div class="premium-before-after-image-relative">
            <img
              class="premium-before-after-image"
              :src="imghttps(data.values.first_image.image)"
              alt=""
              loading="lazy"
              draggable="false"
            />
          </div>
          <div class="premium-before-after-cursor-wrapper">
            <div ref="cursor" class="premium-before-after-cursor">
              <div class="premium-before-after-cursor-circle"></div>
            </div>
          </div>
          <div class="premium-before-after-image-absolute">
            <img
              class="premium-before-after-image"
              :src="imghttps(data.values.second_image.image)"
              alt=""
              loading="lazy"
              draggable="false"
            />
          </div>
        </div>
      </div>

      <div class="premium-before-after-desktop premium-before-after-right">
        <div v-if="data.values.icon_img_3" class="premium-before-after-item">
          <div class="premium-before-after-item-icon">
            <img :src="imghttps(data.values.icon_img_3.image)" alt="" loading="lazy" />
          </div>
          <div class="premium-before-after-item-content">
            <p class="premium-before-after-item-title">
              {{ data.values.icon_title_3 }}
            </p>
            <p class="premium-before-after-item-text">
              {{ data.values.icon_description_3 }}
            </p>
          </div>
        </div>

        <div v-if="data.values.icon_img_4" class="premium-before-after-item">
          <div class="premium-before-after-item-icon">
            <img :src="imghttps(data.values.icon_img_4.image)" alt="" loading="lazy" />
          </div>
          <div class="premium-before-after-item-content">
            <p class="premium-before-after-item-title">
              {{ data.values.icon_title_4 }}
            </p>
            <p class="premium-before-after-item-text">
              {{ data.values.icon_description_4 }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { imghttps } from "~/composables/services/helpers";

// Component props with a single data object
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const imageWrapper = ref(null);
const cursor = ref(null);

onMounted(() => {
  if (!imageWrapper.value || !cursor.value) return;

  let startX, originalOffset;

  const dragStart = (event) => {
    startX = event.clientX;
    originalOffset = parseFloat(
      getComputedStyle(imageWrapper.value).getPropertyValue(
        "--clip-path-offset"
      ) || "0"
    );

    document.addEventListener("pointermove", dragMove);
    document.addEventListener("pointerup", dragEnd);
  };

  const dragMove = (event) => {
    const currentX = event.clientX;
    const deltaX = currentX - startX;

    let newOffset = deltaX + originalOffset;
    const cursorOffsetPercent = 50;
    const containerWidth = imageWrapper.value.offsetWidth;
    const pixelsOffset = (cursorOffsetPercent / 100) * containerWidth;

    const minOffset = -pixelsOffset;
    const maxOffset = containerWidth - pixelsOffset;

    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));

    imageWrapper.value.style.setProperty(
      "--clip-path-offset",
      `${newOffset}px`
    );
  };

  const dragEnd = () => {
    document.removeEventListener("pointermove", dragMove);
    document.removeEventListener("pointerup", dragEnd);
  };

  cursor.value.addEventListener("pointerdown", dragStart);
});
</script>

<style>
.premium-before-after {
  --clip-path-offset: 0px;
}

.premium-before-after-title {
  text-align: center;
}

.premium-before-after-title h2 {
  margin: 0;
  font-size: 26px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
}

.premium-before-after-text {
  margin-top: 16px;
  text-align: center;
}

.premium-before-after-text p {
  margin: 0;
  font-size: 16px;
  color: var(--text-color);
  line-height: 130%;
  text-transform: unset;
}

.premium-before-after-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 30px;
}

.premium-before-after-desktop {
  display: none;
}

.premium-before-after-mobile {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.premium-before-after-item-icon {
  width: 36px;
  margin-left: auto;
  margin-right: auto;
}

.premium-before-after-item-icon img,
.premium-before-after-item-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.premium-before-after-item-content {
  display: flex;
  flex-direction: column;
}

.premium-before-after-item-title {
  margin: 0px;
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: var(--icon-title-color);
  line-height: 130%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
  font-weight: 700;
}

.premium-before-after-item-text {
  margin: 0px;
  margin-top: 10px;
  text-align: center;
  font-size: 13px;
  color: var(--text-color);
  line-height: 150%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
}

.premium-before-after-cursor-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 7px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  z-index: 3;
  position: relative;
}

.premium-before-after-cursor-circle::after {
  content: "";
  padding: calc(3px + 2px);
  display: inline-block;
  border: solid var(--title-color);
  border-width: 0 2px 2px 0;
  transform: rotate(-45deg) scale(80%);
}

.premium-before-after-cursor-circle::before {
  content: "";
  padding: calc(3px + 2px);
  display: inline-block;
  border: solid var(--title-color);
  border-width: 0 2px 2px 0;
  transform: rotate(135deg) scale(80%);
}

.premium-before-after-image-wrapper {
  position: relative;
  --text-primary: 26 26 26;
  --shadow: 0 5px 15px rgb(var(--text-primary) / 0.1);
  filter: drop-shadow(var(--shadow));
  user-select: none;
  overflow: hidden;
  border: 0px solid #000000;
  border-radius: 500px;
}

.premium-before-after-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.premium-before-after-image-relative svg,
.premium-before-after-image-absolute svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  fill: black;
  background-color: white;
  display: block;
}

.premium-before-after-image-absolute svg {
  filter: invert(1);
}

.premium-before-after-image-relative {
  position: relative;
  aspect-ratio: 12/12;
}

.premium-before-after-image-absolute {
  clip-path: inset(
    0 0 0
      calc(50% + var(--clip-path-offset, 0px))
  );
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.premium-before-after-cursor-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.premium-before-after-cursor {
  height: 100%;
  width: max-content;
  touch-action: none;
  transform: translate(
    calc( 1 * -50% + var(--clip-path-offset, 0px)),
    -50%
  );
  cursor: grab;
  will-change: transform;
  place-items: center;
  display: grid;
  position: relative;
  top: 50%;
  left: 50%;
  z-index: 2;
}

.premium-before-after-cursor:before {
  content: "";
  height: calc(50% - 28px);
  top: 0;
  width: 3px;
  background: #ffffff;
  z-index: -1;
  position: absolute;
}

.premium-before-after-cursor:after {
  content: "";
  height: calc(50% - 28px);
  bottom: 0;
  width: 3px;
  background: #ffffff;
  z-index: -1;
  position: absolute;
}

.premium-before-after-left {
  order: 2;
}

.premium-before-after-center {
  order: 1;
}

@media (min-width: 1024px) {
  .premium-before-after-title h2 {
    font-size: 36px;
  }

  .premium-before-after-text {
    margin-top: 20px;
  }

  .premium-before-after-text p {
    font-size: 20px;
  }

  .premium-before-after-body {
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 100px;
    margin-top: 50px;
  }

  .premium-before-after-desktop {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .premium-before-after-mobile {
    display: none;
  }

  .premium-before-after-item-icon {
    width: 56px;
  }

  .premium-before-after-item-title {
    margin-top: 10px;
    font-size: 18px;
  }

  .premium-before-after-item-text {
    margin-top: 10px;
    font-size: 16px;
  }

  .premium-before-after-left {
    order: 1;
  }

  .premium-before-after-center {
    order: 2;
  }

  .premium-before-after-right {
    order: 3;
  }
}
</style>
