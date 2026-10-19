import type { NextConfig } from 'next';

const nextConfig:NextConfig={
  trailingSlash:true,
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
