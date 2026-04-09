// Defines adjustable elements per template
// Each element has: id, label, and which properties can be adjusted
// Properties: top/bottom (Y position, px), left/right (X position, px), scale (%), height (%)

export const ELEMENT_MAPS = {
  'box-hero': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'feature-points': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'points', label: 'Feature Points', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, right: { step: 10 }, height: { step: 2, unit: '%' } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
  ],
  'pricing-tier': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'cards', label: 'Price Cards', props: { top: { step: 10 }, bottom: { step: 10 } } },
  ],
  'testimonial': [
    { id: 'quote', label: 'Quote', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'stars', label: 'Trustpilot Stars', props: { top: { step: 10 }, left: { step: 10 } } },
    { id: 'product', label: 'Product', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'country-grid': [
    { id: 'grid', label: 'Country Grid', props: { top: { step: 10 }, bottom: { step: 10 } } },
    { id: 'headline', label: 'Headline', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
  ],
  'numbered-steps': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, right: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
    { id: 'steps', label: 'Steps', props: { bottom: { step: 10 }, right: { step: 10 }, scale: { step: 5, unit: '%' } } },
  ],
  'typo-wallpaper': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'box', label: 'Product Box', props: { bottom: { step: 10 }, left: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'starter-pack': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'products', label: 'Products', props: { top: { step: 5, unit: '%' }, left: { step: 5, unit: '%' }, size: { step: 2, unit: '%' } } },
  ],
  // Mobile Tutors templates
  'bold-headline': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'logo', label: 'Logo', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'trust', label: 'Trust Badge', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'price', label: 'Price Line', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'image', label: 'Hero Image', props: { bottom: { step: 10 }, right: { step: 10 }, height: { step: 2, unit: '%' } } },
  ],
  'testimonial': [
    { id: 'headline', label: 'Quote', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'logo', label: 'Logo', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'trust', label: 'Trust / Attribution', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
  ],
  'guarantee-results': [
    { id: 'headline', label: 'Headline', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'logo', label: 'Logo', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'trust', label: 'Trust Badge', props: { top: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'price', label: 'Price Line', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
    { id: 'cta', label: 'CTA Button', props: { bottom: { step: 10 }, left: { step: 10 }, scale: { step: 5, unit: '%' } } },
  ],
}
