import { ref } from 'vue';
import { useState } from '#app';

export const useCustomToast = () => {
  const toasts = useState('toasts', () => []);
  
  const toastCounter = ref(0);
  
  const showToast = (message, type = 'success', duration = 5000) => {
    const id = `toast-${Date.now()}-${toastCounter.value++}`;

    toasts.value.push({
      id,
      message,
      type, // 'success', 'danger', 'warning'
      isVisible: true,
      timestamp: Date.now()
    });
    
    if (duration > 0) {
      setTimeout(() => {
        closeToast(id);
      }, duration);
    }
    
    return id;
  };
  
  const showSuccess = (message, duration = 5000) => {
    return showToast(message, 'success', duration);
  };
  
  const showError = (message, duration = 5000) => {
    return showToast(message, 'danger', duration);
  };
  
  const showWarning = (message, duration = 5000) => {
    return showToast(message, 'warning', duration);
  };
  
  const closeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };
  
  const clearToasts = () => {
    toasts.value = [];
  };
  
  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    closeToast,
    clearToasts
  };
};