<template>
    <div  :style="{
      '--title-size-mobile': `${data.values.title_size_mobile}px`,
      '--title-size-desktop': `${data.values.title_size_desktop}px`, 
      '--title-color': data.values.title_color,
      '--text-color': data.values.text_color,
      '--subtitle-color': data.values.subtitle_color,
      '--btn-color': data.values.btn_color,
      '--btn-color-hover': data.values.btn_color_hover,
      '--btn-background': data.values.btn_background,
      '--btn-background-hover': data.values.btn_background_hover,
      '--btn-border-radius': `${data.values.btn_border_radius}px`,
      '--pagination-background': data.values.pagination_background,
      '--pagination-background-hover': data.values.pagination_background_hover,
      '--pagination-color': data.values.pagination_color,
      '--pagination-color-hover': data.values.pagination_color_hover
    }">
  <div 
    class="image-text-slider swiper mx-auto"
    ref="swiperEl"
  >
    <div class="image-text-pagination-wrapper">
      <p class="image-text-pagination-text">{{ data.values.sub_title }}</p>
      <div class="image-text-pagination swiper-pagination"></div>
    </div>
    <div class="swiper-wrapper">
      <div 
        v-for="(child, index) in data.values.children" 
        :key="index"
        class="image-text-slide swiper-slide"
      >
        <div class="image-text-content">
          <div class="image-text-heading">
            <p>{{ child.title }}</p>
          </div>
          <div class="image-text-text">
            <p>{{ child.text }}</p>
          </div>
          <NuxtLink class="image-text-button" :to="child.link">
            <span>{{ child.link_text }}</span>
          </NuxtLink>
        </div>
        <div class="image-text-image" style="clip-path: url(#image-shape);">
          <img :alt="child.title" loading="lazy" :src="child.image.image" />
          <svg class="clip" fill="none" height="0px" viewBox="0 0 340 341" width="0px" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
              <clipPath clipPathUnits="objectBoundingBox" id="image-shape">
                <path
                  d="M0.018821235294117646,0.01844991202346041c0.013941176470588236,-0.013926686217008797,0.03671764705882353,-0.019114369501466274,0.06908823529411764,-0.018237536656891498c0.026079411764705886,0.0006686217008797655,0.05835882352941176,0.005211143695014663,0.09620882352941176,0.011504398826979472c0.02975588235294118,0.004935483870967742,0.06295882352941176,0.010929618768328445,0.0987764705882353,0.01669208211143695c0.05195294117647059,0.008439882697947215,0.10844117647058822,0.015932551319648092,0.16270588235294117,0.019c0.15209411764705882,0.010281524926686216,0.2913352941176471,-0.026052785923753666,0.4360764705882353,-0.04493548387096774c0.09942352941176472,-0.010859237536656892,0.12714411764705882,0.015445747800586511,0.1160235294117647,0.11571554252199415c-0.017388235294117645,0.13494428152492668,-0.050311764705882354,0.25958651026392965,-0.04640588235294118,0.40186217008797653c0.001526470588235294,0.06467155425219942,0.010129411764705882,0.13229618768328447,0.020279411764705883,0.194683284457478c0.010264705882352941,0.06545747800586511,0.02603529411764706,0.1373900293255132,0.02825294117647059,0.19484457478005862c0.00044117647058823526,0.04636656891495601,-0.007652941176470588,0.0734574780058651,-0.04728235294117647,0.08390029325513196c-0.02185,0.004865102639296188,-0.046173529411764704,0.0037829912023460413,-0.07086764705882352,0.0011994134897360704c-0.03586176470588235,-0.003873900293255132,-0.07362058823529412,-0.010651026392961878,-0.1104529411764706,-0.01696774193548387c-0.1261970588235294,-0.023102639296187683,-0.2653676470588235,-0.03988856304985337,-0.39845588235294116,-0.02160410557184751c-0.0631,0.007193548387096774,-0.13029117647058824,0.01941348973607038,-0.18860294117647058,0.029258064516129032c-0.06272941176470588,0.008299120234604105,-0.16511176470588235,0.034859237536656894,-0.18027941176470588,-0.03571554252199414c-0.007352941176470588,-0.03439882697947214,-0.0013205882352941177,-0.07243988269794722,0.003838235294117647,-0.10909970674486805c0.006635294117647058,-0.04304398826979473,0.015026470588235294,-0.08763343108504398,0.021964705882352942,-0.13141642228739003c0.01301764705882353,-0.0800733137829912,0.02392941176470588,-0.17623753665689149,0.01803529411764706,-0.2650029325513196c-0.004741176470588236,-0.08641348973607038,-0.02171176470588235,-0.17882111436950146,-0.035794117647058823,-0.2607390029325513c-0.007629411764705882,-0.055542521994134904,-0.025688235294117647,-0.1297126099706745,0.006752941176470587,-0.16480351906158358l0.00011470588235294118,-0.00011436950146627567l0.000023529411764705884,-0.00002346041055718475z"
                  fill="#CFF0BF"></path>
                <path
                  d="M0.018821235294117646,0.01844991202346041c0.013941176470588236,-0.013926686217008797,0.03671764705882353,-0.019114369501466274,0.06908823529411764,-0.018237536656891498c0.026079411764705886,0.0006686217008797655,0.05835882352941176,0.005211143695014663,0.09620882352941176,0.011504398826979472c0.02975588235294118,0.004935483870967742,0.06295882352941176,0.010929618768328445,0.0987764705882353,0.01669208211143695c0.05195294117647059,0.008439882697947215,0.10844117647058822,0.015932551319648092,0.16270588235294117,0.019c0.15209411764705882,0.010281524926686216,0.2913352941176471,-0.026052785923753666,0.4360764705882353,-0.04493548387096774c0.09942352941176472,-0.010859237536656892,0.12714411764705882,0.015445747800586511,0.1160235294117647,0.11571554252199415c-0.017388235294117645,0.13494428152492668,-0.050311764705882354,0.25958651026392965,-0.04640588235294118,0.40186217008797653c0.001526470588235294,0.06467155425219942,0.010129411764705882,0.13229618768328447,0.020279411764705883,0.194683284457478c0.010264705882352941,0.06545747800586511,0.02603529411764706,0.1373900293255132,0.02825294117647059,0.19484457478005862c0.00044117647058823526,0.04636656891495601,-0.007652941176470588,0.0734574780058651,-0.04728235294117647,0.08390029325513196c-0.02185,0.004865102639296188,-0.046173529411764704,0.0037829912023460413,-0.07086764705882352,0.0011994134897360704c-0.03586176470588235,-0.003873900293255132,-0.07362058823529412,-0.010651026392961878,-0.1104529411764706,-0.01696774193548387c-0.1261970588235294,-0.023102639296187683,-0.2653676470588235,-0.03988856304985337,-0.39845588235294116,-0.02160410557184751c-0.0631,0.007193548387096774,-0.13029117647058824,0.01941348973607038,-0.18860294117647058,0.029258064516129032c-0.06272941176470588,0.008299120234604105,-0.16511176470588235,0.034859237536656894,-0.18027941176470588,-0.03571554252199414c-0.007352941176470588,-0.03439882697947214,-0.0013205882352941177,-0.07243988269794722,0.003838235294117647,-0.10909970674486805c0.006635294117647058,-0.04304398826979473,0.015026470588235294,-0.08763343108504398,0.021964705882352942,-0.13141642228739003c0.01301764705882353,-0.0800733137829912,0.02392941176470588,-0.17623753665689149,0.01803529411764706,-0.2650029325513196c-0.004741176470588236,-0.08641348973607038,-0.02171176470588235,-0.17882111436950146,-0.035794117647058823,-0.2607390029325513c-0.007629411764705882,-0.055542521994134904,-0.025688235294117647,-0.1297126099706745,0.006752941176470587,-0.16480351906158358l0.00011470588235294118,-0.00011436950146627567l0.000023529411764705884,-0.00002346041055718475z"
                  fill="url(#pattern0)"></path>
                <path
                  d="M0.018821235294117646,0.01844991202346041c0.013941176470588236,-0.013926686217008797,0.03671764705882353,-0.019114369501466274,0.06908823529411764,-0.018237536656891498c0.026079411764705886,0.0006686217008797655,0.05835882352941176,0.005211143695014663,0.09620882352941176,0.011504398826979472c0.02975588235294118,0.004935483870967742,0.06295882352941176,0.010929618768328445,0.0987764705882353,0.01669208211143695c0.05195294117647059,0.008439882697947215,0.10844117647058822,0.015932551319648092,0.16270588235294117,0.019c0.15209411764705882,0.010281524926686216,0.2913352941176471,-0.026052785923753666,0.4360764705882353,-0.04493548387096774c0.09942352941176472,-0.010859237536656892,0.12714411764705882,0.015445747800586511,0.1160235294117647,0.11571554252199415c-0.017388235294117645,0.13494428152492668,-0.050311764705882354,0.25958651026392965,-0.04640588235294118,0.40186217008797653c0.001526470588235294,0.06467155425219942,0.010129411764705882,0.13229618768328447,0.020279411764705883,0.194683284457478c0.010264705882352941,0.06545747800586511,0.02603529411764706,0.1373900293255132,0.02825294117647059,0.19484457478005862c0.00044117647058823526,0.04636656891495601,-0.007652941176470588,0.0734574780058651,-0.04728235294117647,0.08390029325513196c-0.02185,0.004865102639296188,-0.046173529411764704,0.0037829912023460413,-0.07086764705882352,0.0011994134897360704c-0.03586176470588235,-0.003873900293255132,-0.07362058823529412,-0.010651026392961878,-0.1104529411764706,-0.01696774193548387c-0.1261970588235294,-0.023102639296187683,-0.2653676470588235,-0.03988856304985337,-0.39845588235294116,-0.02160410557184751c-0.0631,0.007193548387096774,-0.13029117647058824,0.01941348973607038,-0.18860294117647058,0.029258064516129032c-0.06272941176470588,0.008299120234604105,-0.16511176470588235,0.034859237536656894,-0.18027941176470588,-0.03571554252199414c-0.007352941176470588,-0.03439882697947214,-0.0013205882352941177,-0.07243988269794722,0.003838235294117647,-0.10909970674486805c0.006635294117647058,-0.04304398826979473,0.015026470588235294,-0.08763343108504398,0.021964705882352942,-0.13141642228739003c0.01301764705882353,-0.0800733137829912,0.02392941176470588,-0.17623753665689149,0.01803529411764706,-0.2650029325513196c-0.004741176470588236,-0.08641348973607038,-0.02171176470588235,-0.17882111436950146,-0.035794117647058823,-0.2607390029325513c-0.007629411764705882,-0.055542521994134904,-0.025688235294117647,-0.1297126099706745,0.006752941176470587,-0.16480351906158358l0.00011470588235294118,-0.00011436950146627567l0.000023529411764705884,-0.00002346041055718475z"
                  fill="url(#pattern1)"></path>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Swiper from 'swiper';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const swiperEl = ref(null);
let swiperInstance = null;

onMounted(() => {
  swiperInstance = new Swiper(swiperEl.value, {
    modules: [EffectFade, Pagination],
    speed: 300,
    spaceBetween: 20,
    loop: true,
    effect: "fade",
    fadeEffect: { crossFade: true },
    slidesPerView: 1,
    pagination: {
      el: '.image-text-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      },
    }
  });
});

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy();
    swiperInstance = null;
  }
});
</script>

<style scoped>
.image-text-slider {
  position: relative;
}

.image-text-slide {
  display: flex !important;
  justify-content: center;
  gap: 24px;
  box-sizing: border-box !important;
  flex-direction: column-reverse;
}

.image-text-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-text-heading {
  width: 100%;
  max-width: fit-content;
  text-align: center;
}

.image-text-heading * {
  margin: 0;
  font-size: var(--title-size-mobile);
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
  word-break: break-word;
  font-weight: 400;
  font-style: normal;
}

.image-text-text {
  width: 100%;
  max-width: fit-content;
  margin-top: 15px;
  text-align: center;
}

.image-text-text * {
  margin: 0;
  font-size: 16px;
  line-height: 170%;
  color: var(--text-color);
  text-transform: unset;
  word-break: break-word;
  font-weight: 400;
  font-style: normal;
}

.image-text-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  margin-top: 16px;
  font-size: 16px;
  color: var(--btn-color);
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 38px;
  border-radius: var(--btn-border-radius);
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 400;
  font-style: normal;
  z-index: 2;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--btn-background);
}

.image-text-button:hover {
  color: var(--btn-color-hover);
  background-color: var(--btn-background-hover);
  transition: all 0.25s ease 0s;
}

.image-text-image {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 12/12;
}

.image-text-image img,
.image-text-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-text-image svg {
  background-color: #AFAFAF;
}

.clip {
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  background-color: transparent !important;
}

.image-text-pagination-wrapper {
  margin-bottom: 20px;
  width: 100%;
}

.image-text-pagination-text {
  margin: 0px;
  margin-bottom: 5px;
  font-size: 16px;
  color: var(--subtitle-color);
  line-height: 130%;
  text-transform: unset;
  text-align: center;
  font-weight: 400;
  font-style: normal;
}

.image-text-pagination {
  position: static !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center;
  gap: 10px;
}

.image-text-pagination :deep(.swiper-pagination-bullet) {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 32px;
  flex-shrink: 0;
  height: 32px;
  border-radius: 50%;
  background-color: var(--pagination-background);
  border: 1px solid var(--pagination-color);
  transition: all 0.25s ease 0s;
  color: var(--pagination-color);
  font-size: 13px;
  opacity: 1;
  margin: 0px;
}

.image-text-pagination :deep(.swiper-pagination-bullet:hover) {
  background-color: var(--pagination-background-hover) !important;
  border: 1px solid var(--pagination-background-hover) !important;
  color: var(--pagination-color-hover) !important;
  transform: scale(0.95);
}

.image-text-pagination :deep(.swiper-pagination-bullet-active) {
  background-color: var(--pagination-background-hover) !important;
  border: 1px solid var(--pagination-background-hover) !important;
  color: var(--pagination-color-hover) !important;
}

@media(min-width: 1024px) {
  .image-text-slide {
    gap: 70px;
    align-items: center;
    flex-direction: row-reverse;
  }

  .image-text-content {
    margin: 0px;
    padding-top: calc(10% + 0px);
    max-width: 50%;
    align-items: start;
  }

  .image-text-heading {
    text-align: left;
  }
  
  .image-text-heading * {
    font-size: var(--title-size-desktop);
  }

  .image-text-text {
    margin-top: 20px;
    text-align: left;
  }

  .image-text-text * {
    font-size: 16px;
  }

  .image-text-button {
    margin-top: 16px;
    max-width: fit-content;
    padding: 16px 38px;
    font-size: 17px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .image-text-image {
    max-width: 50%;
  }

  .image-text-pagination-wrapper {
    margin: 0px;
    position: absolute !important;
    bottom: unset !important;
    top: 5% !important;
    z-index: 2;
    max-width: calc(50% - 35px);
    left: unset !important;
    right: 0 !important;
  }

  .image-text-pagination {
    justify-content: start !important;
  } 

  .image-text-pagination :deep(.swiper-pagination-bullet) {
    font-size: 13px;
  }

  .image-text-pagination-text {
    text-align: left;
    font-size: 16px;
  }

  @media(min-width: 1200px) {
    .image-text-content {
      padding-top: calc(5% + 0px);
    }
  }

  @media(min-width: 1500px) {
    .image-text-content {
      padding-top: 0px;
    }
  }
}
</style>