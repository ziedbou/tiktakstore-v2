<template>
  <section
    class="testimonials-section"
    :style="{
      '--title-color': data.values.title_color,
      '--card-color': data.values.card_color,
      '--text-color': data.values.text_color,
      '--stars-color': data.values.stars_color,
      '--animation-duration': `${data.values.children.length * 10}s`,
    }"
  >
    <div class="testimonials-container">
      <div class="testimonials-heading">
        <h2>{{ data.values.title }}</h2>
      </div>

      <div class="testimonials-subheading">
        <p>{{ data.values.description }}</p>
      </div>

      <div class="testimonials-scrolling">
        <div class="testimonials-wrapper">
          <div class="testimonials-list">
            <!-- Bloc original -->
            <div
              v-for="(child, index) in data.values.children"
              :key="index"
              class="testimonials-card"
            >
              <div class="testimonials-image">
                <img :src="imghttps(child.img.image)" alt="Testimonial Image" />
              </div>
              <div class="testimonials-content">
                <p class="testimonials-title">{{ child.title }}</p>

                <div class="testimonials-stars">
                  <svg
                    v-for="(star, starIndex) in 5"
                    :key="starIndex"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                  >
                    <path
                      d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                      fill="var(--stars-color)"
                    />
                  </svg>
                </div>

                <div class="testimonials-text">
                  <p>{{ child.desc }}</p>
                </div>

                <p class="testimonials-author">{{ child.name }}</p>
              </div>
            </div>

            <div
              v-for="(child, index) in data.values.children"
              :key="index + data.values.children.length"
              class="testimonials-card"
            >
              <div class="testimonials-image">
                <img :src="imghttps(child.img.image)" alt="Testimonial Image" />
              </div>
              <div class="testimonials-content">
                <p class="testimonials-title">{{ child.title }}</p>

                <div class="testimonials-stars">
                  <svg
                    v-for="(star, starIndex) in 5"
                    :key="starIndex"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                  >
                    <path
                      d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                      fill="var(--stars-color)"
                    />
                  </svg>
                </div>

                <div class="testimonials-text">
                  <p>{{ child.desc }}</p>
                </div>

                <p class="testimonials-author">{{ child.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="testimonials-scrolling">
        <div class="testimonials-wrapper inverse-animation">
          <div class="testimonials-list ">
            <!-- Bloc original -->
            <div
              v-for="(child, index) in data.values.children"
              :key="index"
              class="testimonials-card"
            >
              <div class="testimonials-image">
                <img :src="imghttps(child.img.image)" alt="Testimonial Image" />
              </div>
              <div class="testimonials-content">
                <p class="testimonials-title">{{ child.title }}</p>

                <div class="testimonials-stars">
                  <svg
                    v-for="(star, starIndex) in 5"
                    :key="starIndex"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                  >
                    <path
                      d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                      fill="var(--stars-color)"
                    />
                  </svg>
                </div>

                <div class="testimonials-text">
                  <p>{{ child.desc }}</p>
                </div>

                <p class="testimonials-author">{{ child.name }}</p>
              </div>
            </div>

            <div
              v-for="(child, index) in data.values.children"
              :key="index + data.values.children.length"
              class="testimonials-card"
            >
              <div class="testimonials-image">
                <img :src="imghttps(child.img.image)" alt="Testimonial Image" />
              </div>
              <div class="testimonials-content">
                <p class="testimonials-title">{{ child.title }}</p>

                <div class="testimonials-stars">
                  <svg
                    v-for="(star, starIndex) in 5"
                    :key="starIndex"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                  >
                    <path
                      d="M10 0L12.9389 5.95492L19.5106 6.90983L14.7553 11.5451L15.8779 18.0902L10 15L4.12215 18.0902L5.24472 11.5451L0.489435 6.90983L7.06107 5.95492L10 0Z"
                      fill="var(--stars-color)"
                    />
                  </svg>
                </div>

                <div class="testimonials-text">
                  <p>{{ child.desc }}</p>
                </div>

                <p class="testimonials-author">{{ child.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { imghttps } from '~/composables/services/helpers';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.testimonials-section {
  background-color: var(--background-color);
  border-top: solid #000000 0px;
  border-bottom: solid #000000 0px;
  margin: 0;
  border-radius: 0px;
  overflow: hidden;
}

.testimonials-container {
  margin: 0 auto;
  padding: 27px 0;
  position: relative;
}

.testimonials-heading {
  text-align: left;
  padding: 0 16px;
}

.testimonials-heading h2 {
  margin: 0;
  font-size: 28px;
  line-height: 130%;
  font-weight: 700;
  color: var(--title-color);
}

.testimonials-subheading {
  margin-top: 8px;
  text-align: left;
  padding: 0 16px;
}

.testimonials-subheading p {
  margin: 0;
  font-size: 14px;
  line-height: 150%;
  color: var(--title-color);
}

.testimonials-scrolling {
  margin-top: 24px;
  overflow: hidden;
}

.testimonials-wrapper {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: fit-content; /* Ajustement pour l'animation */
}


.testimonials-list {
  display: flex;
  white-space: nowrap;
  gap: 10px;
  flex-shrink: 0;
  width: max-content;
  animation: tickerRight var(--animation-duration) infinite linear;
}

.inverse-animation .testimonials-list {

  animation: tickerLeft var(--animation-duration) infinite linear;
}

.testimonials-card {
  flex-shrink: 0;
  width: 520px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  overflow: hidden;
}

.testimonials-content {
  flex: 1 0;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  background-color: var(--card-color);
}

.testimonials-image {
  height: 100%;
  flex: 1 0;
  border-radius: 0;
  overflow: hidden;
}

.testimonials-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials-title {
  margin: 0;
  font-size: 16px;
  line-height: 130%;
  text-align: left;
  color: var(--text-color);
}

.testimonials-stars {
  display: flex;
  align-items: end;
  justify-content: start;
  gap: 4px;
  margin-top: 6px;
}

.testimonials-stars svg {
  display: block;
  width: 16px;
  height: 16px;
}

.testimonials-text {
  margin-top: 10px;
  text-align: left;
}

.testimonials-text p {
  margin: 0;
  font-size: 12px;
  line-height: 160%;
  color: var(--text-color);
  white-space: break-spaces;
}

.testimonials-author {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  margin-top: 10px;
  font-size: 12px;
  line-height: 130%;
  font-weight: 700;
  color: var(--text-color);
}

.testimonials-author::before {
  content: '';
  width: 100px;
  height: 1px;
  background: var(--text-color);
}

@media (min-width: 1024px) {
  .testimonials-container {
    padding: 36px 0;
  }

  .testimonials-heading {
    padding: 0 50px;
  }

  .testimonials-heading h2 {
    font-size: 36px;
  }

  .testimonials-subheading {
    margin-top: 12px;
    padding: 0 50px;
  }

  .testimonials-subheading p {
    font-size: 16px;
  }

  .testimonials-scrolling {
    margin-top: 32px;
  }

  .testimonials-card {
    width: 600px;
  }

  .testimonials-content {
    padding: 20px;
    justify-content: start;
  }

  .testimonials-title {
    font-size: 18px;
  }

  .testimonials-author {
    font-size: 14px;
  }

  .testimonials-author::before {
    width: 50px;
  }

  .testimonials-text p {
    font-size: 13px;
  }

  .testimonials-stars svg {
    width: 18px;
    height: 18px;
  }
}

/* Animation de droite à gauche */
@keyframes tickerRight {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
@keyframes tickerLeft{
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}


.testimonials-wrapper:hover .testimonials-list{
  animation-play-state: paused;
}
</style>