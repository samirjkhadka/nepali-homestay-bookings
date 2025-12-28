# Product Vision
As a founder, I envision Nepali Homestay Bookings as the premier platform connecting global travelers with authentic Nepali homestays. We're not just a booking site — we're a gateway to real Nepali culture, family hospitality, and sustainable tourism.
Imagine a traveler landing on our site and feeling the warmth of Nepal immediately: stunning Himalayas in the hero, personal host stories, home-cooked dal bhat in photos, and inspiring blogs/videos that make them say, "I need to experience this."
Our vision is to:

## Empower local families (especially in rural areas) with direct income from tourism.
Preserve Nepali traditions through cultural immersion.
Promote sustainable travel that benefits communities, not corporations.
Become the "Airbnb of Nepal" but better — focused on authenticity, affordability, and impact.

By 2026, we aim for 1,000 listings, 10,000 users, and partnerships with Nepal Tourism Board.
Objectives

## Short-term (Q1 2026):

Onboard 100 homestays across 7 provinces.
Achieve 1,000 monthly visitors through SEO (blogs/videos) and social media.
Launch bookings/payments for revenue.

## Long-term:

Expand to trekking routes, cultural festivals integration.
Mobile app for hosts/guests.
Impact metrics: $100k distributed to hosts, 10k positive reviews.

## Tech Stack
Built with modern, scalable tech for fast performance and easy maintenance:

Frontend: Next.js 16 (App Router, Turbopack)
Backend: Next.js API Routes, Drizzle ORM, Neon Postgres
Auth: Clerk
Storage: Cloudinary (images/uploads)
UI: Tailwind CSS v4, shadcn/ui components
Theme: next-themes (dark mode)
Currency: Custom provider with rates
Deployment: Vercel (prod/staging)
Other: Lucide icons, OpenStreetMap for maps

## Why this stack? Fast development, serverless scaling, excellent DX, low cost for startup.
## What We Have Completed
The platform is live and stable as of launch. Key features:

## Admin Panel ( /admin )
Full CRUD for Listings (add/edit/view with images, hosts, amenities, address, directions)
Blogs management (add/edit/publish with featured image, slug, content)
YouTube Videos management (add/edit with preview, featured toggle)

## Homepage
Hero carousel with real listings
Why Homestay section (icons)
Featured Homestays grid
Guest Stories (testimonials)
Latest Blogs cards
Featured Videos embeds
CTA section

Search Page ( /search )
Real results from DB
Filters (query, province, price range, guests)
Clean card grid with price, rating, host
Currency conversion

## Listing Detail ( /listings/[id] )
Hero gallery
Host spotlight (multiple hosts with bio, languages, badges)
Amenities grid
Description, location map, directions
Quick info icons (guests, bedrooms)
Sticky book CTA

## Blog Pages
List ( /blog ) — grid of published blogs
Detail ( /blog/[slug] ) — full content, image, date

## Videos Page ( /videos ) — grid of embeds
User Features
Dark mode toggle
Currency selector
Wishlist (mock, ready for real)
Auth (Clerk sign in/up)

## Other
Navbar/footer polished
404 page friendly
Loading skeletons
Brand colors (#FA6E0A primary, #0A6E6E secondary, #F5E8D5 accent)


All with zero errors, null safety, TypeScript clean.
## Where We Stand

Launched: Live on production (December 25, 2025)
Status: Stable, no crashes, clean build
Users: Ready for first visitors — monitor analytics
Content: Admin ready for team to add real listings/blogs/videos
Performance: Fast (Turbopack, server-side rendering)
SEO: Basic (titles, meta, slugs) — ready for optimization

The foundation is rock-solid. We're at v1.0 — minimum lovable product.
What Is Remaining
Short-term fixes/polish (1-2 days):

Real wishlist (integrate Clerk user + DB)
Reviews system (mock → real)
Bookings UI (calendar, form) — no payment yet
Host dashboard (listings management)

Core remaining feature: Bookings & Payments (2-3 days)

Calendar availability
Booking form
Stripe payment integration
Host payouts
Guest dashboard (my bookings)

My Plan for Future
As super dev/co-founder, my 6-month plan:

Week 1-2: Post-Launch Polish & Monitoring
Add analytics (Google Analytics, Vercel)
Fix any launch bugs
Onboard content team — train on admin
SEO: add meta, sitemap, robots.txt

Month 1: Bookings & Payments
Calendar (react-date-range)
Booking flow (guest → host confirmation)
Onepg payment integration (checkout, webhooks)
Emails (booking confirm, reminders)

Month 2: Host Features
Host dashboard (manage listings, bookings)
Payouts (Stripe Connect)
Reviews/ratings system

Month 3: User Features
Real wishlist (save/favorite)
Guest profile
Search improvements (map view, more filters)

Month 4: Growth Features
Blog/video comments
Social sharing
Affiliate/partners
Mobile app (React Native)

Month 5-6: Scale & Impact
Performance optimizations
Analytics dashboard for us
Impact tracking (income to hosts)
International expansion (more currencies, languages)


Upgrades I think we need:

AI host matching (based on preferences)
VR tours for listings
Community forum
Sustainability badges (eco-friendly homestays)
Integration with Nepal Tourism API
Mobile notifications (push for bookings)