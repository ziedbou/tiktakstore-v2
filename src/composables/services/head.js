export function generateHeadData({ storeInfo, companyData, baseURL, cdnURL }) {
  // Generate CSS variables from css_settings
  const generateCSSVariables = () => {
    const cssVars = [];
    const cssSettings = storeInfo.css_settings||{};
    const cssNavSettings = cssSettings.navbar||{
      'header_top_bg': '#f8fafc',
      'header_top_color': '#64748b', 
      'header_top_color_hover': '#3b82f6',
      'header_middle_bg': '#ffffff',
      'header_middle_color': '#1e293b',
      'header_middle_color_hover': '#3b82f6',
  
      'header_bottom_bg': '#1e293b',
      'header_bottom_color': '#f1f5f9',
      'header_bottom_hover': '#3b82f6',
  
      'header_badge_bg': '#ef4444',
      'header_badge_color': '#ffffff',
  
      'header_submenu_link_color': '#475569',
      'header_submenu_link_color_hover': '#3b82f6'
    };
    const cssBtnSettings = cssSettings.buttons||{
       //primary button solid
    'btn_primary_solid_background': '#4f39f6',
    'btn_primary_solid_background_hover': '#432dd7',
    'btn_primary_solid_color': '#ffffff',
    'btn_primary_solid_color_hover': '#ffffff',
    'btn_primary_solid_border_radius': '6px',
    //primary button outline
    'btn_primary_outline_background': 'rgba(0, 0, 0, 0)',
    'btn_primary_outline_background_hover': '#eef2ff',
    'btn_primary_outline_border_color': '#4f39f6',
    'btn_primary_outline_border_color_hover': '#432dd7',
    'btn_primary_outline_color': '#4f39f6',
    'btn_primary_outline_color_hover': '#432dd7',
    'btn_primary_outline_border_radius': '6px',
    };

    // Add font family as CSS variable
    if (cssSettings.font?.css) {
      cssVars.push(`--font-family: ${cssSettings.font.css};`);
    }

    // Generate other CSS variables (except font and font_id)
    Object.keys(cssSettings).forEach(key => {
      if (key === 'font' || key === 'font_id') return;

      const value = cssSettings[key];
      if (value) {
        const cssVarName = key.replace(/_/g, '-');
        cssVars.push(`--${cssVarName}: ${value};`);
      }
    });

     // Dynamically push header design configuration to cssVars
    Object.entries(cssNavSettings).forEach(([key, value]) => {
      const cssVarName = key.replace(/_/g, '-');
      cssVars.push(`--${cssVarName}: ${value};`);
    });
  
    // Dynamically push Buttons design configuration to cssVars
       Object.entries(cssBtnSettings).forEach(([key, value]) => {
        const cssVarName = key.replace(/_/g, '-');
        cssVars.push(`--${cssVarName}: ${value};`);
      });

    return `
      @layer base {
        :root {
          ${cssVars.join('\n          ')}
        }
      }
    `;
  };

  // Generate title: "Company Name | shopDomain description"
  const generateTitle = () => {
    const companyName = companyData?.name || 'Shop';
    const shopDomain = storeInfo?.seo_settings?.shopDomain || '';
    const description = storeInfo?.seo_settings?.description || '';

    if (shopDomain && description) {
      return `${companyName} | ${shopDomain} ${description}`;
    } else if (shopDomain) {
      return `${companyName} | ${shopDomain}`;
    } else {
      return companyName;
    }
  };

  // Meta description is just the description
  const metaDescription = storeInfo?.seo_settings?.description || 'Bienvenue dans notre boutique';

  // Full title for social media
  const fullTitle = generateTitle();

  return {
    title: fullTitle,
    meta: [
      {
        name: 'description',
        content: metaDescription
      },
      {
        name: 'keywords',
        content: storeInfo?.seo_settings?.keywords || 'Bienvenue dans notre boutique'
      },
      {
        name: 'author',
        content: 'tiktak-themes'
      },
      {
        property: 'og:title',
        content: fullTitle
      },
      {
        property: 'og:description',
        content: metaDescription
      },
      {
        name: 'twitter:title',
        content: fullTitle
      },
      {
        name: 'twitter:description',
        content: metaDescription
      }
    ],
    link: [
      // Google Fonts preconnect links
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      },
      // Dynamic Google Font from API
      {
        rel: 'stylesheet',
        href: `https://fonts.googleapis.com/css2?family=${storeInfo?.css_settings?.font?.link}&display=swap`
      },
      // Company-specific CSS
      {
        rel: 'stylesheet',
        href: `${baseURL}website/main.css/?slug=${companyData?.slug}`,
        key: `${companyData?.slug}-custom-css`
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${cdnURL}website/favicon.ico/?slug=${companyData?.slug}`,
      },
    ],
    style: [
      {
        key: `${companyData?.slug}-css-vars`,
        children: generateCSSVariables
      }
    ]
  };
}

