// addressService.js

/**
 * API - Ajouter une nouvelle adresse pour l'utilisateur
 */
export async function addAddress(apiUrl, token, customerId) {
  const { default: axios } = await import('axios')

  const address = {
    id: null,
    title: 'Nouvelle adresse',
    address: 'Adresse',
    default: false,
    code_tva: '',
    gouvernorat: 'Ariana',
    delegation: 'Ariana',
    contact: '',
    code_postal: '',
    phone: '',
    phone_extra: '',
    customer: customerId,
  }

  const response = await axios.post(`${apiUrl}website/addresses/`, address, {
    headers: { Authorization: `Token ${token}` }
  })

  return response.data
}

/**
 * API - Modifier une adresse existante
 */
export async function updateAddress(apiUrl, token, address) {
  const { default: axios } = await import('axios')

  const response = await axios.patch(`${apiUrl}website/addresses/${address.id}/`, address, {
    headers: { Authorization: `Token ${token}` }
  })

  return response.data
}

/**
 * API - Supprimer une adresse
 */
export async function deleteAddress(apiUrl, token, addressId) {
  const { default: axios } = await import('axios')

  await axios.delete(`${apiUrl}website/addresses/${addressId}/`, {
    headers: { Authorization: `Token ${token}` }
  })

  return true
}

/**
 * API - Mettre à jour les données du client
 */
export async function updateCustomer(apiUrl, token, customerData) {
  const { default: axios } = await import('axios')

  const response = await axios.post(`${apiUrl}website/customer-update/`, customerData, {
    headers: { Authorization: `Token ${token}` }
  })

  return response.data
}

