<template>
  <div :class="'section-' + key" class="py-12">
    <h2
      class="title text-center text-2xl font-bold mb-14"
      :style="{ color: data.values.section_title_color }"
    >
      {{ data.values.heading }}
    </h2>

    <div class="cat-blocks-container max-w-7xl mx-auto">
      <div class="flex flex-wrap justify-center">
        <div
          v-for="(item, index) in data.values.children"
          :key="index"
          class="w-1/2 sm:w-1/2 lg:w-1/4 p-2  transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <a :href="item.link" class="cat-block block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden relative">
            <figure class="relative">
              <span class="block">
               <img
				  :src="formatImage(item.img.image)"
				  :alt="item.category_name"
				  class="w-full h-auto object-cover"
				  :style="{ borderRadius: data.values.img_border_radius + 'px' }"
				/>

              </span>
              <div class="text-on-image-container text-left ps-5 pe-5" >
                <p
                  class="text-on-image-1 text-sm"
                  :style="{ color: data.values.img_txt_1_color }"
                >
                  {{ item.img_texte_1 }}
                </p>
                <p
                  class="text-on-image-2 text-xl font-semibold leading-tight"
                  :style="{ color: data.values.img_txt_2_color }"
                >
                  {{ item.img_texte_2 }}
                </p>
                <p
                  class="text-on-image-3 text-sm"
                  :style="{ color: data.values.img_txt_3_color }"
                >
                  {{ item.img_texte_3 }}
                </p>
              </div>
            </figure>
            <h3
              class="cat-block-title text-center text-base mt-4 mb-4 font-medium"
              :style="{ color: data.values.txt_color }"
            >
              {{ item.category_name }}
            </h3>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    data: Object,
    key: [String, Number]
  },
  methods: {
    formatImage(url) {
      if (!url) return '';
      if (url.startsWith('http')) {
        return url;
      }
      return 'https:' + url;
    }
  }
}
</script>

<style scoped>
 .title {
  color: v-bind('data.values.section_title_color');
  margin-bottom: 3.5rem;
}

 .cat-block img {
  border-radius: v-bind('data.values.img_border_radius')px;
}

/* .text-on-image-container {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: left;
}*/

 .text-on-image-1 {
  font-size: 17px;
  color: v-bind('data.values.img_txt_1_color');
}

 .text-on-image-2 {
  display: inline-block;
  margin-right: 5px;
  font-size: 25px;
  line-height: 1.1;
  font-weight: 400;
  color: v-bind('data.values.img_txt_2_color');
}

 .text-on-image-3 {
  display: inline-block;
  font-size: 17px;
  color: v-bind('data.values.img_txt_3_color');
}

 .cat-block-title {
  color: v-bind('data.values.txt_color');
}
</style>
