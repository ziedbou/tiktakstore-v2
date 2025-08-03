export const useFullUrl = () => {
  if (process.server) {
    // Server-side: Use useRequestEvent or useRequestURL
    const event = useRequestEvent();
    if (event) {
      const req = event.node.req;
      const protocol = req.headers['x-forwarded-proto'] || (req.connection.encrypted ? 'https' : 'http');
      const host = req.headers.host || 'localhost';
      const path = req.url || '/';
      return `${protocol}://${host}${path}`;
    }
  }
  // Client-side: Use window.location.href
  if (process.client) {
    return window.location.href;
  }
  // Fallback
  return '';
};