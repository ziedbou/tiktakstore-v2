// orderService.js

import { displayLoading, hideLoading } from '@/helpers/helpers'
import { clearCart } from '@/services/cartService'

/**
 * Crée une commande classique
 */
export async function createOrder(order, cart, companyId, apiUrl, { token = null, onlinePayment = true, createAccount = false } = {}) {
  try {
    if (!cart._details.length) {
      alert('Panier vide')
      return
    }

    displayLoading()

    const { default: axios } = await import('axios')
    const headers = token ? { Authorization: `Token ${token}` } : {}

    const payload = {
      abandonned_cart: localStorage.getItem('abandonned_cart'),
      order: {
        ...order,
        transport_id: cart.transport ? cart.transport.id : null,
        total_amount: cart.total_amount,
        _details: cart._details.filter(x => x.quantity > 0),
      },
      promo_code: cart.promoCode || '',
      company: companyId,
      create_account: createAccount,
    }

    const response = await axios.post(`${apiUrl}create-fast-order/`, payload, { headers })

    hideLoading()

    if (response.status === 200) {
      const { payment, order_ref, upsell_id } = response.data

      // Paiement en ligne
      if (order.payement_type === 'ONLINE' && payment?.payUrl && onlinePayment) {
        window.location.href = payment.payUrl
      }
      // Upsell
      else if (upsell_id) {
        clearCart(cart)
        window.location.href = `/upsell/${upsell_id}/${order_ref}`
      }
      // Confirmation classique
      else {
        clearCart(cart)
        window.location.href = `/checkout-confirmation/${order_ref}`
      }
    } else {
      alert('Erreur lors de la création de commande')
    }
  } catch (error) {
    hideLoading()
    console.error('Erreur createOrder:', error)
    alert('Erreur lors de la création de commande')
  }
}

/**
 * Crée une commande rapide express
 */
export async function quickOrderCheckout(order, cart, companyId, apiUrl, options = {}) {
  await createOrder(order, cart, companyId, apiUrl, options)
}

/**
 * Crée un abandoned cart
 */
export async function createOrderAbandoned(order, cart, companyId, apiUrl, { token = null, createAccount = false } = {}) {
  try {
    const { default: axios } = await import('axios')
    const headers = token ? { Authorization: `Token ${token}` } : {}

    const payload = {
      is_abandoned_cart: true,
      order: {
        ...order,
        transport_id: cart.transport ? cart.transport.id : null,
        total_amount: cart.total_amount,
        _details: cart._details.filter(x => x.quantity > 0),
      },
      promo_code: cart.promoCode || '',
      company: companyId,
      create_account: createAccount,
    }

    const response = await axios.post(`${apiUrl}create-fast-order/`, payload, { headers })

    if (response.status === 200 && response.data.order_ref) {
      localStorage.setItem('abandonned_cart', response.data.order_ref)
    }
  } catch (error) {
    console.error('Erreur createOrderAbandoned:', error)
  }
}

/**
 * Envoie un SMS de confirmation au client
 */
export async function sendSMSConfirmation(orderCode, companyId, apiUrl) {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.post(`${apiUrl}send-sms-client-confirmation`, {
      order: orderCode,
      company: companyId,
    })

    return response.data?.verifcation === true
  } catch (error) {
    console.error('Erreur sendSMSConfirmation:', error)
    return false
  }
}

/**
 * Vérifie le code OTP (validation commande)
 */
export async function verifyOTP(code, companyId, apiUrl) {
  try {
    const { default: axios } = await import('axios')

    const response = await axios.post(`${apiUrl}verify-otp`, {
      code,
      company: companyId,
    })

    return response.data?.verifcation === true
  } catch (error) {
    console.error('Erreur verifyOTP:', error)
    return false
  }
}


