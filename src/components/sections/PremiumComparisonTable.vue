<template>
  <div
    class="premium-comparison"
    :style="{
      '--section-bg': data.values.section_bg,
      '--title-color': data.values.title_color,
      '--description-color': data.values.description_color,
      '--list-color': data.values.list_color,
      '--table-bg': data.values.table_bg,
      '--other-column-bg': data.values.other_column_bg,
      '--first-column-text-color': data.values.first_column_text_color,
      '--other-column-text-color': data.values.other_column_text_color,
      '--button-bg': data.values.button_bg,
      '--hover-button-bg': data.values.hover_button_bg,
      '--text-button-color': data.values.text_button_color,
    }"
  >
    <div class="premium-comparison-body">
      <div class="premium-comparison-content">
        <div class="premium-comparison-heading">
          <p>
            <strong>{{ data.values.title }}</strong>
          </p>
        </div>

        <div class="premium-comparison-text">
          <p>{{ data.values.desc }}</p>
        </div>

        <div class="premium-comparison-items">
          <div
            v-for="item in data.values.children"
            :key="item.label"
            class="premium-comparison-list-item"
          >
            <div class="premium-comparison-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9993 0C7.17099 0 0 7.17232 0 16.0007C0 24.8291 7.17301 32 16.0007 32C24.8182 32 31.6649 24.9979 31.6649 16.1876C31.6649 13.9113 31.2546 12.2459 30.3966 10.3013C30.3613 10.2178 30.3098 10.1421 30.245 10.0787C30.1802 10.0153 30.1034 9.96546 30.0191 9.93201C29.9349 9.89855 29.8448 9.8822 29.7542 9.88388C29.6635 9.88557 29.5741 9.90527 29.4912 9.94183C29.4082 9.9784 29.3333 10.0311 29.271 10.0969C29.2086 10.1626 29.1599 10.2402 29.1277 10.3249C29.0956 10.4097 29.0806 10.5 29.0837 10.5906C29.0867 10.6812 29.1078 10.7703 29.1456 10.8527C29.9555 12.6881 30.2978 14.0672 30.2978 16.1876C30.2978 24.2951 24.0996 30.6329 16.0007 30.6329C7.91184 30.6329 1.3671 24.0901 1.3671 16.0007C1.3671 7.91116 7.90983 1.3671 15.9993 1.3671C20.5707 1.3671 24.5944 3.5062 27.2779 6.78476C20.614 10.421 15.6561 17.941 13.0061 23.772C10.3992 18.8219 6.69798 14.9526 6.69798 14.9526C6.63564 14.8867 6.56079 14.8338 6.47779 14.7971C6.3948 14.7604 6.30532 14.7406 6.21458 14.7388C6.12385 14.737 6.03366 14.7533 5.94929 14.7868C5.86493 14.8202 5.78806 14.8701 5.72318 14.9336C5.6583 14.997 5.60671 15.0728 5.57141 15.1564C5.53611 15.24 5.51782 15.3298 5.51759 15.4205C5.51736 15.5113 5.5352 15.6012 5.57008 15.685C5.60495 15.7688 5.65617 15.8448 5.72072 15.9085C5.72072 15.9085 9.97141 20.2729 12.4227 25.5236C12.4788 25.6435 12.5685 25.7445 12.6808 25.8144C12.7932 25.8843 12.9235 25.9201 13.0558 25.9174C13.1881 25.9147 13.3168 25.8737 13.4262 25.7993C13.5357 25.7249 13.6212 25.6203 13.6723 25.4983C16.1489 19.5801 21.6708 10.9928 28.609 7.58313C28.7059 7.54455 28.7927 7.4843 28.8628 7.40699C28.9328 7.32968 28.9842 7.23736 29.0131 7.1371C29.042 7.03685 29.0475 6.93131 29.0293 6.82859C29.0111 6.72586 28.9696 6.62867 28.908 6.54445C25.9966 2.57708 21.2935 0 15.9993 0Z"
                  fill="#1A192E"
                ></path>
              </svg>
            </div>
            <p class="premium-comparison-list-text">{{ item.label }}</p>
          </div>
        </div>

        <a :href="data.values.button_link" class="premium-comparison-button">
          {{ data.values.button_text }}
        </a>
      </div>

      <div class="premium-comparison-table">
        <div class="premium-comparison-grid premium-comparison-grid-header">
          <div class="premium-comparison-item"></div>

          <div
            v-for="(column, index) in data.values.table_widget.columns"
            :key="column.name"
            class="premium-comparison-item"
            :class="{ active: index === 0 }"
          >
            <template v-if="data.values.table_brand_img.image && index === 0">
              <img
                :src="data.values.table_brand_img.image"
                alt=""
                loading="lazy"
              />
            </template>
            <template v-else>
              <h3>{{ column.name }}</h3>
            </template>
          </div>
        </div>

        <div
          v-for="row in data.values.table_widget.rows"
          :key="row.name"
          class="premium-comparison-grid premium-comparison-grid-rows"
        >
          <div class="premium-comparison-item">
            <h3>{{ row.name }}</h3>
          </div>

          <div
            v-for="(value, key, index) in row.data"
            :key="key"
            class="premium-comparison-item"
            :class="{ active: index === 0 }"
          >
            <div
              class="premium-comparison-item-image"
              :class="{ active: index === 0 }"
            >
              <template v-if="value === '#YES'">
                <svg
                  width="19"
                  height="19"
                  style="max-width: 19px"
                  viewBox="0 0 37 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.4998 2.5L12.4998 24.5L2.49976 14.5"
                    stroke="#A1D3A2"
                    stroke-width="5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </template>
              <template v-else-if="value === '#NO'">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.5 12.5L12.5 36.5"
                    stroke="#F37E98"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12.5 12.5L36.5 36.5"
                    stroke="#F37E98"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </template>
              <template v-else>
                {{ value }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  key: String,
  data: Object,
});
</script>

<style scoped>
.premium-comparison {
  background-color: var(--section-bg);
}

.premium-comparison-body {
  display: grid;
  gap: 32px;
}

.premium-comparison-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.premium-comparison-heading {
  width: 100%;
}

.premium-comparison-heading * {
  margin: 0;
  font-size: 32px;
  line-height: 150%;
  text-transform: unset;
  color: var(--title-color);
}

.premium-comparison-text {
  margin-top: 3px;
}

.premium-comparison-text * {
  margin: 0;
  font-size: 18px;
  line-height: 150%;
  text-transform: unset;
  color: var(--description-color);
}

.premium-comparison-items {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-self: baseline;
  align-items: start;
}

.premium-comparison-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.premium-comparison-icon {
  flex: 0 0 28px;
  height: 28px;
}

.premium-comparison-icon svg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-comparison-icon svg path {
  fill: var(--list-color);
}

.premium-comparison-list-text {
  margin: 0;
  font-size: 18px;
  line-height: 150%;
  text-transform: unset;
  color: var(--list-color);
}

.premium-comparison-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  margin-top: 32px;
  font-size: 18px;
  line-height: 100%;
  text-align: center;
  text-transform: unset;
  text-decoration: none;
  padding: 16px 48px;
  border-radius: 100px;
  transition: all 0.25s ease 0s;
  position: relative;
  font-weight: 700;
  z-index: 2;
  background-color: var(--button-bg);
  color: var(--text-button-color);
  margin-left: auto;
  margin-right: auto;
}

.premium-comparison-button:hover {
  color: #dad0ff;
  transition: all 0.25s ease 0s;
  background-color: var(--hover-button-bg);
}

.premium-comparison-button svg {
  width: 14px;
  height: 14px;
}

.premium-comparison-button svg path {
  fill: #ffffff;
  transition: all 0.25s ease 0s;
}

.premium-comparison-button:hover svg path {
  fill: #dad0ff;
  transition: all 0.25s ease 0s;
}

.premium-comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
}

.premium-comparison-item {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--table-bg);
  border-left: 1px solid var(--table-bg);
}

.premium-comparison-item:first-child {
  flex-direction: row;
  gap: 20px;
}

.premium-comparison-item:last-child {
  border-right: 1px solid var(--table-bg);
}

.premium-comparison-grid-header .premium-comparison-item {
  padding: 18px 18px;
  background-color: var(--other-column-bg);
}

.premium-comparison-grid-header .premium-comparison-item.active {
  background-color: var(--table-bg);
  border-bottom: 0px;
  border: 0px;
}

.premium-comparison-grid-header .premium-comparison-item:first-child {
  background-color: transparent;
  border: 0px;
}

.premium-comparison-grid-header .premium-comparison-item h3 {
  margin: 0;
  font-size: 16px;
  line-height: 100%;
  text-transform: unset;
  text-align: center;
  display: block;
  width: 100%;
  font-weight: 700;
  color: var(--other-column-text-color);
}

.premium-comparison-grid-header .premium-comparison-item.active h3 {
  color: var(--first-column-text-color);
}

.premium-comparison-grid-header .premium-comparison-item img {
  display: block;
  width: 100%;
  max-width: 80px;
  height: 100%;
  object-fit: contain;
}

.premium-comparison-grid-rows .premium-comparison-item {
  padding: 16px 14px;
  background-color: var(--other-column-bg);
}

.premium-comparison-grid-rows .premium-comparison-item.active {
  background-color: var(--table-bg);
  border-top: 1px solid var(--section-bg);
}

.premium-comparison-grid-header
  + .premium-comparison-grid-rows
  .premium-comparison-item:first-child {
  border-top-left-radius: 16px;
}

.premium-comparison-grid-header .premium-comparison-item:nth-child(2) {
  border-top-left-radius: 16px;
}

.premium-comparison-grid-header .premium-comparison-item:last-child {
  border-top-right-radius: 16px;
}

.premium-comparison-grid-rows:last-child .premium-comparison-item:first-child {
  border-bottom-left-radius: 16px;
}

.premium-comparison-grid-rows:last-child .premium-comparison-item:last-child {
  border-bottom-right-radius: 16px;
}

.premium-comparison-grid-rows:last-child .premium-comparison-item {
  border-bottom: 1px solid var(--table-bg);
}

.premium-comparison-grid-rows:last-child .premium-comparison-item.active {
  border-bottom: 0px;
}

.premium-comparison-grid-rows .premium-comparison-item:first-child h3 {
  margin: 0;
  font-size: 16px;
  line-height: 130%;
  text-transform: unset;
  text-align: left;
  display: block;
  width: 100%;
  color: var(--other-column-text-color);
  font-family: Assistant, sans-serif;
  font-weight: 400;
  font-style: normal;
}

.premium-comparison-item-text {
  margin: 0;
  font-size: 16px;
  color: #1a192e;
  line-height: 130%;
  text-transform: unset;
  text-align: center;
  display: block;
  width: 100%;
}

.premium-comparison-item.active .premium-comparison-item-text {
  color: #ffffff;
}

.premium-comparison-item-image {
  width: fit-content;
  text-align: center;
  height: fit-content;
  min-height: 24px;
  color: var(--other-column-text-color);
}

.premium-comparison-item-image.active {
  color: var(--first-column-text-color, white);
}

.premium-comparison-item-image svg {
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

/* Media queries for responsive design */
@media (min-width: 1024px) {
  .premium-comparison {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .premium-comparison-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .premium-comparison-content {
    align-items: start;
  }

  .premium-comparison-heading {
    text-align: left;
  }

  .premium-comparison-heading * {
    font-size: 52px;
  }

  .premium-comparison-text {
    margin-top: 4px;
    text-align: left;
  }

  .premium-comparison-text * {
    font-size: 18px;
  }

  .premium-comparison-list-text {
    font-size: 20px;
  }

  .premium-comparison-items {
    display: flex !important;
    margin-top: 50px;
    gap: 30px;
  }

  .premium-comparison-list-item {
    gap: 16px;
    justify-content: start;
  }

  .premium-comparison-icon {
    flex: 0 0 28px;
    height: 28px;
  }

  .premium-comparison-button {
    margin-top: 50px;
    max-width: 305px;
    padding: 16px 48px;
    font-size: 18px;
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .premium-comparison-grid {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }

  .premium-comparison-grid-header .premium-comparison-item img {
    max-width: 100px;
  }

  .premium-comparison-grid-header .premium-comparison-item {
    padding: 18px 18px;
  }

  .premium-comparison-grid-header .premium-comparison-item h3 {
    font-size: 16px;
  }

  .premium-comparison-grid-rows .premium-comparison-item {
    padding: 20px 14px;
  }

  .premium-comparison-grid-rows .premium-comparison-item:first-child h3 {
    font-size: 18px;
  }

  .premium-comparison-item-text {
    font-size: 20px;
  }

  .premium-comparison-item-image {
    width: fit-content;
    text-align: center;
    height: fit-content;
    min-height: 24px;
  }
}
</style>
