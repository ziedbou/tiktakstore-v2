<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const data = ref({
  values: {
    children: [
      {
       // before_image: { image: '/img/before1.jpg' },
        //after_image: { image: '/img/after1.jpg' },
        after_arrow_text: 'Après',
        before_arrow_text: 'Avant',
        title: 'Titre 1',
        stars: 4,
        text: 'Description exemple'
      },
      // Ajoute ici les autres objets...
    ],
    stars_color: '#FFD700'
  }
})

const activeSlide = ref(1)
</script>

<template>
  <div class="before-after-body-template mx-auto">
    <div class="before-after-images-template">
      <div
        v-for="(child, index) in data.values.children"
        :key="index"
        :class="['before-after-item-template', { active: index === 0 }]"
        :data-id="'slide_' + (index + 1)"
      >
        <!-- Left Section -->
        <div class="before-after-left-template">
          <div class="before-after-left-image-template">
          </div>
          <div class="before-after-text-wrapper-template">
            <p class="before-after-text-template">{{ child.after_arrow_text }}</p>
            <!-- Arrow SVG here -->
          </div>
        </div>

        <!-- Right Section -->
        <div class="before-after-right-template">
          <div class="before-after-text-wrapper-template">
            <!-- Arrow SVG here -->
            <p class="before-after-text-template">{{ child.before_arrow_text }}</p>
          </div>
          <div class="before-after-right-image-template">
          </div>
        </div>
      </div>
    </div>

    <!-- SLIDER Swiper -->
    <div class="before-after-slider-wrapper-template">
      <div class="before-after-slider-inner-template">
        <Swiper
          class="before-after-slider-template swiper"
          :slides-per-view="1"
          :navigation="{
            nextEl: '.before-after-btn-next-template',
            prevEl: '.before-after-btn-prev-template'
          }"
          :pagination="{
            el: '.before-after-pagination-template',
            clickable: true,
            type: 'custom',
            renderCustom: (swiper, current, total) => {
              activeSlide.value = current
              return `<p class='before-after-current-template'>${current}</p> / <p class='before-after-all-template'>${total}</p>`
            }
          }"
        >
          <SwiperSlide
            v-for="(child, index) in data.values.children"
            :key="index"
            class="before-after-slide-template swiper-slide"
            :id="'slide_' + (index + 1)"
          >
            <div class="before-after-slide-heading-template">
              <h3>{{ child.title }}</h3>
            </div>
            <div class="d-flex align-items-center mt-2">
              <div class="before-after-stars-template position-relative mr-4">
                <div class="stars-template d-flex align-items-center position-absolute justify-content-between">
                  <svg
                    v-for="i in 5"
                    :key="'empty-' + i"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 19"
                    width="20"
                    height="19"
                  >
                    <path
                      d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                      :stroke="data.values.stars_color"
                    />
                  </svg>
                </div>
                <div class="overflow-hidden position-relative" :style="{ width: `calc(20% * ${child.stars})`, height: '30px' }">
                  <div class="stars-template d-flex align-items-center position-absolute justify-content-between">
                    <svg
                      v-for="i in 5"
                      :key="'full-' + i"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 19"
                      width="20"
                      height="19"
                    >
                      <path
                        d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                        :fill="data.values.stars_color"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <p class="mb-2" style="font-size: 23px;"><strong>{{ child.stars }}</strong></p>
            </div>
            <div class="before-after-slide-text-template">
              <p>{{ child.text }}</p>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Navigation -->
        <div class="before-after-navigation-template">
          <button class="before-after-btn-prev-template">
            <!-- SVG Left -->
          </button>
          <div class="before-after-pagination-template"></div>
          <button class="before-after-btn-next-template">
            <!-- SVG Right -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  :root {
    --arrow-color: #000000;
    --before-arrow-color: #000000;
  }

  .before-after-left-template .before-after-text-template {
    color: var(--arrow-color);
  }

  .before-after-right-template .before-after-text-template {
    color: var(--before-arrow-color);
  }

  .before-after-left-template .before-after-arrow-template svg path {
    fill: var(--arrow-color) !important;
  }

  .before-after-right-template .before-after-arrow-template svg path {
    fill: var(--before-arrow-color) !important;
  }


  .before-after-right-image-template {
    margin-top: 60px;
  }

  .before-after-slide-heading-template {
    text-align: left;
  }

  .before-after-slide-heading-template * {
    margin: 0;
    font-size: 28px;
    color: #121212;
    line-height: 130%;
    text-transform: unset;
  }

  .before-after-stars-template {
    width: 175px;
    height: 40px;
  }

  .before-after-stars-template svg,
  .before-after-stars-template img {
    display: block;
    width: 30px;
    height: 30px;
    object-fit: cover;
  }

  .before-after-slide-text-template {
    margin-top: 17px;
    text-align: left;
  }
  .before-after-stars-template .stars-template--2111{
    gap:5px;right:0px;left:0px;width:175px
  }
  .before-after-slide-text-template * {
    margin: 0;
    font-size: 16px;
    color: #121212;
    line-height: 150%;
    text-transform: unset;
  }

  .before-after-navigation-template {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    justify-content: center;
  }

  .before-after-btn-prev-template,
  .before-after-btn-next-template {
    position: static !important;
    flex: 0 0 50px;
    background: transparent;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    -webkit-appearance: none;
    border: 0px;
    box-shadow: none;
    padding: 0px;
  }

  .before-after-btn-prev-template svg,
  .before-after-btn-next-template svg,
  .before-after-btn-prev-template img,
  .before-after-btn-next-template img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .before-after-btn-prev-template svg path,
  .before-after-btn-next-template svg path {
    fill: #000000;
    transition: all 0.3s ease 0s;
  }

  .before-after-btn-prev-template:hover svg path,
  .before-after-btn-next-template:hover svg path {
    fill: #000000;
    transition: all 0.3s ease 0s;
  }

  .before-after-btn-prev-template.swiper-button-disabled,
  .before-after-btn-next-template.swiper-button-disabled {
    opacity: 0.3;
  }

  .before-after-pagination-template {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .before-after-pagination-template,
  .before-after-pagination-template * {
    margin: 0;
    font-size: 14px;
    color: #000000;
    line-height: 130%;
    text-transform: unset;
    font-weight: 700;
  }

  .before-after-slider-wrapper-template {
    display: grid;
  }

  .before-after-slider-inner-template {
    min-width: 0px;
  }
  
  @media(min-width: 1024px) {

    .section-template {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .before-after-heading-template {
      text-align: center;
    }

    .before-after-heading-template * {
      font-size: 46px;
    }

    .before-after-body-template {
      margin-top: 0px;
      grid-template-columns: repeat(2, 1fr);
      gap: 100px;
    }

    .before-after-images-template {
      padding: 0px;
    }

    .before-after-left-image-template,
    .before-after-right-image-template {
      padding: 0px;
    }

    .before-after-left-template .before-after-text-wrapper-template {
      transform: translateX(-0px);
    }

    .before-after-text-template {
      font-size: 25px;
    }

    .before-after-slide-heading-template {
      text-align: left;
    }

    .before-after-slide-heading-template * {
      font-size: 42px;
    }

    .before-after-stars-template {
      justify-content: start;
    }

    .before-after-slide-text-template {
      margin-top: 22px;
      text-align: left;
    }

    .before-after-slide-text-template * {
      font-size: 18px;
    }

    .before-after-navigation-template {
      margin-top: 30px;
      justify-content: start;
      gap: 10px;
    }

    .before-after-btn-prev-template,
    .before-after-btn-next-template {
      flex: 0 0 50px;
    }

    .before-after-pagination-template,
    .before-after-pagination-template * {
      font-size: 14px;
    }

    .before-after-arrow-template {
      flex: 0 0 90px;
    }
    
  }

    .before-after-left-image-template,
    .before-after-right-image-template {
     aspect-ratio: 9.6/12; 
    }
  

    @media(min-width: 1024px) {
     .before-after-left-image-template,
      .before-after-right-image-template {
       aspect-ratio: 9.6/12; 
      } 
    }
  

    .before-after-btn-prev-template,
    .before-after-btn-next-template {
      display: flex;
    }
  

    @media(min-width: 1024px) {
      .before-after-btn-prev-template,
      .before-after-btn-next-template {
        display: flex;
      }
    }
  

    .before-after-left-image-template,
    .before-after-right-image-template {
      box-shadow: 0 4px 9px #00000040;
    }
  

    .before-after-slider-inner-template {
      order: 2;
    }

    .before-after-navigation-template {
      order: 1;
      margin-top: 0px;
      margin-bottom: 20px;
    }

    @media(min-width: 1024px) {
      .before-after-slider-inner-template {
        order: 1;
      }
  
      .before-after-navigation-template {
        order: 2;
        margin-top: 30px;
        margin-bottom: 0px;
      }
    }
  </style>
