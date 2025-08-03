<template>
    <main v-if="userToken.length > 0" class=" container-medium md:flex md:flex-row ">
      <div class="flex grow flex-col gap-y-5 w-[300px] pt-5 overflow-y-autopx-6 max-md:hidden border-gray-200 min-h-[50vh]">
        <nav class="bg-white border border-gray-200 rounded-xl shadow p-6 mb-4 flex flex-1 flex-col  ">
          <ul role="list" class="flex flex-1 flex-col gap-y-7 ">
            <li>
              
              <ul role="list" class="-mx-2 space-y-1">
                <li class="ml-2">
                  <a
                    href="#"
                    class="flex items-center gap-x-4 py-3 text-sm font-semibold text-gray-700 "
                    tabindex="0"
                    >
                    <img
                        class="size-8 rounded-full bg-gray-100"
                        src="../../assets/images/user.png"
                        alt=""
                    />
                    <span >{{userInfo?.customer?.name}}</span>
                  </a>
                </li>
                <li v-for="item in navigation" :key="item.name">
                  <a
                    :href="item.href"
                    @click.prevent="setActive(item.name)"
                    @keydown.enter.prevent="setActive(item.name)"
                    :class="[
                      item.current ? ' text-gray-900' : 'text-gray-600 ',
                      'group flex gap-x-3 rounded-md p-2 text-sm  focus:outline-none items-center'
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                    tabindex="0"
                  >
                    <div v-if="item.current" class="w-1 h-1 rounded-full bg-gray-600"></div>
                    <component :is="item.icon" class="size-4 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
                <li class="">
                  <a
                    @click.prevent="handleLogout"
                    class="
                      '  hover:bg-red-100 duration-150 text-red-500  mt-3 mb-5 group flex gap-x-3 rounded-md p-2 text-sm  focus:outline-none '
                    "
                  >
                    <LogOut  class="size-6 shrink-0 "  />
                    Se Déconnecter
                  </a>
                </li>
              </ul>
            </li>
            
          </ul>
        </nav>
      </div>
  
      <div class="pb-6 w-full">
         <div class="flex flex-row items-center justify-between md:hidden">
            <div class="-mx-6 ">
                <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-lg font-semibold text-gray-700 "
                tabindex="0"
                >
                <img
                    class="size-8 rounded-full bg-gray-100"
                    src="../../assets/images/user.png"
                    alt=""
                />
                <span >{{userInfo?.customer?.name}}</span>
                </a>
            </div>
            <a
                @click.prevent="handleLogout"
                class="
                    '  text-red-500 group flex  gap-x-3 rounded-md p-2 text-sm/6 font-semibold focus:outline-none '
                "
                >
                Se Déconnecter
            </a>
        </div>
        <h1 class="sr-only">Account Settings</h1>
  
        <header class="border-b border-gray-200 md:hidden">
          <nav class="flex overflow-x-auto py-2">
            <ul
              role="list"
              class="flex min-w-full flex-none gap-x-6 px-4 text-md font-semibold text-gray-600 sm:px-6 lg:px-8"
            >
              <li v-for="item in navigation" :key="item.name">
                <a
                  :href="item.href"
                  @click.prevent="setActive(item.name)"
                  @keydown.enter.prevent="setActive(item.name)"
                  class="flex items-center"
                  :class="item.current ? 'text-blue-600' : ''"
                  :aria-current="item.current ? 'page' : undefined"
                  tabindex="0"
                >
                  <component
                    :is="item.icon"
                    class="size-4 mr-1 inline-block"
                    :class="item.current ? 'text-blue-600' : ''"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </li>
            </ul>
          </nav>
        </header>
  
        <div class="md:bg-white md:border mt-5 md:ml-2 bg-white md:border-gray-200 md:rounded-xl md:shadow md:p-6 divide-y min-w-full  min-h-[40vh] divide-gray-200 p-4 px-2  md:p-8">
          <component :is="activeComponent" :userInfo="userInfo" :userToken="userToken" />
        </div>
      </div>
    </main>
      <div v-else class="min-h-[80vh]"></div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { Archive, LayoutDashboard, LogOut, MapPinHouse, SquareUserRound } from 'lucide-vue-next';
  import Dashboard from './components/Dashboard.vue';
  import Orders from './components/Orders.vue';
  import Adresses from './components/Adresses.vue';
  import Details from './components/Details.vue';
  
  const router = useRouter();
  const navigation = ref([
    // { name: 'Tableau de board', href: '#', icon: LayoutDashboard, current: true },
    { name: 'Commandes', href: '#', icon: Archive, current: true },
    { name: 'Adresses', href: '#', icon: MapPinHouse, current: false },
    { name: 'Détails du compte', href: '#', icon: SquareUserRound, current: false },
  ]);
  
  const activeComponent = computed(() => {
    const activeItem = navigation.value.find((item) => item.current);
    switch (activeItem?.name) {
      case 'Tableau de board':
        return Dashboard;
      case 'Commandes':
        return Orders;
      case 'Adresses':
        return Adresses;
      case 'Détails du compte':
        return Details;
      default:
        return Dashboard; 
    }
  });

  const setActive = (name) => {
    navigation.value.forEach((item) => {
      item.current = item.name === name;
    });
  };


  const userInfo =ref("")
  const userToken =ref("")

  
  if (import.meta.client) {

    if (localStorage.getItem('user') && localStorage.getItem('_token')) {
      userInfo.value = JSON.parse( localStorage.getItem('user'))
      // console.log(JSON.stringify(userInfo.value.customer.addresses, null, 2))
      userToken.value = localStorage.getItem('_token')
    }
    else {
      
      router.push('/login')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('_token')
    router.push('/login')
  }
  
  </script>