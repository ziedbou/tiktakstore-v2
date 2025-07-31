<template>
  <div v-if="product.description" class=" my-4">
    <div ref="descriptionContainer">
      <div v-html="product.description"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const descriptionContainer = ref(null);

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
  extra: {
    type: Object,
    default: null,
  }
});
// console.log("pp_",props.product.description)

onMounted(() => {
  if (descriptionContainer.value) {
    const shadowContainer = document.createElement('div');
    descriptionContainer.value.innerHTML = '';
    descriptionContainer.value.appendChild(shadowContainer);

    const shadow = shadowContainer.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        h1 { font-size: 2rem; }
        h2 { font-size: 1.75rem; }
        h3 { font-size: 1.5rem; }
        h4 { font-size: 1.25rem; }
        h5 { font-size: 1rem; }
        h6 { font-size: 0.875rem; }
        p {
          margin-bottom: 1rem;
          color: #333;
          font-size: 1rem;
        }
        ul, ol {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        ul {
          list-style-type: disc;
        }
        ol {
          list-style-type: decimal;
        }
        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      </style>
      <div class="description-container">
        ${props.product.description}
      </div>
    `;
  }
});
</script>