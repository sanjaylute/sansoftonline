import type { NextConfig } from 'next';

const nextConfig:NextConfig={
  trailingSlash:true,
  async rewrites(){
    const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8000';
    return [{source:'/api/:path*',destination:`${backendUrl}/api/:path*`}];
  },
  async redirects(){return [
    {source:'/services/seo',destination:'/seo-services/',permanent:true},
    {source:'/services/seo/',destination:'/seo-services/',permanent:true},
    {source:'/services/web-development',destination:'/web-development-services/',permanent:true},
    {source:'/services/web-development/',destination:'/web-development-services/',permanent:true},
    {source:'/services/content-marketing',destination:'/content-marketing-services/',permanent:true},
    {source:'/services/content-marketing/',destination:'/content-marketing-services/',permanent:true},
  ]},
};

export default nextConfig;
