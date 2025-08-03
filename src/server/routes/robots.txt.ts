export default defineEventHandler((event) => {
  const url = new URL(getRequestURL(event));
  const baseDomain = `${url.protocol}//${url.host}`; 
  return `
    User-agent: *
    Allow: /
    Disallow: /admin
    Sitemap: ${baseDomain}/sitemap.xml
  `;
});