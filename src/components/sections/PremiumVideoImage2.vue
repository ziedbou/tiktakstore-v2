<template>
  <section 
    class="premium-video" 
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-color': data.values.title_color,
      '--btn-1-color': data.values.btn_1_color,
      '--btn-1-color-txt': data.values.btn_1_color_txt,
      '--btn-2-color': data.values.btn_2_color,
      '--btn-2-color-txt': data.values.btn_2_color_txt
    }"
  >
    <div class="premium-video__container">
      <div class="premium-video__layout">
        <div class="premium-video__media premium-video__media--left">
          <video 
            :src="data.values.video_link || ''"
            muted 
            autoplay 
            playsinline 
            preload="none" 
            loop
          ></video>
        </div>
        
        <div class="premium-video__content">
          <div class="premium-video__heading">
            <h2>{{ data.values.title }}</h2>
          </div>
          
          <div class="premium-video__description">
            <p>{{ data.values.description }}</p>
          </div>
          
          <div class="premium-video__buttons">
            <a 
              :href="data.values.btn_1_link" 
              class="premium-video__button premium-video__button--primary"
            >
              <p>
                {{ data.values.btn_1_text }}
              </p>
            </a>
            
            <a 
              :href="data.values.btn_2_link" 
              class="premium-video__button premium-video__button--secondary"
            >
              <p>
                {{ data.values.btn_2_text }}
              </p>
            </a>
          </div>
          
          <div class="premium-video__info">
            <p>{{ data.values.more_info }}</p>
          </div>
        </div>
        
        <div class="premium-video__media premium-video__media--right">
          <img :src="data.values.img?.image || ''" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  key: String,
  data: Object,
});
</script>

<style scoped>
.premium-video {
  overflow: hidden;
  background-color: var(--section-bg);
}

.premium-video__container {
  margin: 0 auto;
  padding: 45px 1.5rem;
  max-width: 1600px;
}

.premium-video__layout {
  display: flex;  
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.premium-video__media {
  border: 0px solid #000000;
  border-radius: 0px;
  overflow: hidden;
  aspect-ratio: 9.6/13;
}

.premium-video__media img,
.premium-video__media svg,
.premium-video__media iframe,
.premium-video__media video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0px;
}

.premium-video__content {
  flex: 1 1 0;
}

.premium-video__buttons {
  display: flex;
  align-items: center;
  margin-top: 28px;
  gap: 6px;
  justify-content: center;
}

.premium-video__media--right {
  display: none;
}

/* Typography */
.premium-video__heading {
  margin-top: 0px;
  text-align: center;
}

.premium-video__heading h2 {
  margin: 0;
  font-size: 40px;
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-weight: 700;
  font-family: Americana, serif;
  font-style: normal;
  color: var(--title-color);
}

.premium-video__heading h2 strong {
  text-decoration: underline;
}

.premium-video__description {
  margin-top: 16px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.premium-video__description p {
  margin: 0;
  font-size: 15px;
  color: #5c5c5c;
  line-height: 170%;
  text-transform: unset;
}

.premium-video__button {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: fit-content;
  gap: 10px;
  width: 100%;
  margin: 0;         
  font-size: 13px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 16px;
  border-radius: 4px;
  transition: all 0.3s ease 0s;
  border: 0px;
  cursor: pointer;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
}

.premium-video__button--primary {
  background-color: var(--btn-1-color);
}

.premium-video__button--primary p {
  color: var(--btn-1-color-txt);
}

.premium-video__button--secondary {
  background-color: var(--btn-2-color);
}

.premium-video__button--secondary p {
  color: var(--btn-2-color-txt);
}

.premium-video__button p {
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
}

.premium-video__button:hover {
  transition: all 0.25s ease 0s;
}

.premium-video__info {
  margin-top: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.premium-video__info p {
  margin: 0;
  font-size: 14px;
  color: #5c5c5c;
  line-height: 130%;
  text-transform: unset;
}

@media(min-width: 1024px) {
  .premium-video__container {
    padding: 60px 5rem;
  }

  .premium-video__layout {
    flex-direction: row;
    gap: 40px;
  }

  .premium-video__media {
    flex: 1 1 0;
  }

  .premium-video__buttons {
    margin-top: 40px;
    gap: 10px;
  }

  .premium-video__media--right {
    display: block;
  }
  
  .premium-video__heading h2 {
    font-size: 48px;
  }
  
  .premium-video__button {
    padding: 16px 20px;
  }
}
</style>
