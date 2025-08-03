<template>
  <section
    class="main-banner flex justify-between items-center mb-8 p-8 rounded-[20px]"
    :style="mainBannerStyle"
  >
    <div class="banner-content">
      <div
        class="exclusive-tag"
        :style="{ color: bannerSubtitleColor }"
      >
        {{ data.values.subtitle_1 }}
      </div>
      <h1 class="banner-title" :style="{ color: bannerTitleColor }">
        {{ data.values.title_1 }}
      </h1>
      <a
        :href="data.values.link_1"
        class="shop-now inline-block font-semibold uppercase px-8 py-3 transition"
        :style="buttonStyle"
      >
        {{ data.values.link_text_1 }}
      </a>
    </div>
  </section>

  <div
    class="promo-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
  >
    <a
      :href="data.values.link_2"
      class="promo-card"
      id="new-release"
      :style="bgImageStyle2"
    >
      <span class="promo-tag" :style="badgeStyle">{{
        data.values.subtitle_2
      }}</span>
      <h2 class="promo-title" :style="promoTitleStyle">
        {{ data.values.title_2 }}
      </h2>
      <p class="promo-subtitle" :style="promoSubtitleStyle">
        {{ data.values.subtitle_1 }}
      </p>
    </a>

    <a
      :href="data.values.link_3"
      class="promo-card"
      id="big-discount"
      :style="bgImageStyle3"
    >
      <span class="promo-tag" :style="badgeStyle">{{
        data.values.subtitle_3
      }}</span>
      <h2 class="promo-title" :style="promoTitleStyle">
        {{ data.values.title_3 }}
      </h2>
      <p class="promo-subtitle" :style="promoSubtitleStyle">
        {{ data.values.subtitle_3 }}
      </p>
    </a>

    <a
      :href="data.values.link_4"
      class="promo-card"
      id="weekend-deal"
      :style="bgImageStyle4"
    >
      <span class="promo-tag" :style="badgeStyle">{{
        data.values.subtitle_4
      }}</span>
      <h2 class="promo-title" :style="promoTitleStyle">
        {{ data.values.title_4 }}
      </h2>
      <p class="promo-subtitle" :style="promoSubtitleStyle">
        {{ data.values.subtitle_4 }}
      </p>
    </a>

    <a
      :href="data.values.link_5"
      class="promo-card"
      id="spring-sale"
      :style="bgImageStyle5"
    >
      <span class="promo-tag" :style="badgeStyle">{{
        data.values.subtitle_5
      }}</span>
      <h2 class="promo-title" :style="promoTitleStyle">
        {{ data.values.title_5 }}
      </h2>
      <p class="promo-subtitle" :style="promoSubtitleStyle">
        {{ data.values.subtitle_5 }}
      </p>
    </a>
  </div>
</template>

<script>
import { imghttps } from '~/composables/services/helpers';

export default {
  props: {
    data: { type: Object, required: true },
    key: { type: String, required: true },
  },
  computed: {
    mainBannerStyle() {
      return {
        backgroundColor: this.data.values.banner_1_bg,
        backgroundImage: `url('${imghttps(this.data.values.image_1.image)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "350px",
        borderRadius: "20px",
      };
    },
    bannerSubtitleColor() {
      return this.data.values.banner_1_subtitle_color;
    },
    bannerTitleColor() {
      return this.data.values.banner_1_title_color;
    },
    buttonStyle() {
      return {
        backgroundColor: this.data.values.button_bg,
        color: this.data.values.btn_color,
        borderRadius: `${this.data.values.btn_border_radius}px`,
        border: "none",
      };
    },
    badgeStyle() {
      return {
        backgroundColor: this.data.values.banner_x_badge_bg,
        color: this.data.values.banner_x_badge_color,
        borderRadius: `${this.data.values.banner_x_badge_border_radius}px`,
      };
    },
    promoTitleStyle() {
      return {
        color: this.data.values.banner_x_title_color,
      };
    },
    promoSubtitleStyle() {
      return {
        color: this.data.values.banner_x_sous_title_color,
      };
    },
    bgImageStyle2() {
      return {
        backgroundColor: "#ffebee",
        backgroundImage: `url('${imghttps(this.data.values.image_2.image)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    bgImageStyle3() {
      return {
        backgroundColor: "#e8eaf6",
        backgroundImage: `url('${imghttps(this.data.values.image_3.image)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    bgImageStyle4() {
      return {
        backgroundColor: "#fff8e1",
        backgroundImage: `url('${imghttps(this.data.values.image_4.image)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    bgImageStyle5() {
      return {
        backgroundColor: "#f3e5f5",
        backgroundImage: `url('${imghttps(this.data.values.image_5.image)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
  },
};
</script>
<style scoped>
.main-banner {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-size: cover;
  background-position: center;
  min-height: 350px;
  border-radius: 20px;
}
.banner-content {
  max-width: 50%;
}
.exclusive-tag {
  color: v-bind("data.values.banner_1_subtitle_color");
  font-size: 17px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}
.banner-title {
  color: v-bind("data.values.banner_1_title_color");
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}
.shop-now {
  background-color: v-bind("data.values.button_bg");
  color: v-bind("data.values.btn_color");
  padding: 0.8rem 2rem;
  border: none;
  border-radius: v-bind("data.values.btn_border_radius") px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}
.shop-now:hover {
  background-color: v-bind("data.values.button_bg_hover");
  color: v-bind("data.values.btn_color_hover");
}
.banner-image {
  max-width: 45%;
  height: auto;
}
.promo-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.promo-card {
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  min-height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-size: cover;
  background-position: center center;
}
.promo-tag {
  background-color: v-bind("data.values.banner_x_badge_bg");
  color: v-bind("data.values.banner_x_badge_color");
  padding: 0 5px;
  border-radius: v-bind("data.values.banner_x_badge_border_radius") px;
  margin-bottom: 1rem;
  font-size: 13px;
  text-transform: uppercase;
  width: fit-content;
}
.promo-title {
  color: v-bind("data.values.banner_x_title_color");
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.promo-subtitle {
  font-size: 15px;
  color: v-bind("data.values.banner_x_sous_title_color");
}

#new-release {
  background-color: #ffebee;
  background-image: url(v-bind(imghttps("data.values.image_2.image")));
}
#big-discount {
  background-color: #e8eaf6;
  background-image: url(v-bind(imghttps("data.values.image_3.image")));
}
#weekend-deal {
  background-color: #fff8e1;
  background-image: url(v-bind(imghttps("data.values.image_4.image")));
}
#spring-sale {
  background-color: #f3e5f5;
  background-image: url(v-bind(imghttps("data.values.image_5.image")));
}

@media (max-width: 1024px) {
  .promo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .main-banner {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
  .banner-content {
    max-width: 100%;
    margin-bottom: 2rem;
  }
  .banner-image {
    max-width: 100%;
  }
}
@media (max-width: 480px) {
  .promo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
