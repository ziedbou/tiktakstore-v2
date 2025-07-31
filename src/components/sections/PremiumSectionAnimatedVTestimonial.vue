<template>
  <div
    class="feature-body"
    :style="{
      backgroundColor: data.values.section_color,
      '--text-color': data.values.text_color,
      '--title-color': data.values.title_color,
      '--btn-bg': data.values.btn_bg,
      '--btn-text-color': data.values.btn_text_color,
    }"
  >
    <div>
      <div class="feature-heading">
        <p>{{ data.values.title }}</p>
      </div>
      <div class="feature-items">
        <div class="feature-item">
          <div class="feature-item-icon">
            <img :src="data.values.stat1_icon.image" alt="" loading="lazy" />
          </div>
          <div class="feature-item-content">
            <p class="feature-item-heading">
              {{ data.values.stat1_number }}
            </p>
            <p class="feature-item-text">
              {{ data.values.stat1_text }}
            </p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-item-icon">
            <img :src="data.values.stat2_icon.image" alt="" loading="lazy" />
          </div>
          <div class="feature-item-content">
            <p class="feature-item-heading">
              {{ data.values.stat2_number }}
            </p>
            <p class="feature-item-text">
              {{ data.values.stat2_text }}
            </p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-item-icon">
            <img :src="data.values.stat3_icon.image" alt="" loading="lazy" />
          </div>
          <div class="feature-item-content">
            <p class="feature-item-heading">
              {{ data.values.stat3_number }}
            </p>
            <p class="feature-item-text">
              {{ data.values.stat3_text }}
            </p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-item-icon">
            <img :src="data.values.stat4_icon.image" alt="" loading="lazy" />
          </div>
          <div class="feature-item-content">
            <p class="feature-item-heading">
              {{ data.values.stat4_number }}
            </p>
            <p class="feature-item-text">
              {{ data.values.stat4_text }}
            </p>
          </div>
        </div>
      </div>
      <a :href="data.values.btn_link" class="feature-button">
        {{ data.values.btn_text }}
        <svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z"
            fill="#fff"
            data-darkreader-inline-fill=""
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11"
            fill="black"
            data-darkreader-inline-fill=""
          ></path>
          <path
            d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z"
            fill="#fff"
            data-darkreader-inline-fill=""
          ></path>
        </svg>
      </a>
    </div>
    <div class="feature-images">
      <div class="feature-images-wrapper">
        <div class="feature-images-left">
          <div class="feature-images-inner">
            <template v-for="n in 16" :key="`left-repeat-${n}`">
              <div
                class="feature-image"
                v-for="(item, index) in slicedChildren.slice().reverse()"
                :key="`left-${n}-${index}`"
              >
                <img :src="item.image.image" alt="" loading="lazy" />
              </div>
            </template>
          </div>
        </div>
        <div class="feature-images-right">
          <div class="feature-images-inner">
            <template v-for="n in 16" :key="`right-repeat-${n}`">
              <div
                class="feature-image"
                v-for="(item, index) in slicedChildren.slice().reverse()"
                :key="`right-${n}-${index}`"
              >
                <img :src="item.image.image" alt="" loading="lazy" />
              </div>
            </template>
          </div>
        </div>
        <div class="feature-images-left">
          <div class="feature-images-inner">
            <template v-for="n in 16" :key="`left2-repeat-${n}`">
              <div
                class="feature-image"
                v-for="(item, index) in slicedChildren"
                :key="`left2-${n}-${index}`"
              >
                <img :src="item.image.image" alt="" loading="lazy" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  key: String,
  data: Object,
});

const slicedChildren = computed(() => {
  // Simuler le comportement du pipe slice en JavaScript
  return props.data.values.children.slice(
    0,
    Math.ceil(props.data.values.children.length / 3)
  );
});

onMounted(() => {
  // Set CSS variable for animation duration based on children length
  document.documentElement.style.setProperty(
    "--children-length",
    props.data.values.children.length
  );
});
</script>

<style></style>

<style scoped>
.feature-body {
  grid-template-columns: 1fr;
  gap: 72px;
  align-items: center;
  display: grid;
}

.feature-items {
  display: grid;
  margin-top: 24px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.feature-item {
  display: flex;
  gap: 10px;
  align-items: center;
}

.feature-item-icon {
  flex: 0 0 40px;
}

.feature-item-icon img,
.feature-item-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-item-icon svg path {
  fill: #000000;
}

.feature-item-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.feature-item-heading {
  margin: 0px;
  font-size: 18px;
  color: #000000;
  line-height: 130%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
  font-weight: 700;
}

.feature-item-text {
  margin: 0px;
  font-size: 13px;
  line-height: 150%;
  text-transform: unset;
  transition: all 0.25s ease 0s;
  word-break: break-word;
  color: var(--text-color);
}

.feature-images-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  height: 300px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
@media (min-width: 1024px) {
  .feature-body {
    grid-template-columns: 1fr 1fr;
  }
  .feature-images-wrapper {
    height: 740px;
    gap: 20px;
  }
}

.feature-images-left,
.feature-images-right {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.feature-images-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 0 8px;
}

.feature-image {
  border-radius: 12px;
  border: 0px solid #000000;
  overflow: hidden;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;
  aspect-ratio: 9.6 / 14;
}

.feature-image img,
.feature-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-image svg {
  background-color: #afafaf;
}

@media (min-width: 1024px) {
  .feature-body {
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }

  .feature-item {
    gap: 20px;
  }

  .feature-items {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 60px;
    gap: 40px;
  }

  .feature-item-icon {
    flex: 0 0 50px;
  }

  .feature-item-heading {
    font-size: 25px;
  }

  .feature-item-text {
    font-size: 13px;
  }

  .feature-images {
    margin-top: -0px;
    margin-bottom: -0px;
  }

  .feature-images-wrapper {
    height: 740px;
    gap: 4px;
  }
}

.feature-heading {
  text-align: left;
  margin-top: 52px;
}

.feature-heading * {
  margin: 0;
  font-size: 24px;
  line-height: 150%;
  color: var(--title-color);
}

.feature-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  margin: 0;
  margin-top: 40px;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 30px;
  border-radius: 4px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  background-color: var(--btn-bg);
  color: var(--btn-text-color);
}

.feature-button svg {
  width: 14px;
  height: 14px;
  fill: #fff;
}

@media (min-width: 1024px) {
  .feature-heading {
    text-align: left;
    margin-top: 0px;
  }

  .feature-heading * {
    font-size: 33px;
  }

  .feature-button {
    margin-top: 80px;
    padding: 16px 30px;
    font-size: 14px;
  }
}

.feature-images-left {
  animation: leftImagesAnimation calc(var(--children-length) * 25s) linear
    infinite;
}

.feature-images-right {
  animation: rightImagesAnimation calc(var(--children-length) * 25s) linear
    infinite;
}

@keyframes leftImagesAnimation {
  0% {
    transform: translateY(0%);
  }

  100% {
    transform: translateY(-50%);
  }
}

@keyframes rightImagesAnimation {
  0% {
    transform: translateY(-50%);
  }

  100% {
    transform: translateY(0%);
  }
}
</style>
