<template>
  <section class="home-about-area px-4 py-8">
    <div class="container mx-auto flex flex-col md:flex-row gap-x-10">
      <div class="w-full md:w-1/2">
        <span class="image">
          <img
            :src="data.values.image.image"
            class="img-fluid mx-auto md:mx-0"
            alt="Image"
          />
        </span>
      </div>
      <div class="w-full md:w-1/2">
        <div class="home-about-block">
          <div class="home-about">
            <div class="content-block flex flex-col items-center md:items-start">
              <span class="subtitle" :style="{ color: '#333333' }">
                {{ data.values.subtitle }}
              </span>
              <h2 class="title text-center md:text-left" :style="{ color: '#333333' }">
                <span v-html="data.values.title"></span>
              </h2>
              <p class="description text-center md:text-left" :style="{ color: '#808080' }">
                <span v-html="data.values.description"></span>
              </p>
              <a
                :href="data.values.link"
                class="info-btn btn-style"
                :style="{
                  color: data.values.btn_color || '#fff',
                  backgroundColor: data.values.btn_background || '#f20231',
                  border: `2px solid ${data.values.btn_background || '#f20231'}`
                }"
              >
                {{ data.values.btn_text }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
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
.home-about-area .home-about-block .home-about {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.home-about-area .home-about-block .home-about .content-block {
  margin-top: 30px;
}
.home-about-area .home-about-block .home-about .image-block {
  text-align: center;
}
.home-about-area .home-about-block .home-about .content-block span.subtitle {
  font-size: 16px;
  margin-bottom: 18px;
  line-height: 1;
}
.home-about-area .home-about-block .home-about .content-block h2.title {
  font-size: 60px;
  font-weight: bolder;
  line-height: 1.1;
}
.home-about-area .home-about-block .home-about .content-block h2.title span {
  margin-top: 10px;
}
.home-about-area .home-about-block .home-about .content-block h2.title span:first-child {
  margin-top: 0px;
}
.home-about-area .home-about-block .home-about .content-block p.description {
  font-size: 14px;
  max-width: 50%;
}
.home-about-area .home-about-block .home-about .content-block a.info-btn {
  margin-top: 32px;
}
@media (max-width: 1399px) {
  .home-about-area .home-about-block .home-about .content-block h2.title {
    font-size: 50px;
  }
  .home-about-area .home-about-block .home-about .content-block p.description {
    max-width: 66.67%;
  }
}
@media (max-width: 1199px) {
  .home-about-area .home-about-block .home-about .content-block h2.title {
    font-size: 40px;
  }
  .home-about-area .home-about-block .home-about .content-block a.info-btn {
    margin-top: 22px;
  }
}
@media (max-width: 991px) {
  .home-about-area .home-about-block .home-about .content-block p.description {
    max-width: 80%;
  }
  .home-about-area .home-about-block .home-about .content-block h2.title {
    font-size: 30px;
    max-width: 90%;
  }
}
@media (max-width: 600px) {
  .home-about-area .home-about-block .home-about .content-block {
    text-align: center;
  }
  .home-about-area .home-about-block .home-about .content-block h2.title {
    font-size: 24px;
  }
  .home-about-area .home-about-block .home-about .content-block p.description {
    margin-top: 0;
  }
}

.btn-style {
  font-size: 14px;
  padding: 14px 38px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 5px;
  letter-spacing: 0.5px;
  display: inline-block;
  transition: all 0.3s ease-in-out;
}

.btn-style:hover {
  color: #ffffff !important;
  background-color: #2c2b49 !important;
  border-color: #2c2b49 !important;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
