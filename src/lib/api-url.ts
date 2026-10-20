const localApiUrl = 'http://localhost:8000/api';

export const apiUrl = process.env.NODE_ENV === 'production'
  ? '/api'
  : process.env.NEXT_PUBLIC_API_URL || localApiUrl;

