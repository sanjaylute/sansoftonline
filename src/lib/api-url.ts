const localApiUrl = 'http://localhost:8000/api';
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');

export const apiUrl = configuredApiUrl || (
  process.env.NODE_ENV === 'production' ? '/api' : localApiUrl
);

