<template>
	<div class="container mx-auto px-4">
  <div class="default-container section-feature">
    <div class="section-feature-settings">
      <div class="feature-body">
        <div class="feature-image mx-auto">
          <img 
            :alt="data.values.image.alt || ''" 
            loading="lazy"
            :src="imghttps(data.values.image.image)" 
          />
        </div>
        <div class="feature-content">
          <div class="feature-text">
            <p>{{ data.values.title }}</p>
          </div>
          <div class="feature-items">
            <div 
              v-for="(child, index) in data.values.children" 
              :key="index" 
              class="feature-item"
            >
              <div class="feature-icon">
                <img 
                  :alt="child.icon.alt || ''" 
                  loading="lazy"
                  :src="imghttps(child.icon.image)" 
                />
              </div>
              <div class="feature-heading">
                <p>{{ child.text }}</p>
              </div>
            </div>
          </div>
          <a 
            class="feature-button" 
            :href="data.values.link"
          >
            <span>{{ data.values.link_text }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { imghttps } from '~/composables/services/helpers';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.section-feature {
  border-top: solid #262425 0px;
  border-bottom: solid #262425 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 0rem;
  margin-right: 0rem;
  border-radius: 0px;
  overflow: hidden;
}

.feature-body {
  display: grid;
  gap: 40px;
}

.feature-image {
  border-radius: v-bind('data.values.image_border_radius + "px"');
  overflow: hidden;
  position: relative;
  max-height: 800px;
  aspect-ratio: 9.6/12;
  order: 1;
}

.feature-image img,
.feature-image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: none;
  border: 0px;
}

.feature-image svg {
  background-color: #AFAFAF;
}

.feature-content {
  display: flex;
  flex-direction: column;
  align-items: start;
  order: 2;
}

.feature-text {
  text-align: left;
}

.feature-text * {
  margin: 0;
  font-size: v-bind('data.values.title_size_mobile + "px"');
  color: v-bind('data.values.title_color');
  line-height: 150%;
  text-transform: unset;
  font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.feature-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: fit-content;
  margin: 0;
  margin-top: 48px;
  font-size: 16px;
  color: v-bind('data.values.link_color');
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 12px 32px;
  border-radius: 10px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  box-sizing: border-box;
  font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
  font-weight: 400;
  font-style: normal;
  background-color: v-bind('data.values.link_background');
  border: 1px solid v-bind('data.values.link_color');
}

.feature-button svg {
  background: transparent;
  width: 14px;
  height: 14px;
}

.feature-button svg path {
  fill: #262425;
  transition: all 0.25s ease 0s;
}

.feature-button:hover {
  color: v-bind('data.values.link_color_hover');
  background-color: v-bind('data.values.link_background_hover');
  border: 1px solid v-bind('data.values.link_background_hover');
  transition: all 0.25s ease 0s;
}

.feature-button:hover svg path {
  fill: v-bind('data.values.link_color_hover');
  transition: all 0.25s ease 0s;
}

.feature-items {
  max-width: fit-content;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.feature-icon {
  max-width: 40px;
}

.feature-icon img,
.feature-icon svg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.feature-icon svg path {
  fill: #262425;
}

.feature-heading {
  text-align: center;
  margin-top: 12px;
}

.feature-heading * {
  margin: 0;
  font-size: 10px;
  color: v-bind('data.values.icon_color');
  line-height: 130%;
  text-transform: unset;
  word-wrap: break-word;
  word-break: break-word;
  font-family: Helvetica, 'Helvetica Neue', Arial, 'Lucida Grande', sans-serif;
  font-weight: 400;
  font-style: normal;
}

@media(min-width: 1024px) {
  .section-feature {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0rem;
    margin-right: 0rem;
    border-radius: 0px;
  }

  .feature-body {
    grid-template-columns: 1fr 1fr;
    gap: 90px;
    align-items: center;
  }

  .feature-content {
    align-items: start;
    order: 2;
  }

  .feature-text {
    text-align: left;
  }

  .feature-text * {
    font-size: v-bind('data.values.title_size_desktop + "px"');
  }

  .feature-button {
    margin-top: 36px;
    padding: 12px 32px;
    font-size: 16px;
  }

  .feature-items {
    margin-top: 36px;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  .feature-icon {
    max-width: 50px;
  }

  .feature-heading {
    margin-top: 16px;
    text-align: center;
  }

  .feature-heading * {
    font-size: 13px;
  }
  
  .feature-image {
    order: 1;
    aspect-ratio: 9.6/12;
  }
}
</style>