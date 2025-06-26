// Site information
export const SITE_TITLE = 'AgenixHub';
export const SITE_DESCRIPTION = 'Modern solutions for your digital transformation';
export const SITE_URL = import.meta.env.SITE || 'https://agenixhub.com';

// Navigation links
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/agenixhub',
  github: 'https://github.com/agenixhub',
  linkedin: 'https://linkedin.com/company/agenixhub',
};

// Default SEO configuration
export const SEO_CONFIG = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_TITLE,
  },
  twitter: {
    handle: '@agenixhub',
    site: '@agenixhub',
    cardType: 'summary_large_image',
  },
};
