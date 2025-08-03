<template>
  <div
    class="flex flex-col lg:flex-row gap-4"
    :style="{
      '--image-border-radius': data.values.image_border_radius + 'px',
      '--title-color': data.values.title_color,
      '--subtitle-color': data.values.subtitle_color,
      '--cta-color': data.values.cta_color,
      '--cta-color-hover': data.values.cta_color_hover,
      '--cta-background': data.values.cta_background,
      '--cta-background-hover': data.values.cta_background_hover,
      '--cta-border-radius': data.values.cta_border_radius + 'px',
      '--overlay': data.values.overlay,
      '--overlay-hover': data.values.overlay_hover,
    }"
  >
    <!-- Item 1: Main Featured Banner -->
    <div
      class="flex-5 max-h-[700px] lg:max-h-full rounded-[var(--image-border-radius)] relative overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <NuxtLink :to="data.values.link_1">
        <NuxtImg
          :src="imghttps(option.image(data.values.image_1.image))"
          :alt="data.values.image_1.name"
          class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-[var(--overlay)] group-hover:bg-[var(--overlay-hover)] transition-colors duration-300"
        />
        <div
          class="absolute inset-6 flex flex-col items-center justify-center lg:items-start lg:justify-end"
        >
          <p
            class="text-sm font-medium mb-2 opacity-90 text-[var(--subtitle-color)]"
          >
            {{ data.values.subtitle_1 }}
          </p>
          <h2
            class="text-2xl lg:text-3xl font-bold mb-4 leading-tight text-center lg:text-left text-[var(--title-color)]"
          >
            {{ data.values.title_1 }}
          </h2>
          <div
            class="group/btn relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
          >
            <!-- Sliding background effect -->
            <div
              class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
            ></div>

            <span
              class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
              >{{ data.values.link_text_1 }}</span
            >
            <div class="w-5 h-5 relative overflow-hidden z-20">
              <MoveRight
                class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
              />
              <MoveRight
                class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
              />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Item 2: Nested Grid Container -->

    <!-- Nested responsive grid -->
    <div
      class="flex-7 grid grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-2 sm:grid-rows-2"
    >
      <!-- Sub-item 1: Secondary Featured Banner -->
      <div
        class="rounded-[var(--image-border-radius)] relative overflow-hidden group sm:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <NuxtLink :to="data.values.link_2" class="block h-full">
          <div class="relative h-full">
            <NuxtImg
              :src="imghttps(data.values.image_2.image)"
              :alt="data.values.image_2.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-[var(--overlay)] group-hover:bg-[var(--overlay-hover)] transition-colors duration-300"
            />
            <div
              class="absolute inset-0 flex items-center justify-center lg:justify-end"
            >
              <div class="text-center px-4">
                <p
                  class="text-sm font-medium mb-3 opacity-90 text-[var(--subtitle-color)]"
                >
                  {{ data.values.subtitle_2 }}
                </p>
                <h3
                  class="text-lg lg:text-xl font-bold mb-3 leading-tight text-[var(--title-color)]"
                >
                  {{ data.values.title_2 }}
                </h3>
                <div
                  class="group/btn relative inline-flex items-center gap-3 px-4 py-3 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
                >
                  <!-- Sliding background effect -->
                  <div
                    class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
                  ></div>

                  <span
                    class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
                    >{{ data.values.link_text_2 }}</span
                  >
                  <div class="w-5 h-5 relative overflow-hidden z-20">
                    <MoveRight
                      class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
                    />
                    <MoveRight
                      class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Sub-item 2: Third Banner -->
      <div
        class="rounded-[var(--image-border-radius)] relative overflow-hidden group sm:row-start-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <NuxtLink :to="data.values.link_3" class="block h-full">
          <div class="relative h-full">
            <NuxtImg
              :src="imghttps(data.values.image_3.image)"
              :alt="data.values.image_3.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-[var(--overlay)] group-hover:bg-[var(--overlay-hover)] transition-colors duration-300"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-4 text-white text-center"
            >
              <p
                class="text-sm font-medium mb-3 opacity-90 text-[var(--subtitle-color)]"
              >
                {{ data.values.subtitle_3 }}
              </p>
              <h3
                class="text-lg md:text-base font-bold mb-5 leading-tight text-[var(--title-color)]"
              >
                {{ data.values.title_3 }}
              </h3>
              <div
                class="group/btn relative inline-flex items-center gap-3 px-4 py-3 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
              >
                <!-- Sliding background effect -->
                <div
                  class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
                ></div>

                <span
                  class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
                  >{{ data.values.link_text_3 }}</span
                >
                <div class="w-5 h-5 relative overflow-hidden z-20">
                  <MoveRight
                    class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
                  />
                  <MoveRight
                    class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Sub-item 3: Fourth Banner -->
      <div
        class="rounded-[var(--image-border-radius)] relative overflow-hidden group sm:row-start-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <NuxtLink :to="data.values.link_4" class="block h-full">
          <div class="relative h-full">
            <NuxtImg
              :src="imghttps(data.values.image_4.image)"
              :alt="data.values.image_4.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-[var(--overlay)] group-hover:bg-[var(--overlay-hover)] transition-colors duration-300"
            />
            <div
              class="absolute bottom-0 left-0 right-0 p-4 text-white text-center"
            >
              <p
                class="text-sm font-medium mb-3 opacity-90 text-[var(--subtitle-color)]"
              >
                {{ data.values.subtitle_4 }}
              </p>
              <h3
                class="text-lg md:text-base font-bold mb-5 leading-tight text-[var(--title-color)]"
              >
                {{ data.values.title_4 }}
              </h3>
              <div
                class="group/btn relative inline-flex items-center gap-3 px-4 py-3 bg-[var(--cta-background)] text-[var(--cta-color)] hover:text-[var(--cta-color-hover)] rounded-[var(--cta-border-radius)] font-medium text-sm tracking-wide uppercase overflow-hidden transition-all duration-500 ease-out hover:bg-[var(--cta-background-hover)] hover:shadow-2xl hover:-translate-y-2"
              >
                <!-- Sliding background effect -->
                <div
                  class="absolute inset-0 bg-[var(--cta-background-hover)] transform -translate-x-full group-hover:translate-x-0 group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
                ></div>

                <span
                  class="relative z-20 transition-all duration-300 group-hover:text-[var(--cta-color-hover)] group-hover/btn:text-[var(--cta-color-hover)]"
                  >{{ data.values.link_text_4 }}</span
                >
                <div class="w-5 h-5 relative overflow-hidden z-20">
                  <MoveRight
                    class="w-5 h-5 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-0 group-hover/btn:translate-x-8 group-hover/btn:opacity-0 group-hover:text-[var(--cta-color-hover)]"
                  />
                  <MoveRight
                    class="w-5 h-5 absolute top-0 -left-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-8 group-hover:opacity-100 group-hover/btn:translate-x-8 group-hover/btn:opacity-100 group-hover:text-[var(--cta-color-hover)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MoveRight } from "lucide-vue-next";
import { imghttps } from "~/composables/services/helpers";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: [String, Number],
});
</script>
