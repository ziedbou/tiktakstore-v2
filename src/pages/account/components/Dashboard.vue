<template>
    
    <div v-if="userInfo">
        <div >
          <h1 class="text-xl md:text-xl  font-bold text-gray-800 gap-2 flex items-center  "><LayoutDashboard/> Tableau de board</h1>

        </div>
        <div class="flex flex-row items-center justify-between md:hidden">
            <div class="-mx-6 ">
                <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-lg font-semibold text-gray-700 "
                tabindex="0"
                >
                <img
                    class="size-8 rounded-full bg-gray-100"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <span >{{userInfo?.customer?.name}}</span>
                </a>
            </div>
            <a
                @click.prevent="handleLogout"
                class="
                    ' bg-red-100 hover:bg-red-200 text-red-500 group flex  gap-x-3 rounded-md p-2 text-sm/6 font-semibold focus:outline-none '
                "
                >
                <LogOut  class="size-6 shrink-0"  />
                Se Déconnecter
            </a>
        </div>

        <main class="">
            <p class="text-gray-600 px-2 text-sm mt-4">À partir du tableau de bord de votre compte, vous pouvez consulter vos dernières .</p>
            
        </main>
    </div>
</template>

<script setup>
import { LayoutDashboard, LogOut } from 'lucide-vue-next';

    const router = useRouter();

    defineProps({
        userInfo: {
            required: true,
            type: Object
        }
    })

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('_token')
        router.push('/login')
    }
</script>