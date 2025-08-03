export function getSlugOrServer(url: string) {
  let host = url.split('://')[1]?.split(':')[0] || url;
  host = host.replace('www.', '');
  // Extract the main domain part before any port or path
  const domain = host.split('/')[0];
  // Check for tiktak-store or tiktak-preview in the domain
  if (domain.includes('tiktak-store') || domain.includes('tiktak-preview')) {
    // Extract the slug before the first dot
    const slug = domain.split('.')[0];
    return [slug, 'slug'];
  } else {
    return [domain, 'server'];
  }
}

// Cache TTL in seconds
const COMPANY_ID_CACHE_TTL = 3600; // 1 hour
const SITEMAP_CACHE_TTL = 1800; // 30 minutes

async function getCompanyId(
  identifier: string,
  type: string
): Promise<string> {
  const cacheKey = `company-id:${type}:${identifier}`;

  // Try to get company ID from Nitro storage cache first
  const cachedId = (await useStorage("cache").getItem(
    cacheKey
  )) as string | null;
  if (cachedId) {
    //console.log(`Using cached company ID for ${identifier}`);
    return cachedId;
  }

  // Fetch from API
  //console.log(`Fetching company ID for ${identifier} from API`);
  const ENDPOINT_API = useRuntimeConfig().public.baseURL;
  const companyApiUrl = `${ENDPOINT_API}get-store/?${type}=${identifier}`;

  const companyResponse = (await $fetch(companyApiUrl)) as { id?: string };

  if (!companyResponse?.id) {
    throw new Error("Company not found");
  }

  // Cache only the company ID using Nitro storage with TTL
  await useStorage("cache").setItem(cacheKey, companyResponse.id, {
    ttl: COMPANY_ID_CACHE_TTL,
  });

  return companyResponse.id;
}

async function getSitemapData(companyId: string): Promise<string> {
  const cacheKey = `sitemap:${companyId}`;

  // Try to get from Nitro storage cache first
  const cached = (await useStorage("cache").getItem(cacheKey)) as string | null;
  if (cached) {
    //console.log(`Using cached sitemap data for company ${companyId}`);
    return cached;
  }

  // Fetch from API
  //console.log(`Fetching sitemap data for company ${companyId} from API`);
  const ENDPOINT_API = useRuntimeConfig().public.baseURL;
  const sitemapUrl = `${ENDPOINT_API}website/company-sitemap/?company=${companyId}`;

  const sitemapData = (await $fetch(sitemapUrl)) as string;

  // Cache the result using Nitro storage with TTL
  await useStorage("cache").setItem(cacheKey, sitemapData, {
    ttl: SITEMAP_CACHE_TTL,
  });

  return sitemapData;
}

export default defineEventHandler(async (event) => {
  try {
    // Get the request URL to determine the company
    const requestUrl = getRequestURL(event);
    const host = requestUrl.host;

    // Extract company identifier from host (same logic as useCompanyData)
    const [identifier, type] = getSlugOrServer(host);

    // Get company ID (with caching)
    const companyId = await getCompanyId(identifier, type);

    // Get sitemap data (with caching)
    const sitemapData = await getSitemapData(companyId);

    // Set the appropriate headers for XML content
    setHeader(event, "Content-Type", "application/xml; charset=utf-8");
    setHeader(event, "Cache-Control", "public, max-age=1800"); // Cache for 30 minutes

    // Return the XML sitemap data
    return sitemapData;
  } catch (error) {
    console.error("Sitemap error:", error);

    // Return a basic sitemap if there's an error
    const requestUrl = getRequestURL(event);
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

    setHeader(event, "Content-Type", "application/xml; charset=utf-8");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  }
});

/*
export default defineEventHandler(async (event) => {
  try {
    // Get the request URL to determine the company
    const requestUrl = getRequestURL(event)
    const host = requestUrl.host
    
    // Function to extract company identifier from host (similar to useCompanyData)
    function getSlugOrServer(url) {
      let hostName = url.replace('www.', '');
      if (!hostName.includes('tiktak-store')) {
        return [hostName, 'server'];
      } else {
        const slug = hostName.split('.')[0];
        return [slug, 'slug'];
      }
    }

    // Get company data first to get the company ID
    const [identifier, type] = getSlugOrServer(host)
    const ENDPOINT_API = process.env.BASE_URL || 'https://api.tiktak.space/api/v1/'
    const companyApiUrl = `${ENDPOINT_API}get-store/?${type}=${identifier}`
    
    // Fetch company data
    const companyResponse = await $fetch(companyApiUrl)
    const companyId = companyResponse?.id
    
    if (!companyId) {
      throw new Error('Company not found')
    }
    
    // Fetch sitemap from the external API
    const sitemapUrl = `${ENDPOINT_API}website/company-sitemap/?company=${companyId}`
    const sitemapData = await $fetch(sitemapUrl)
    
    // Set the appropriate headers for XML content
    setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    setHeader(event, 'Cache-Control', 'public, max-age=3600') // Cache for 1 hour
    
    // Return the XML sitemap data
    return sitemapData
    
  } catch (error) {
    console.error('Sitemap error:', error)
    
    // Return a basic sitemap if there's an error
    const requestUrl = getRequestURL(event)
    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`
    
    setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
  }
}) */
