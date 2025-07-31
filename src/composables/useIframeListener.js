// composables/useIframeListener.js
export const useIframeListener = (callback) => {
  const allowedOrigins = [
  	'http://localhost:4500',
  	'http://localhost:4200',
    'https://tiktak.space',
  	'http://127.0.0.1:4500',
    'http://127.0.0.1:4500/',
  	'https://dashboard.tiktak.space',
  	'https://dashboard.tiktakpro.com'
  ];

  const listenForMessages = () => {
    window.addEventListener('message', (event) => {
      console.log(event)
      if (!allowedOrigins.includes(event.origin)) return; // Vérifie si l'origine est autorisée
      callback(event.data); // Renvoie les données reçues
    });
  };

  return { listenForMessages };
};