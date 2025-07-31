<template>
  <div
    class="section"
    :style="{ padding: '37px 17px' }"
  >
    <div
      class="hero"
      :style="{
        backgroundColor: 'rgb(255, 255, 255)',
      }"
    >
      <div class="section-settings">
        <div class="hero-body">
          <div class="hero-content" :style="{ backgroundColor: data.values.section_bg }">
            <div class="hero-heading">
              <h1 :style="{ color: data.values.title_color }">{{ data.values.title }}</h1>
            </div>

            <div class="hero-text">
              <p :style="{ color: data.values.description_color }">
                {{ data.values.desc }}
              </p>
            </div>

            <a 
              :href="data.values.btn_link" 
              class="flex items-center justify-center max-w-fit gap-2.5 w-full text-sm leading-[100%] text-center no-underline transition-all m-0 hero-button"
              :style="{
                color: data.values.txt_color,
                border: `2px solid ${data.values.btn_border_color}`,
                background: data.values.btn_bg
              }"
            >
              <p class="hero-button-inner" :style="{ color: data.values.btn_text_color }">
                {{ data.values.btn_text }}
              </p>
            </a>
          </div>

          <div class="hero-circle">
            <div class="hero-circle-image">
              <img
                :src="data.values.animated_img.image"
                alt=""
              />
            </div>
          </div>

          <div class="hero-image">
            <img
              :src="data.values.img.image"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup lang="ts">
interface AnimatedImage {
  image: string;
}

interface Image {
  image: string;
}

defineProps<{
  data: any;
}>();
</script>

<style scoped>
.section {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 7px;
  overflow: hidden;
}

.section-settings {
  margin: 0 auto;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 0rem;
  padding-right: 0rem;
  height: 100%;
}

.hero-body {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "image"
    "content";
  gap: 0px;
  height: 100%;
}

.hero {
  height: 100%;
}

.hero-content {
  grid-area: content;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: end;
  align-items: start;
  padding: 32px 24px;
  border: 0px solid #121212;
  border-radius: 0px;
  overflow: hidden;
}

.hero-image {
  grid-area: image;
  border: 0px solid #121212;
  border-radius: 0px;
  overflow: hidden;
  aspect-ratio: auto;
}

.hero-image img,
.hero-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-image svg {
  background-color: #afafaf;
}

.hero-heading {
  margin-top: 0px;
  text-align: start;
}

.hero-heading * {
  margin: 0;
  font-size: 32px;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-weight: 700;
}

.hero-heading * strong {
  text-decoration: underline;
}

.hero-text {
  margin-top: 12px;
  text-align: start;
  position: relative;
  z-index: 2;
}

.hero-text * {
  margin: 0;
  font-size: 16px;
  line-height: 150%;
  text-transform: unset;
}

.hero-button {
  text-transform: unset;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 100px;
  transition: all 0.3s ease 0s;
  background-color: transparent;
  margin-top: 20px;
  cursor: pointer;
  font-weight: 700;
}

.hero-button-inner {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
}

.hero-button:hover {
  transition: all 0.25s ease 0s;
}

.hero-button svg {
  width: 14px;
  height: 14px;
}

.hero-button svg path {
  transition: all 0.25s ease 0s;
}

.hero-button:hover svg path {
  transition: all 0.25s ease 0s;
}

.hero-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}

.hero-circle-image {
  position: absolute;
  z-index: 2;
  border-radius: 100px;
  overflow: hidden;
  border: 0px solid #121212;
  width: 100px;
  height: 100px;
  animation: rotatecircle 10s infinite linear;
  animation-play-state: running;
}

.hero-circle-image img,
.hero-circle-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-circle-image svg {
  background-color: #afafaf;
}

@keyframes rotatecircle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 1024px) {
  .section {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 4rem;
    margin-right: 4rem;
    border-radius: 12px;
    border-left: solid #121212 0px;
    border-right: solid #121212 0px;
  }

  .section-settings {
    padding: 0 5rem;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 0rem;
    padding-right: 0rem;
  }

  .hero {
    height: 510px;
  }

  .hero-content {
    padding: 48px 50px;
    align-items: start;
  }

  .hero-body {
    grid-template-columns: auto 50%;
    grid-template-areas: "content image";
    gap: 0px;
  }

  .hero-heading {
    margin-top: 0px;
    text-align: start;
  }

  .hero-heading * {
    font-size: 48px;
  }

  .hero-text {
    margin-top: 16px;
    text-align: start;
  }

  .hero-text * {
    font-size: 18px;
  }

  .hero-button {
    margin-top: 24px;
    padding: 12px 24px;
    font-size: 16px;
  }

  .hero-circle {
    display: flex;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 130px;
    height: 130px;
  }

  .hero-circle-image {
    width: 130px;
    height: 130px;
  }
}
</style>