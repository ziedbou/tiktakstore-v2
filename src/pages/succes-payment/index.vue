<template>
    <div class="flex items-center justify-center min-h-fit py-20 px-5 bg-gradient-to-r from-indigo-50 to-blue-50 ">
    <div class="w-full max-w-2xl p-4 bg-white shadow-2xl sm:p-10 sm:rounded-3xl">
        <div class="text-center">
            <div class="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full ">
                <svg class="h-12 w-12 text-green-600 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                </svg>
            </div>
            <h1 class="text-4xl font-extrabold text-green-700 ">Paiement Réussi !</h1>
            <p class="mt-4 text-lg text-gray-800 ">
                Merci pour votre achat.
            </p>
            <p class="mt-4 text-sm text-gray-700 ">
                Si vous avez des questions ou besoin d'une assistance supplémentaire, n'hésitez pas à nous contacter à :
                <a href="mailto:admin@eliteai.tools" class="font-medium text-indigo-600 underline">
                    {{ email }}
                </a>
            </p>
        </div>
        <div class="mt-8 text-center">
            <a href="/"
                class="inline-block px-6 py-2 text-lg font-medium text-white transition-transform rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-600 hover:scale-105 hover:from-indigo-700 hover:to-indigo-700 ">
                Retour à l'accueil
            </a>
        </div>
    </div>
</div>
</template>

<script setup>
    const {companyData} = useCompanyData()

    const email = ref(companyData.value.email)
</script>