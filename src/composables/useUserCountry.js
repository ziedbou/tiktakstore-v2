import { ref, onMounted } from 'vue'

export function useUserCountry() {
  const country = ref(null)
  const countryCode = ref(null)
  const states = ref([]) 
  const error = ref(null)
  const isLoading = ref(false)

  async function fetchCountryAndStates() {
    isLoading.value = true
    try {
      const geoResponse = await $fetch('https://ip-api.com/json/')

      country.value = geoResponse.country
      countryCode.value = geoResponse.countryCode

      if (country.value) {
        // console.log(`Detected country: ${country.value} (${countryCode.value})`)
        const statesResponse = await $fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ country: country.value }),
        })

        if (statesResponse.error) {
          throw new Error(statesResponse.msg)
        }

        states.value = statesResponse.data.states.map((state) =>
          state.name.replace(' Governorate', '')
        )
      }

      // console.log('States:', states.value)
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchCountryAndStates)

  return {
    country,
    countryCode,
    states,
    error,
    isLoading,
    fetchCountryAndStates,
  }
}
