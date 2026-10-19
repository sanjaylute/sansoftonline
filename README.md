# Sansoft website rebuild

Professional website rebuild with a Next.js frontend and a Laravel API. The refreshed routes cover the homepage, About, Services and individual service pages, Contact, Request a Quote, Insights, Testimonials, Certifications and legal pages.

The portfolio (`/our-portfolio/`), packages/pricing, shop, cart and checkout routes are intentionally excluded from this first scope.

## Frontend

```sh
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs at `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` to the Laravel API base URL.

## Laravel API

```sh
cd backend
composer install
cp .env.example .env
touch database/database.sqlite
php artisan key:generate
php artisan migrate
php artisan serve
```

The API exposes `GET /api/health`, `POST /api/contact` and `POST /api/quotes`. Contact and quote submissions are validated and saved to the `leads` table. Set `FRONTEND_URL` to the deployed frontend origin before production use.

## Notes

Service pages use a shared page template and centrally managed service data so that the existing service catalogue can be extended without duplicating layouts. Blog detail routes are editorial starter pages based on topics visible on the public site. Confirm redirects from existing WordPress URLs, approved imagery, full article copy, client metrics, testimonials, history details, social URLs and legal copy before launch. A content-management workflow is not yet implemented.
