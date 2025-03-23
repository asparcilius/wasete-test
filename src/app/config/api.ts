export const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const API_ENDPOINTS = {
  SKIPS_BY_LOCATION: '/skips/by-location',
} as const;

export const API_CONFIG = {
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
  TIMEOUT: 10000, // 10 seconds
} as const; 