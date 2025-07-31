<template>
  <section class="project-count-area default-container">
    <div class="project-count-block row">
      <!-- Text content column -->
      <div class="align-items-center col-12 col-md-6 d-flex justify-content-center text-center text-md-left">
        <div class="count-text-content">
          <h2>
            <span>{{ data.values.titre }}</span>
          </h2>
          <p>{{ data.values.text }}</p>
          <a :href="data.values.link" class="btn btn-style px-0">{{ data.values.link_text }}</a>
        </div>
      </div>
      
      <!-- Counter column -->
      <div class="align-items-center col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
        <div class="p-counter-block">
          <ul class="single-count">
            <li class="count-wrap">
              <div class="count-info">
                <h2 class="count" ref="countRef1" :data-target="data.values.number_1">0</h2>
                <a :href="data.values.link">
                  <img :src="data.values.icon_1.image" :alt="data.values.text_1">
                </a>
              </div>
              <span class="count-title">{{ data.values.text_1 }}</span>
            </li>
            <li class="count-wrap">
              <div class="count-info">
                <h2 class="count" ref="countRef2" :data-target="data.values.number_2">0</h2>
                <a :href="data.values.link">
                  <img :src="data.values.icon_2.image" :alt="data.values.text_2">
                </a>
              </div>
              <span class="count-title">{{ data.values.text_2 }}</span>
            </li>
            <li class="count-wrap">
              <div class="count-info">
                <h2 class="count" ref="countRef3" :data-target="data.values.number_3">0</h2>
                <a :href="data.values.link">
                  <img :src="data.values.icon_3.image" :alt="data.values.text_3">
                </a>
              </div>
              <span class="count-title">{{ data.values.text_3 }}</span>
            </li>
            <li class="count-wrap">
              <div class="count-info">
                <h2 class="count" ref="countRef4" :data-target="data.values.number_4">0</h2>
                <a :href="data.values.link">
                  <img :src="data.values.icon_4.image" :alt="data.values.text_4">
                </a>
              </div>
              <span class="count-title">{{ data.values.text_4 }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const countRef1 = ref(null);
const countRef2 = ref(null);
const countRef3 = ref(null);
const countRef4 = ref(null);

onMounted(() => {
  // Start the counter animation for each counter
  const duration = 1000; // Duration in milliseconds (1 second)
  const countRefs = [countRef1.value, countRef2.value, countRef3.value, countRef4.value];
  
  countRefs.forEach(counter => {
    if (!counter) return;
    
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / (duration / 20); // Adjust step size dynamically
    let count = 0;

    function updateCount() {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count);
        setTimeout(updateCount, 20);
      } else {
        counter.textContent = target; // Ensure the counter stops exactly at the target
      }
    }

    updateCount();
  });
});
</script>

<style scoped>
:root {
  --font-color-primary: #000;
}

.project-count-area .project-count-block .count-text-content {
  max-width: 580px;
}

.project-count-area .project-count-block .p-counter-block {
  max-width: 500px;
}

.project-count-area .project-count-block .count-text-content h2 {
  font-size: v-bind('data.values.desktop_font_size + "px"');
  font-weight: 700;
  line-height: 1.2;
}

.project-count-area .project-count-block .count-text-content h2 span {
  display: block;
}

.project-count-area .project-count-block .count-text-content p {
  font-size: 18px;
  margin-top: 27px;
}

.project-count-area .project-count-block .count-text-content a {
  margin-top: 10px;
  margin-bottom: 10px;
  background: v-bind('data.values.btn_bg');
  color: v-bind('data.values.btn_text_color');
  padding: 10px 5px !important;
}

/* counter css */
ul.single-count {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

ul.single-count li.count-wrap {
  width: 50%;
  padding: 45px 30px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-flex-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
}

ul.single-count li.count-wrap:nth-child(1),
ul.single-count li.count-wrap:nth-child(2) {
  border-top: none;
}

ul.single-count li.count-wrap:nth-child(even) {
  border-right: none;
}

ul.single-count li.count-wrap .count-info {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: flex-end;
  -webkit-flex-align: flex-end;
  -ms-flex-align: flex-end;
  -webkit-align-items: flex-end;
  align-items: flex-end;
  text-align: center;
}

ul.single-count li.count-wrap .count-info h2 {
  color: var(--font-color-primary, #000);
  width: 100px;
  font-size: 45px;
  position: relative;
  font-weight: 700;
  line-height: 1;
}

ul.single-count li.count-wrap .count-info h2::after {
  content: "+";
}

ul.single-count li.count-wrap .count-info a {
  color: #333;
  margin-left: 10px;
  line-height: 0;
}

ul.single-count li.count-wrap .count-info a svg {
  height: 24px;
  width: 24px;
}

ul.single-count li.count-wrap .count-info a img {
  height: 24px;
  width: 24px;
}

ul.single-count li.count-wrap .count-info a span.count-icon {
  font-size: 24px;
}

ul.single-count li.count-wrap span.count-title {
  margin-top: 8px;
}

@media (max-width: 1199px) {
  .project-count-area .project-count-block .count-text-content h2 {
    font-size: v-bind('data.values.tablet_font_size + "px"');
  }
  
  .project-count-area .project-count-block .count-text-content p {
    font-size: 16px;
  }
}

@media (max-width: 991px) {
  .project-count-area .project-count-block .count-text-content h2 {
    font-size: v-bind('data.values.mobile_font_size + "px"');
  }
  
  .project-count-area .project-count-block .count-text-content p {
    margin-top: 21px;
  }
}

@media (max-width: 767px) {
  ul.single-count li.count-wrap {
    padding: 30px 15px;
  }
  
  ul.single-count li.count-wrap .count-info h2 {
    font-size: 30px;
  }
}

/* Bootstrap-like classes for layout */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.d-flex {
  display: flex !important;
}

.justify-content-center {
  justify-content: center !important;
}

.text-center {
  text-align: center !important;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  text-decoration: none;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

@media (min-width: 768px) {
  .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
  .text-md-left {
    text-align: left !important;
  }
  
  .justify-content-md-start {
    justify-content: flex-start !important;
  }
}
</style>
