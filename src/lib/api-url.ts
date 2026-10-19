const localApiUrl = 'http://localhost:8000/api';
const productionApiUrl = 'https://api.sansoftonline.com/api';

export const apiUrl = process.env.NEXT_PUBLIC_API_URL
  || (process.env.NODE_ENV === 'production' ? productionApiUrl : localApiUrl);

