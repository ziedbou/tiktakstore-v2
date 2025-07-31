import { defineStore } from 'pinia';

export const useIframeStore = defineStore('iframe', {
  state: () => ({
    receivedData: process.client ? JSON.parse(localStorage.getItem('receivedData')) || null : null,
  }),
  actions: {
    setReceivedData(data) {
      this.receivedData = data;
      if (process.client) {
        localStorage.setItem('receivedData', JSON.stringify(data)); // Utilise localStorage uniquement côté client
      }
    },
  },
});