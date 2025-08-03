<template>
  <div 
    class="premium-collection-list"
    :style="{
      '--border-top-width': data.values.border_top_width + 'px',
      '--border-bottom-width': data.values.border_bottom_width + 'px',
      '--border-color': data.values.border_color,
      '--margin-top': data.values.margin_top + 'px',
      '--margin-bottom': data.values.margin_bottom + 'px',
      '--margin-left': data.values.margin_left + 'rem',
      '--margin-right': data.values.margin_right + 'rem',
      '--border-radius': data.values.border_radius + 'px',
      '--item-border-width': data.values.item_border_width + 'px',
      '--item-border-color': data.values.item_border_color,
      '--item-border-radius': data.values.item_border_radius + 'px',
      '--content-border-width': data.values.content_border_width + 'px',
      '--content-border-color': data.values.content_border_color,
      '--content-border-radius': data.values.content_border_radius + 'px',
      '--content-background': data.values.content_background,
      '--tag-background': data.values.tag_background,
      '--tag-color': data.values.tag_color,
      '--title-color': data.values.title_color,
      '--item-padding': data.values.item_padding + 'px',
      '--content-padding': data.values.content_padding + 'px'
    }"
  >
    <div class="premium-collection-list__settings">
      <!-- Mobile layout (1 column) -->
      <div class="premium-collection-list__body-mobile">   
        <a 
          v-for="(child, index) in data.values.children" 
          :key="`mobile-${index}`" 
          :href="child.link"
        >
          <div class="premium-collection-list__item">
            <div class="premium-collection-list__image">
              <img 
                :src="imghttps(child.image.image)" 
                :alt="child.title" 
              >                        
            </div>
            <div class="premium-collection-list__content">
              <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
              <div class="premium-collection-list__heading">
                <p><strong>{{ child.title }}</strong></p>
              </div>    
            </div>
          </div>
        </a>
      </div>

      <!-- Tablet layout (2 columns) -->
      <div class="premium-collection-list__body-tablet">
        <div class="premium-collection-list__column">
          <a 
            v-for="(child, index) in divideIntoColumns(data.values.children, 0, 2)" 
            :key="`tablet-1-${index}`" 
            :href="child.link"
          >
            <div class="premium-collection-list__item">
              <div class="premium-collection-list__image">
                <img 
                  :src="imghttps(child.image.image)" 
                  :alt="child.title" 
                >
              </div>
              <div class="premium-collection-list__content">
                <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
                <div class="premium-collection-list__heading">
                  <p><strong>{{ child.title }}</strong></p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="premium-collection-list__column">
          <a 
            v-for="(child, index) in divideIntoColumns(data.values.children, 1, 2)" 
            :key="`tablet-2-${index}`" 
            :href="child.link"
          >
            <div class="premium-collection-list__item">
              <div class="premium-collection-list__image">
                <img 
                  :src="imghttps(child.image.image)" 
                  :alt="child.title" 
                >
              </div>
              <div class="premium-collection-list__content">
                <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
                <div class="premium-collection-list__heading">
                  <h2>{{ child.title }}</h2>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Desktop layout (3 columns) -->
      <div class="premium-collection-list__body">
        <div class="premium-collection-list__column">
          <a 
            v-for="(child, index) in divideIntoColumns(data.values.children, 0, 3)" 
            :key="`desktop-1-${index}`" 
            :href="child.link"
          >
            <div class="premium-collection-list__item">
              <div class="premium-collection-list__image">
                <img
                  :src="imghttps(child.image.image)" 
                  :alt="child.title" 
                >
              </div>
              <div class="premium-collection-list__content">
                <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
                <div class="premium-collection-list__heading">
                  <p><strong>{{ child.title }}</strong></p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="premium-collection-list__column">
          <a 
            v-for="(child, index) in divideIntoColumns(data.values.children, 1, 3)" 
            :key="`desktop-2-${index}`" 
            :href="child.link"
          >
            <div class="premium-collection-list__item">
              <div class="premium-collection-list__image">
                <img 
                  :src="imghttps(child.image.image)" 
                  :alt="child.title" 
                >
              </div>
              <div class="premium-collection-list__content">
                <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
                <div class="premium-collection-list__heading">
                  <h2>{{ child.title }}</h2>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="premium-collection-list__column">
          <a 
            v-for="(child, index) in divideIntoColumns(data.values.children, 2, 3)" 
            :key="`desktop-3-${index}`" 
            :href="child.link"
          >
            <div class="premium-collection-list__item">
              <div class="premium-collection-list__image">  
                <img 
                  :src="imghttps(child.image.image)" 
                  :alt="child.title"
                >
              </div>
              <div class="premium-collection-list__content">
                <p class="premium-collection-list__tag">{{ child.sub_title }}</p>
                <div class="premium-collection-list__heading">
                  <h2>{{ child.title }}</h2>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imghttps } from '~/composables/services/helpers';

defineProps({
  data: {
    type: Object,
    required: true
  }
});

function divideIntoColumns(items, columnIndex, totalColumns) {
  if (!items) return [];
  
  // Filter items that belong to the specified column
  return items.filter((_, index) => index % totalColumns === columnIndex);
}
</script>

<style>
.premium-collection-list {
  --border-top-width: 0px;
  --border-bottom-width: 0px;
  --border-color: #000000;
  --margin-top: 0px;
  --margin-bottom: 0px;
  --margin-left: 0rem;
  --margin-right: 0rem;
  --border-radius: 0px;
  --item-border-width: 0px;
  --item-border-color: #000000;
  --item-border-radius: 8px;
  --content-border-width: 0px;
  --content-border-color: #000000;
  --content-border-radius: 8px;
  --content-background: #ffffff;
  --tag-background: #f4eee6;
  --tag-color: #000000;
  --title-color: #000000;
  --item-padding: 16px;
  --content-padding: 16px;

  border-top: solid var(--border-color) var(--border-top-width);
  border-bottom: solid var(--border-color) var(--border-bottom-width);
  margin-top: var(--margin-top);
  margin-bottom: var(--margin-bottom);
  margin-left: var(--margin-left);
  margin-right: var(--margin-right);
  border-radius: var(--border-radius);
}

.premium-collection-list__settings {
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  max-width: 120rem;
}

.premium-collection-list__body-mobile {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.premium-collection-list__body {
  display: none;
}

.premium-collection-list__body-tablet {
  display: none;
}

.premium-collection-list__item {
  padding: var(--item-padding);
  border: var(--item-border-width) solid var(--item-border-color);
  border-radius: var(--item-border-radius);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: end;
  aspect-ratio: 9.6/12; 
  text-decoration: none;
}

.premium-collection-list__body-mobile .premium-collection-list__item:nth-child(even) {
  aspect-ratio: 9.6/15; 
}

.premium-collection-list__body-tablet .premium-collection-list__column:last-child .premium-collection-list__item:nth-child(odd) {
  aspect-ratio: 9.6/15; 
}

.premium-collection-list__body .premium-collection-list__column:first-child .premium-collection-list__item:nth-child(even),
.premium-collection-list__body .premium-collection-list__column:last-child .premium-collection-list__item:nth-child(even) {
   aspect-ratio: 9.6/15; 
}

.premium-collection-list__body .premium-collection-list__column:nth-child(2) .premium-collection-list__item:nth-child(odd) {
   aspect-ratio: 9.6/15; 
}

.premium-collection-list__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.premium-collection-list__image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0,0,0,0);
}

.premium-collection-list__image img,
.premium-collection-list__image svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-collection-list__image svg {
  background-color: #AFAFAF;
}

.premium-collection-list__content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: var(--content-padding);
  border: var(--content-border-width) solid var(--content-border-color);
  border-radius: var(--content-border-radius);
  background-color: var(--content-background);
  display: flex;
  flex-direction: column;
  align-items: start;
}

.premium-collection-list__tag {
  width: 100%;
  max-width: fit-content;
  margin: 0px;
  padding: 6px 6px;
  border-radius: 8px;
  background-color: var(--tag-background);
  font-size: 12px;
  color: var(--tag-color);
  line-height: 100%;
  text-transform: unset;
}

.premium-collection-list__heading {
  text-align: left;
  margin-top: 9px;
}

.premium-collection-list__heading * {
  margin: 0;
  font-size: 18px;
  color: var(--title-color);
  line-height: 130%;
  text-transform: unset;
}

.premium-collection-list__column {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media(min-width: 768px) {
  .premium-collection-list__body-tablet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: start;
  }

  .premium-collection-list__body-mobile {
    display: none;
  }
}

@media(min-width: 1024px) {
  .premium-collection-list__body-tablet {
    gap: 40px;
  }

  .premium-collection-list {
    margin-top: var(--margin-top);
    margin-bottom: var(--margin-bottom);
    margin-left: var(--margin-left);
    margin-right: var(--margin-right);
    border-radius: var(--border-radius);
  }
  
  .premium-collection-list__settings {
    padding: 0 5rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }

  .premium-collection-list__body-tablet {
    display: none;
  }
  
  .premium-collection-list__body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
    align-items: start;
  }

  .premium-collection-list__item {
    padding: var(--item-padding);
    justify-content: end;
  }

  .premium-collection-list__content {
    padding: var(--content-padding);
    align-items: start;
  }

  .premium-collection-list__tag {
    font-size: 12px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .premium-collection-list__heading {
    text-align: left;
    margin-top: 12px;
  }

  .premium-collection-list__heading * {
    font-size: 20px;
  }

  .premium-collection-list__column {
    gap: 40px;
  }
}
</style>
