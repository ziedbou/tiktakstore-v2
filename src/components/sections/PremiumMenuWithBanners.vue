<template>

    <div :style="cssVars" class="flex flex-col lg:flex-row">
      <!-- Sidebar Menu -->
      <div class="w-64 hidden xl:block menu-section mr-4">
       <!-- Fixes -->
       <div
  class="sidebar rounded-xl border border-gray-100 bg-white/80 backdrop-blur-sm p-4 h-full w-full shadow-sm"
  style="z-index:60; position:relative;"
>
  <!-- Loading State -->
  <div v-if="isLoading" class="space-y-1">
    <div
      v-for="i in 6"
      :key="i"
      class="animate-pulse bg-gray-100 h-10 rounded-lg"
    ></div>
  </div>

  <!-- Menu Items -->
  <nav v-else class="space-y-1">
    <div
      v-for="menu in menuItems"
      :key="menu.label"
      class="menu-item relative group"
    >
      <!-- Menu with Submenu -->
      <template v-if="menu.submenu && menu.submenu.length">
        <div class="flex items-center justify-between px-4 py-3 mx-1 rounded-lg text-sm font-medium cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] hover:border-l-4 hover:border-blue-400 hover:pl-3" 
             style="color: var(--header-submenu-link-color);">
          <span class="transition-all duration-300 ease-in-out group-hover:text-[var(--header-submenu-link-color-hover)] group-hover:font-semibold">{{ menu.label }}</span>
          <svg 
            class="w-4 h-4 transition-all duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110" 
            style="color: var(--header-submenu-link-color);"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>
        
        <!-- Submenu Dropdown -->
        <div class="submenu absolute top-0 left-full ml-2 w-56 bg-white backdrop-blur-md shadow-xl rounded-xl border border-gray-100 overflow-hidden z-60 opacity-0 invisible -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
          <div class="py-2">
            <div
              v-for="submenu in menu.submenu"
              :key="submenu.label"
              class="submenu-item px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer border-l-2 border-transparent hover:border-blue-400 hover:bg-gray-50/50 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:to-transparent hover:before:from-blue-50/30 hover:before:to-purple-50/30 before:transition-all before:duration-300 before:-z-10"
              style="color: var(--header-submenu-link-color);"
            >
              <span
                v-if="submenu.type === 'text'"
                v-html="submenu.label"
                class="block relative z-10 transition-colors duration-150 hover:text-[var(--header-submenu-link-color-hover)]"
              ></span>
              <NuxtLink
                v-else
                :to="getLink(submenu)"
                class="block no-underline relative z-10 transition-colors duration-150 hover:text-[var(--header-submenu-link-color-hover)]"
                style="color: inherit;"
              >
                {{ submenu.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>

      <!-- Regular Menu Item -->
      <template v-else>
        <NuxtLink
          :to="getLink(menu)"
          class="block px-4 py-3 mx-1 rounded-lg text-sm font-medium no-underline transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] hover:border-l-4 hover:border-blue-400 hover:pl-3 hover:font-semibold"
          style="color: var(--header-submenu-link-color);"
        >
          <span class="transition-all duration-300 ease-in-out hover:text-[var(--header-submenu-link-color-hover)]">{{ menu.label }}</span>
        </NuxtLink>
      </template>
    </div>
  </nav>
</div>
        <!-- End Fixes -->
      </div>

      <!-- Main Content Area -->
        <div class="grid grid-cols-1 grid-rows-5 gap-4 lg:grid-cols-6 lg:grid-rows-4 flex-1">
          <!-- Main Banner -->
          <div class="row-span-3 lg:col-span-4 lg:row-span-4">
            <div
              class="banner relative motion-container w-full bg-cover bg-no-repeat overflow-visible rounded-[var(--banners-border-radius)] h-full lg:h-[520px]"
              :style="{ backgroundImage: `url('${imghttps(data.values.background_image_1?.image)}')` }"
              @mousemove="handleMouseMove"
              @mouseleave="handleMouseLeave"
            >
              <div
                class="absolute left-[7%] h-full flex flex-col justify-center items-start"
              >
                <h5
                  class="text-xl uppercase font-semibold text-[var(--sub-1-title-color)]"
                >
                  {{ data.values.sub_title_1 }}
                </h5>
                <h1
                  class="font-bold text-7xl text-left uppercase leading-tight text-[var(--title-1-1-color)]"
                  style="line-height: 70px; max-width: 60%;"
                >
                  {{ data.values.title_1_1 }}<br />
                  <span  class="text-[var(--title-2-1-color)]">{{ data.values.title_2_1 }}</span>
                </h1>
                <p
                  class="text-lg opacity-90 mb-4 text-[var(--text-1-color)]"
                >
                  {{ data.values.text_1 }}
                </p>
                <NuxtLink :to="data.values.link_1" class="banner-link">
                  <span class="relative z-10 font-bold">{{ data.values.link_text_1 }}</span>
                  <svg
                    class="arrow-icon"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </NuxtLink>
              </div>
              <NuxtImg
                :src="imghttps(data.values.image_1?.image)"
                class="motion-image absolute w-1/2 right-0 transition-transform duration-100"
                style="bottom: 80px"
                alt="Product Image"
                ref="mainImage"
              />
            </div>
          </div>
          <!-- Side Banner 1 -->
          <div class="row-start-4 lg:row-start-1 lg:col-span-2 lg:row-span-2 lg:col-start-5">
            <div
              class="side-banner relative motion-container bg-cover bg-no-repeat rounded-[var(--banners-border-radius)] overflow-visible h-[250px]"
              :style="{ backgroundImage: `url('${imghttps(data.values.background_image_2?.image)}')` }"
              @mousemove="handleSideMouseMove"
              @mouseleave="handleSideMouseLeave"
            >
              <div
                class="absolute left-[7%] h-full flex flex-col justify-center items-start"
              >
                <h5
                  class="font-bold text-2xl text-[var(--title-1-2-3-color)]"
                >
                  {{ data.values.title_1_2 }}<br />
                  <span class="text-[var(--title-2-2-3-color)]">{{ data.values.title_2_2 }}</span>
                </h5>
                <p class="mb-5 font-semibold text-[var(--text-2-3-color)]">
                  {{ data.values.text_2 }}
                </p>
                <NuxtLink :to="data.values.link_2" class="banner-link">
                  <span class="relative z-10 font-bold">{{ data.values.link_text_2 }}</span>
                  <svg
                    class="arrow-icon"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </NuxtLink>
              </div>
              <NuxtImg
                :src="imghttps(data.values.image_2?.image)"
                class="motion-image absolute transition-transform duration-100 w-[150px] right-0 bottom-[10%]"
                alt="Product Image"
                ref="sideImage1"
              />
            </div>
          </div>
          <!-- Side Banner 2 -->
          <div class="row-start-5 lg:row-start-3 lg:col-span-2 lg:row-span-2 lg:col-start-5" >
            <div
              class="side-banner relative motion-container bg-cover bg-no-repeat rounded-[var(--banners-border-radius)] overflow-visible h-[250px]"
              :style="{ backgroundImage: `url('${imghttps(data.values.background_image_3?.image)}')` }"
              @mousemove="handleSideMouseMove"
              @mouseleave="handleSideMouseLeave"
            >
              <div
                class="absolute left-[7%] h-full flex flex-col justify-center items-start"
              >
                <h5
                  class="font-bold text-2xl text-[var(--title-1-2-3-color)]"
                >
                  {{ data.values.title_1_3 }}<br />
                  <span class="text-[var(--title-2-2-3-color)]">{{ data.values.title_2_3 }}</span>
                </h5>
                <p class="mb-5 font-semibold text-[var(--text-2-3-color)]">
                  {{ data.values.text_3 }}
                </p>
                <NuxtLink :to="data.values.link_3" class="banner-link">
                  <span class="relative z-10 font-bold">{{ data.values.link_text_3 }}</span>
                  <svg
                    class="arrow-icon"
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </NuxtLink>
              </div>
              <NuxtImg
                :src="imghttps(data.values.image_3?.image)"
                class="motion-image absolute transition-transform duration-100 w-[150px] right-0 bottom-[10%]"
                alt="Product Image"
                ref="sideImage2"
              />
            </div>
          </div>
        </div>
      </div>

</template>

<script setup>
import { ref, computed } from "vue";
import { imghttps } from "~/composables/services/helpers";
import { useMenuSection } from '~/composables/useMenuSection'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});

// Use the menu section composable
const menuId = computed(() => props.data.values.menus_widget.menu_id)
const { menuData: menuItems, isLoading } = useMenuSection(menuId.value)

const hoveredMenu = ref(null);
const mainImage = ref(null);
const sideImage1 = ref(null);
const sideImage2 = ref(null);

// CSS Variables computed from data.values
const cssVars = computed(() => {
  const values = props.data.values;
  return {
    "--menu-link-color": values.menu_link_color,
    "--menu-link-background": values.menu_link_background,
    "--menu-link-background-hover":
      values.menu_link_background_hover,
    "--menu-link-color-hover": values.menu_link_color_hover,
    "--list-border-radius": `${values.list_border_radius}px`,
    "--banners-border-radius": `${values.banners_border_radius}px`,
    "--title-1-2-3-color": values.title_1_2_3_color,
    "--title-2-2-3-color": values.title_2_2_3_color,
    "--text-2-3-color": values.text_2_3_color,
    "--title-2-1-color": values.title_2_1_color,
    "--sub-1-title-color": values.sub_1_title_color,
    "--text-1-color": values.text_1_color,
    "--title-1-1-color": values.title_1_1_color,
    "--btn-color": values.btn_color,
    "--btn-background": values.btn_background,
    "--btn-background-hover": values.btn_background_hover,
    "--btn-color-hover": values.btn_color_hover,
    "--btn-border-radius": `${values.btn_border_radius}px`,
  };
});

const getLink = (item) => {
  return item.link || item.slug ? `/page/${item.slug}` : "#";
};

const handleMouseMove = (e) => {
  let el = mainImage.value;
  if (el && el.$el) el = el.$el; // For NuxtImg, get the underlying DOM element
  if (!el || !el.style) return;

  const container = e.currentTarget;
  const { left, top, width, height } = container.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;

  const moveX = x * 0.02;
  const moveY = y * 0.02;

  el.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
};

const handleMouseLeave = () => {
  let el = mainImage.value;
  if (el && el.$el) el = el.$el;
  if (el && el.style) {
    el.style.transform = "translate(0px, 0px) scale(1)";
  }
};

const handleSideMouseMove = (e) => {
  const container = e.currentTarget;
  const image = container.querySelector(".motion-image");

  if (!image) return;

  const { left, top, width, height } = container.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;

  const moveX = x * 0.02;
  const moveY = y * 0.02;

  image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
};

const handleSideMouseLeave = (e) => {
  const container = e.currentTarget;
  const image = container.querySelector(".motion-image");

  if (image) {
    image.style.transform = "translate(0px, 0px) scale(1)";
  }
};
</script>

<style scoped>
/* Menu Styles */
.menu-item {
  color: var(--menu-link-color);
  background-color: var(--menu-link-background);
}

.menu-item:hover {
  background-color: var(--menu-link-background-hover);
  color: var(--menu-link-color-hover);
  transform: translateX(5px);
}

.sidebar {
  border-radius: var(--list-border-radius);
  height: calc(100% - 20px);
}

/* Button Styles */
.banner-link {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 45px;
  color: var(--btn-color);
  background-color: var(--btn-background);
  border-radius: var(--btn-border-radius);
  text-align: center;
  transition: all ease-in-out 0.4s;
  z-index: 1;
  text-decoration: none;
}

.banner-link::before {
  content: "";
  position: absolute;
  width: 100%;
  min-width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  background-color: var(--btn-background-hover);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  transition: all ease-in-out 0.4s;
  z-index: -1;
}

.banner-link:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.banner-link:hover {
  color: var(--btn-color-hover);
}

.arrow-icon {
  width: 0;
  height: 0;
  margin-left: 0;
  transform: translateX(-10px) scale(0);
  transition: all 0.3s ease;
  color: var(--btn-color-hover);
}

.banner-link:hover .arrow-icon {
  width: 30px;
  height: 30px;
  margin-left: 6px;
  transform: translateX(0) scale(1);
}

/* Remove Custom Tailwind Extensions and Responsive Design */
</style>
