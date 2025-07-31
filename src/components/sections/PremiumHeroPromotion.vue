<template>
    <div 
      :class="[{'no-padding': data.design.container === 'container-fluid'}]" 
      :style="{
        '--background-1': data.values.background_1,
        '--background-2': data.values.background_2,
        '--btn-background': data.values.btn_background || '#ffe658',
        '--btn-background-hover': data.values.btn_background_hover || '#f9e368'
      }"
    >
      <div class="featured-product" style="background-image: radial-gradient(var(--background-1) 15%, var(--background-2));">
        <div class="section-settings">
          <div class="featured-product-body">
            <div class="featured-product-content">
              <div class="featured-product-review">
                <div class="featured-product-stars">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#ffb800"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#ffb800"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#ffb800"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#ffb800"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                    <path d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z" fill="#ffb800"></path>
                  </svg>
                </div>
                <div class="featured-product-review-text">{{ data.values.reviews }}</div>
              </div>
              <div class="featured-product-heading">
                <h1 v-html="data.values.title"></h1>
              </div>
              <div class="featured-product-feature-body">
                <div class="featured-product-feature">
                  <div class="featured-product-feature-icon">
                    <img src="https://section.store/cdn/shop/files/check_ad881f65-d879-4f7d-916a-238f98879843.svg?v=1728427693" alt="">
                  </div>
                  <p class="featured-product-feature-text">{{ data.values.feature_1 }}</p>
                </div>
                <div class="featured-product-feature">
                  <div class="featured-product-feature-icon">
                    <img src="https://section.store/cdn/shop/files/check_ad881f65-d879-4f7d-916a-238f98879843.svg?v=1728427693" alt="">
                  </div>
                  <p class="featured-product-feature-text">{{ data.values.feature_2 }}</p>
                </div>
                <div class="featured-product-feature">
                  <div class="featured-product-feature-icon">
                    <img src="https://section.store/cdn/shop/files/check_ad881f65-d879-4f7d-916a-238f98879843.svg?v=1728427693" alt="">
                  </div>
                  <p class="featured-product-feature-text">{{ data.values.feature_3 }}</p>
                </div>
              </div>
              <p class="featured-product-text" v-html="data.values.description"></p>
              <a :href="data.values.link" class="featured-product-button">
                <p class="featured-product-button-inner">
                  <span>
                    <strong>{{ data.values.btn_text1 }}</strong>
                    <br>
                    <span class="featured-product-button-second">{{ data.values.btn_text2 }}</span>
                  </span>
                  <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M187.827 98.7858C188.123 98.4749 188.123 98.4749 188.123 98.1761C188.419 97.8652 188.419 97.5663 188.704 97.5663C189 96.9566 189 96.6458 189 96.0361C189 95.4263 189 94.8166 188.704 94.5058C188.704 94.195 188.408 93.8961 188.123 93.5852C188.123 93.2744 187.827 93.2744 187.827 92.9755L103.287 4.21945C102.41 3.29889 101.533 3 100.668 3C99.791 3 98.6295 3.31083 98.0488 4.21945C97.1719 5.14 96.8872 6.06058 96.8872 6.96919C96.8872 7.88974 97.1833 9.10918 98.0488 9.7189L175.587 92.0539H6.79206C4.75371 92.0539 3 93.895 3 96.0351C3 98.1751 4.75365 100.016 6.79206 100.016H175.575L97.7543 182.042C96.2967 183.572 96.2967 186.322 97.7543 187.852C99.2119 189.383 101.831 189.383 103.288 187.852L187.827 98.7858Z" fill="black"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M188.607 97.5657C188.432 97.5657 188.365 97.6788 188.27 97.8382C188.211 97.9378 188.141 98.0554 188.027 98.1748C188.027 98.4734 188.027 98.4734 187.731 98.7839L103.281 187.759C101.825 189.287 99.2085 189.287 97.7524 187.759C96.2963 186.23 96.2963 183.483 97.7524 181.954L175.492 100.013L6.88489 100.013C4.8486 100.013 3.09677 98.1739 3.09677 96.036C3.09677 93.8982 4.84866 92.059 6.88489 92.059L175.504 92.059L98.0465 9.80878C97.182 9.19968 96.8862 7.9815 96.8862 7.0619C96.8862 6.15422 97.1706 5.2346 98.0465 4.315C98.6267 3.40732 99.787 3.0968 100.663 3.0968C101.527 3.0968 102.403 3.39539 103.279 4.315L187.731 92.9796C187.731 93.1274 187.804 93.2021 187.877 93.2774C187.952 93.3543 188.027 93.4319 188.027 93.5887C188.046 93.6098 188.066 93.6308 188.085 93.6518C188.338 93.9267 188.584 94.1935 188.606 94.4689C188.607 94.482 188.607 94.4951 188.607 94.5083C188.903 94.8188 188.903 95.4279 188.903 96.037C188.903 96.6461 188.903 96.9566 188.607 97.5657ZM191.489 93.2767C191.79 93.8661 191.89 94.4204 191.934 94.7363C192.001 95.2226 192 95.7194 192 95.9856L192 96.037C192 96.0544 192 96.0729 192 96.0926C192 96.3523 192.001 96.8096 191.924 97.2931C191.828 97.8884 191.64 98.41 191.393 98.9184L190.546 100.663H190.212C190.127 100.759 190.038 100.852 189.988 100.905L189.974 100.92L105.527 189.891C102.85 192.701 98.1865 192.704 95.51 189.895C94.1476 188.464 93.5636 186.587 93.5636 184.857C93.5636 183.128 94.1468 181.252 95.5071 179.822M191.489 93.2767C191.316 92.7908 191.078 92.4357 190.938 92.2406C190.903 92.1912 190.866 92.142 190.828 92.0939V91.7408L105.522 2.17912C104.076 0.661813 102.397 0 100.663 0C99.3914 0 97.0569 0.401401 95.6212 2.37737C94.3151 3.83819 93.7895 5.45521 93.7895 7.0619C93.7895 8.26663 94.1183 10.6061 95.9608 12.111L168.333 88.9622L6.88489 88.9622C2.9981 88.9622 0 92.3316 0 96.036C0 99.7405 2.99801 103.11 6.88489 103.11L168.285 103.11" fill="black"></path>
                    <path d="M169.5 104L16.5 102.5V90H171L97.5 10.5V7L107.5 4.5C131.167 29.6667 180.2 81.5 187 87.5C193.8 93.5 191.5 99 189.5 101L105.5 184L94 181.5L169.5 104Z" fill="black"></path>
                  </svg>
                </p>
              </a>
            </div>
            <div class="featured-product-image-wrapper">
              <div class="featured-product-image">
                <img :src="data.values.image.image" :alt="data.values.title">
              </div>
              <div class="featured-product-tag-body">
                <div class="featured-product-tag">
                  <p class="featured-product-tag-text" v-html="data.values.image_text"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  
  .section-settings {
    margin: 0 auto;
    padding-top: 42px;
    padding-bottom: 54px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: 1200px;
  }
  
  .featured-product-body {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "content" 
      "image";
  }
  
  .featured-product-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-area: content;
  }
  
  .featured-product-image-wrapper {
    grid-area: image;
    position: relative;
  }
  
  .featured-product-image {
    text-decoration: none;
    box-sizing: border-box !important;
    border-radius: 8px;    
    overflow: hidden;
    aspect-ratio: 12/12;
  }
  
  .featured-product-image img,
  .featured-product-image svg {
    display: block;    
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .featured-product-image svg {
    background-color: #AFAFAF;    
  }
  
  .featured-product-feature-body {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
        
  .featured-product-feature {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    text-decoration: none;
  }
  
  .featured-product-feature:not(:last-child) {
    border-right: 1px solid #93988e;
    padding-right: 10px;
  }
  
  .featured-product-feature-text {
    margin: 0;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 100%;
    text-transform: unset;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    font-style: normal;
  }
  
  .featured-product-feature-icon {
    height: 18px;
    width: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .featured-product-feature-icon img,
  .featured-product-feature-icon svg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: content;
  }
  
  .featured-product-feature-icon svg {
    background: none;
  }
  
  .featured-product-feature-icon svg path {
    fill: #248b4b;
  } 
  
  .featured-product-review {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 0px;
  }
  
  .featured-product-review-text {
    word-wrap: break-word;
    margin: 0;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 130%;
    text-transform: unset;
  }
  
  .featured-product-stars {
    display: flex;
    align-items: center;
    gap: 1px;
    max-width: fit-content;
  }
  
  .featured-product-stars svg,
  .featured-product-stars img {
    display: block;
    width: 18px;
    height: 18px;
    object-fit: cover;
  }
  
  .featured-product-heading {
    margin-top: 12px;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  
  .featured-product-heading * {
    margin: 0;
    font-size: 28px;
    color: #1a1a1a;
    line-height: 130%;
    text-transform: unset;
  }
  
  .featured-product-heading * strong {
    color: #3b8247;
  }
  
  .featured-product-text {
    margin: 0;
    margin-top: 12px;
    text-align: center;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 170%;
    text-transform: unset;
    position: relative;
    z-index: 2;
  }
  
  .featured-product-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    margin: 0;
    margin-top: 20px;
    font-size: 16px;
    color: #1a1a1a;
    line-height: 100%;
    text-align: center;
    text-transform: unset;
    text-decoration: none;
    padding: 20px 48px;
    border-radius: 8px;
    transition: all 0.3s ease 0s;
    background-color: var(--btn-background);
    border: 0px;
    cursor: pointer;
    font-weight: 700;
  }
  
  .featured-product-button-inner {
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-decoration: none;
  }
  
  .featured-product-button:hover {
    color: #1a1a1a;
    transition: all 0.25s ease 0s;
    background-color: var(--btn-background-hover);
  }
  
  .featured-product-button svg {
    width: 14px;
    height: 14px;
  }
  
  .featured-product-button svg path {
    fill: #1a1a1a;
    transition: all 0.25s ease 0s;
  }
  
  .featured-product-button:hover svg path {
    fill: #1a1a1a;
    transition: all 0.25s ease 0s;
  }
  
  .featured-product-button-second {
    display: block;
    margin-top: 10px;
    font-size: 12.8px;
  }
  
  .featured-product-tag-body {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -20.5px;
  }
  
  .featured-product-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0px;
    text-decoration: none;
    background-color: #ffffff;
    padding: 10px 20px;
    border-radius: 0px;
    border: 1px dashed #7c0a0a;
    box-shadow: 0px 12px 14px 0px rgba(0,0,0,0.2);
    -webkit-box-shadow: 0px 12px 14px 0px rgba(0,0,0,0.2);
  }
  
  .featured-product-tag-text {
    margin: 0;
    font-size: 16px;
    color: #7c0a0a;
    line-height: 100%;
    text-transform: unset;
  }
  
  @media(min-width: 768px) {
    .featured-product-button {
      max-width: fit-content;
    }
  }
  
  @media(min-width: 1024px) {
    
    .section-settings {
      padding: 0 5rem;
      padding-top: 56px;
      padding-bottom: 72px;
      padding-left: 5rem;
      padding-right: 5rem;
    }
  
    .featured-product-body {
      gap: 50px;
      width: auto;
      grid-template-columns: 50% 1fr;
      grid-template-areas: "image content";
    }
  
    .featured-product-content {
      justify-content: center;
      align-items: start;
    }   
    
    .featured-product-feature-body {
      gap: 10px;
      margin-top: 20px;
      justify-content: start;
    }
  
    .featured-product-feature:not(:last-child) {
      padding-right: 10px;
    }
  
    .featured-product-feature {
      gap: 6px;
    }
  
    .featured-product-feature-icon {
      height: 18px;
      width: 18px;
    }
  
    .featured-product-feature-text {
      font-size: 18px;
    }
  
    .featured-product-review {
      margin-top: 0px;
      justify-content: start;
    }
  
    .featured-product-review-text {
      font-size: 16px;
    }
  
    .featured-product-stars svg,
    .featured-product-stars img {
      width: 18px;
      height: 18px;
    }
  
    .featured-product-heading {
      margin-top: 12px;
      text-align: start;
    }
  
    .featured-product-heading * {
      font-size: 44px;
    }
  
    .featured-product-text {
      margin-top: 20px;
      text-align: start;
      font-size: 18px;
    }
  
    .featured-product-button {
      margin-top: 32px;
      padding: 20px 48px;
      font-size: 16px;
    }
  
    .featured-product-button-second {
      font-size: 12.8px;
    }
  
    .featured-product-image {
      aspect-ratio: 12/12;
    }
  
    .featured-product-tag {
      gap: 10px;
      padding: 10px 20px;
    }
  
    .featured-product-tag-text {
      font-size: 16px;
    }
  }
  </style> 