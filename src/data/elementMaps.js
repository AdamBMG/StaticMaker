// Defines adjustable elements per template
// Each element has: id, label, and which properties can be adjusted
// Properties: top/bottom (Y position, px), left/right (X position, px), fontSize (px), height (%)

export const ELEMENT_MAPS = {
  'box-hero': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'feature-points': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'points', label: 'Feature Points', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 2 } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, right: { step: 10 }, height: { step: 2, unit: '%' } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, fontSize: { step: 2 } } },
  ],
  'pricing-tier': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'cards', label: 'Price Cards', props: { top: { step: 10 }, bottom: { step: 10 } } },
  ],
  'testimonial': [
    { id: 'quote', label: 'Quote', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'stars', label: 'Trustpilot Stars', props: { top: { step: 10 }, left: { step: 10 } } },
    { id: 'product', label: 'Product', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'country-grid': [
    { id: 'grid', label: 'Country Grid', props: { top: { step: 10 }, bottom: { step: 10 } } },
    { id: 'headline', label: 'Headline', props: { bottom: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
  ],
  'numbered-steps': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, right: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
    { id: 'steps', label: 'Steps', props: { bottom: { step: 10 }, right: { step: 10 }, fontSize: { step: 2 } } },
  ],
  'typo-wallpaper': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'starter-pack': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'products', label: 'Products', props: { top: { step: 5, unit: '%' }, left: { step: 5, unit: '%' }, size: { step: 2, unit: '%' } } },
  ],
  // Mobile Tutors templates
  'bold-headline': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'logo', label: 'Logo', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 4 } } },
    { id: 'trust', label: 'Trust Badge', props: { top: { step: 10 }, left: { step: 10 }, fontSize: { step: 2 } } },
    { id: 'price', label: 'Price Line', props: { bottom: { step: 10 }, left: { step: 10 }, fontSize: { step: 2 } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, fontSize: { step: 2 } } },
    { id: 'image', label: 'Hero Image', props: { bottom: { step: 10 }, right: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
}
