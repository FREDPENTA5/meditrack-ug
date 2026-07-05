/** API base URL — set VITE_API_URL in production (e.g. https://api.example.com/api/v1) */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? 'https://meditrack-ug.onrender.com/api/v1' : '/api/v1');
