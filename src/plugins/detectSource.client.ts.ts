export default defineNuxtPlugin(() => {
  if (process.client) {
    const urlParams = new URLSearchParams(window.location.search);

    const utm_source = urlParams.get('utm_source');
    const utm_medium = urlParams.get('utm_medium');
    const utm_campaign = urlParams.get('utm_campaign');
    const utm_term = urlParams.get('utm_term');
    const utm_content = urlParams.get('utm_content');

    const hasUtm = utm_source || utm_medium || utm_campaign || utm_term || utm_content;

    if (hasUtm) {
      const sourceData = {
        source: utm_source || 'unknown',
        medium: utm_medium || '',
        campaign: utm_campaign || '',
        term: utm_term || '',
        content: utm_content || '',
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem('visit_source', JSON.stringify(sourceData));
    } else if (!localStorage.getItem('visit_source')) {
      // Visite directe si pas de UTM
      const sourceData = {
        source: 'direct',
        medium: '',
        campaign: '',
        term: '',
        content: '',
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('visit_source', JSON.stringify(sourceData));
    }
  }
});