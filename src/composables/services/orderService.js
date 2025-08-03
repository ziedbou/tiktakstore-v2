// orderService.js

import { displayLoading, hideLoading } from './helpers'
import { getCartFromStorage } from './cartService'
import { getPriceOfProduct } from './helpers'
import axios from 'axios'

/**
 * Crée une commande classique
 */
// export async function createOrder(order, cart, companyId, apiUrl, { token = null, onlinePayment = true, createAccount = false } = {}) {
//   try {
//     if (!cart._details.length) {
//       alert('Panier vide')
//       return
//     }

//     displayLoading()

//     const { default: axios } = await import('axios')
//     const headers = token ? { Authorization: `Token ${token}` } : {}

//     const payload = {
//       abandonned_cart: localStorage.getItem('abandonned_cart'),
//       order: {
//         ...order,
//         transport_id: cart.transport ? cart.transport.id : null,
//         total_amount: cart.total_amount,
//         _details: cart._details.filter(x => x.quantity > 0),
//       },
//       promo_code: cart.promoCode || '',
//       company: companyId,
//       create_account: createAccount,
//     }

//     const response = await axios.post(`${apiUrl}create-fast-order/`, payload, { headers })

//     hideLoading()

//     if (response.status === 200) {
//       const { payment, order_ref, upsell_id } = response.data

//       // Paiement en ligne
//       if (order.payement_type === 'ONLINE' && payment?.payUrl && onlinePayment) {
//         window.location.href = payment.payUrl
//       }
//       // Upsell
//       else if (upsell_id) {
//         clearCart(cart)
//         window.location.href = `/upsell/${upsell_id}/${order_ref}`
//       }
//       // Confirmation classique
//       else {
//         clearCart(cart)
//         window.location.href = `/checkout-confirmation/${order_ref}`
//       }
//     } else {
//       alert('Erreur lors de la création de commande')
//     }
//   } catch (error) {
//     hideLoading()
//     console.error('Erreur createOrder:', error)
//     alert('Erreur lors de la création de commande')
//   }
// }

/**
 * Crée une commande rapide express
 */
// export async function quickOrderCheckout(order, cart, companyId, apiUrl, options = {}) {
//   await createOrder(order, cart, companyId, apiUrl, options)
// }

/**
 * Crée un abandoned cart
 */
// export async function createOrderAbandoned(order, cart, companyId, apiUrl, { token = null, createAccount = false } = {}) {
//   try {
//     const { default: axios } = await import('axios')
//     const headers = token ? { Authorization: `Token ${token}` } : {}

//     const payload = {
//       is_abandoned_cart: true,
//       order: {
//         ...order,
//         transport_id: cart.transport ? cart.transport.id : null,
//         total_amount: cart.total_amount,
//         _details: cart._details.filter(x => x.quantity > 0),
//       },
//       promo_code: cart.promoCode || '',
//       company: companyId,
//       create_account: createAccount,
//     }

//     const response = await axios.post(`${apiUrl}create-fast-order/`, payload, { headers })

//     if (response.status === 200 && response.data.order_ref) {
//       localStorage.setItem('abandonned_cart', response.data.order_ref)
//     }
//   } catch (error) {
//     console.error('Erreur createOrderAbandoned:', error)
//   }
// }

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




export const createAbandonnedOrder = async (product = null, formData) => {

  const {selectedVariant} = useSelectedVariant()
  const {quantity} = useProductQuantity()
  const {companyData} = useCompanyData()

  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  let productDetail = {};
  const cart = getCartFromStorage();
  const orderSummary = () => {
  if (!cart) {
    return {
      subtotal: 0,
      shipping: 0,
      discount: 0,
      transport_price: 0,
      total: 0,
    };
  }

  return {
    subtotal: parseFloat(cart.subtotal || 0),
    shipping: parseFloat(cart.transport_price || 0),
    discount: parseFloat(cart.discount || 0),
    transport_price: parseFloat(cart.transport_price || 0),
    total: parseFloat(cart.total || 0),
  };
};

  try {
      const details = cart?._details?.map(item => {
        const { _product, ...itemWithoutProduct } = item;
        return itemWithoutProduct;
      }) || []
      if (product) {
        const finalProduct = product.declinaison == true && product.declinaisons.length > 0 ? selectedVariant.value : product;
        const unit_price = getPriceOfProduct(product, quantity.value);
        productDetail = {
          _product: finalProduct,
          quantity: quantity.value,
          product_name: finalProduct.name,
          product_id: finalProduct.id,
          product_parent_id: finalProduct.parent || finalProduct.id,
          category_id: finalProduct.category,
          product_ref: finalProduct.reference,
          active_stock: finalProduct.active_stock,
          price_ttc: finalProduct.price,
          price_ttc_after_discount: unit_price,
          final_price: unit_price * quantity.value,
          discount: finalProduct.price - unit_price,
          product_attrs: finalProduct._attributs?.map(x => x.name).join(' ') || '',
          product_thumb: finalProduct.photo_thumb,
        };
    }

    const requestData = {
      abandonned_cart: true ,
      order: {
        email: formData.email || "",
        name: formData.name || "",
        contact: formData.contact || "",
        gouvernorat: formData.gouv || "",
        delegation: formData.delegation || "",
        address: formData.address || "",
        code_postal: formData.zip || "",
        phone: formData.phone || "",
        phone_extra: formData.phone_extra || "",
        country: formData.country?.name || "",
        comment: formData.comment || "",
        payement_type: 'CASH',
        transport_id: cart?.transport_id || null,
        total_amount: orderSummary.total || 0,
        _details: [ ...(product ? [productDetail] : [] ) ,...details] 
      },
      promo_code: cart ? (cart.promoCode === "autopromo" ? "" : cart.promoCode || "") : "",
      company: companyData.value.id,
      create_account: formData.create_account || false,
      source: "SITE V2",
      meta_data: JSON.parse(localStorage.getItem('visit_source'))
    };

    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const response = await axios.request({
      url: baseURL + 'create-fast-order/',
      method: 'POST',
      headers: headerConfig,
      data: requestData,
    });

  if (response.status === 200 && response.data.order_ref) {
    localStorage.setItem('abandonned_cart', response.data.order_ref)
  } else {
      throw new Error('Order creation failed');
    }
  } catch (error) {
    console.error('Erreur createOrderAbandoned:', error)
  } finally {
  }
};

