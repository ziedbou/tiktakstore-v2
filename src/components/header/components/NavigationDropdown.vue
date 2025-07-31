<template>
  <!-- First Level Dropdown -->
  <div class="dropdown absolute left-0 top-full w-64 bg-white rounded-2xl shadow-2xl py-3 z-50" :class="marginTop">
      <div class="dropdown-header px-4 py-2 text-sm font-semibold border-b border-gray-200">
        {{ category.name }}
      </div>

      <!-- Submenu items -->
      <template v-for="submenu in category.submenu" :key="submenu.slug">
        <!-- Submenu item without nested dropdown -->
        <template v-if="!submenu.submenu || submenu.submenu.length === 0">
          <!-- External submenu link -->
          <a
            v-if="submenu.type === 'extern'"
            :href="submenu.href"
            :title="submenu.label"
            target="_blank"
            rel="noopener noreferrer"
            class="dropdown-link block px-4 py-3 text-sm transition-all duration-200"
          >
            {{ submenu.label }}
            <Icon name="ph:arrow-square-out" class="w-3 h-3 inline ml-1 opacity-50" />
          </a>
          <!-- Internal submenu link -->
          <NuxtLink 
            v-else
            :to="submenu.href" 
            :title="submenu.label"
            class="dropdown-link block px-4 py-3 text-sm transition-all duration-200"
          >
            {{ submenu.label }}
          </NuxtLink>
        </template>
        
        <!-- Submenu item with nested dropdown -->
        <div v-else class="dropdown-item relative">
          <!-- External submenu link with dropdown -->
          <a
            v-if="submenu.type === 'extern'"
            :href="submenu.href"
            :title="submenu.label"
            target="_blank"
            rel="noopener noreferrer"
            class="dropdown-link flex items-center justify-between px-4 py-3 text-sm transition-all duration-200"
          >
            <span>{{ submenu.label }}
              <Icon name="ph:arrow-square-out" class="w-3 h-3 inline ml-1 opacity-50" />
            </span>
            <Icon name="ph:caret-right" class="w-4 h-4" />
          </a>
          <!-- Internal submenu link with dropdown -->
          <NuxtLink 
            v-else
            :to="submenu.href" 
            :title="submenu.label"
            class="dropdown-link flex items-center justify-between px-4 py-3 text-sm transition-all duration-200"
          >
            <span>{{ submenu.label }}</span>
            <Icon name="ph:caret-right" class="w-4 h-4" />
          </NuxtLink>
          
                     <!-- Second Level Dropdown (Sub-submenus) -->
           <div class="nested-dropdown absolute left-full top-0 ml-1 w-56 bg-white rounded-2xl shadow-2xl py-3 z-50">
            <div class="dropdown-header px-4 py-2 text-sm font-semibold border-b border-gray-200">
              {{ submenu.label }}
            </div>
            <template v-for="subSubmenu in submenu.submenu" :key="subSubmenu.slug">
              <!-- External sub-submenu link -->
              <a
                v-if="subSubmenu.type === 'extern'"
                :href="subSubmenu.href"
                :title="subSubmenu.label"
                target="_blank"
                rel="noopener noreferrer"
                class="nested-dropdown-link block px-4 py-3 text-sm transition-all duration-200"
              >
                {{ subSubmenu.label }}
                <Icon name="ph:arrow-square-out" class="w-3 h-3 inline ml-1 opacity-50" />
              </a>
              <!-- Internal sub-submenu link -->
              <NuxtLink 
                v-else
                :to="subSubmenu.href" 
                :title="subSubmenu.label"
                class="nested-dropdown-link block px-4 py-3 text-sm transition-all duration-200"
              >
                {{ subSubmenu.label }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </template>
    </div>
</template>

<script setup>
// Define props
const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  marginTop: {
    type: String,
    default: 'mt-4' // Default spacing, can be mt-2, mt-4, mt-6, mt-8, mt-10, etc.
  }
})
</script>

<style scoped>
/* Dropdown navigation styles */
.dropdown {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-container:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* Keep submenu item hover state when nested dropdown is active */
.dropdown-item:hover .nested-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

/* Enhanced submenu hover state maintenance */
.dropdown-item:hover > a,
.dropdown-item:hover > .dropdown-link {
  background-color: rgba(59, 130, 246, 0.1) !important;
  color: var(--header-middle-color-hover, #3b82f6) !important;
}

/* Create invisible hover bridge between dropdown item and nested dropdown */
.dropdown-item {
  position: relative;
}

.dropdown-item::after {
  content: '';
  position: absolute;
  top: 0;
  right: -6px;
  width: 6px;
  height: 100%;
  background: transparent;
  z-index: 1;
}

/* Extend hover area to include the bridge */
.dropdown-item:hover::after {
  right: -280px; /* Covers the gap to nested dropdown */
  width: 286px;
}

.nested-dropdown {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dropdown header styling */
.dropdown-header {
  color: var(--header-submenu-link-color, #1f2937) !important;
}

/* Dropdown menu default text color and hover effects */
.dropdown-link {
  color: var(--header-submenu-link-color, #1f2937) !important;
}

.dropdown-link:hover {
  background-color: rgba(59, 130, 246, 0.05) !important;
  color: var(--header-submenu-link-color-hover, #3b82f6) !important;
}

/* Nested dropdown menu default text color and hover effects */
.nested-dropdown-link {
  color: var(--header-submenu-link-color, #1f2937) !important;
}

.nested-dropdown-link:hover {
  background-color: rgba(59, 130, 246, 0.05) !important;
  color: var(--header-submenu-link-color-hover, #3b82f6) !important;
}

/* Chevron rotation */
.chevron {
  transition: transform 0.3s ease;
}

.dropdown-container:hover .chevron {
  transform: rotate(180deg);
}

/* Navigation link base styles - inherit from parent */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  opacity: 0.8;
}

/* Header-specific overrides */
/* For Header3 - bottom navigation */
.header-bottom .nav-link::after {
  background: var(--header-bottom-hover, #06b6d4);
}

.header-bottom .nav-link:hover {
  color: var(--header-bottom-hover, #06b6d4) !important;
  opacity: 1;
}

.header-bottom .dropdown-container:hover .nav-link {
  color: var(--header-bottom-hover, #06b6d4) !important;
}

/* For Header4 - fashion design */
.header4-style .nav-link {
  color: #ffffff;
}

.header4-style .nav-link::after {
  background: #ffffff;
}

.header4-style .nav-link:hover {
  color: #ffffff;
  opacity: 0.8;
}

/* For Header4 when sticky */
.header4-style.sticky-header .nav-link {
  color: var(--header-middle-color, #1f2937);
}

.header4-style.sticky-header .nav-link::after {
  background: var(--header-middle-color-hover, #3b82f6);
}

.header4-style.sticky-header .nav-link:hover {
  color: var(--header-middle-color-hover, #3b82f6);
  opacity: 1;
}
</style> 