nepali-homestay-bookings/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Optional: Protected layout for signed-in users
│   │   └── layout.tsx
│   ├── admin/                    # Admin panel (role-protected)
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── listings/
│   │   │   └── page.tsx
│   │   ├── bookings/
│   │   │   └── page.tsx
│   │   ├── users/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── dashboard/                # User & Host dashboard
│   │   ├── host/
│   │   │   └── page.tsx
│   │   ├── guest/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                      # Public API routes (future mobile app)
│   │   ├── listings/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── bookings/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── payments/
│   │   │   └── onepg/
│   │   │       ├── webhook/route.ts
│   │   │       └── callback/route.ts
│   │   └── webhook/
│   │       └── clerk/route.ts     # Clerk user sync
│   ├── book/
│   │   ├── choose/page.tsx       # Payment gateway selection
│   │   ├── checkout/page.tsx
│   │   ├── success/page.tsx
│   │   └── cancel/page.tsx
│   ├── listings/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── components/        # ListingGallery, MapSection, BookingWidget
│   ├── search/
│   │   ├── page.tsx
│   │   ├── SearchHeader.tsx
│   │   ├── SearchResults.tsx
│   │   └── Filters.tsx
│   ├── CurrencyProvider.tsx      # Client context
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx                  # Homepage
│
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── listings/
│   │   │   └── ListingCard.tsx
│   │   └── booking/
│   │       └── BookingWidget.tsx
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useListings.ts
│   │   ├── useBookings.ts
│   │   └── useCurrency.ts
│   │
│   ├── lib/
│   │   ├── db/
│   │   │   ├── db.ts             # Drizzle instance
│   │   │   └── schema.ts         # All tables (users, listings, bookings)
│   │   ├── clerk.ts              # getAuth, role checks
│   │   ├── cloudinary.ts         # Upload presets + helpers
│   │   ├── onepg/
│   │   │   ├── client.ts
│   │   │   └── utils.ts
│   │   ├── sms.ts                # Sparrow SMS client
│   │   ├── email.ts              # Nodemailer setup
│   │   └── utils/
│   │       └── formatters.ts
│   │
│   ├── server/
│   │   ├── actions/
│   │   │   └── currency.ts       # convertPrice
│   │   └── services/
│   │       ├── bookingService.ts
│   │       └── listingService.ts
│   │
│   └── types/
│       ├── index.ts
│       ├── currency.ts
│       ├── listing.ts
│       ├── booking.ts
│       └── user.ts
│
├── drizzle/                      # Drizzle migrations
│   └── meta/
│
├── public/
│   ├── logo.png
│   └── favicon.ico
│
├── .env.local                    # Local env
├── drizzle.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md


# 1. Create project
npx create-next-app@15 nepali-homestay-bookings --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"

cd nepali-homestay-bookings

# 2. Install core dependencies
npm install @clerk/nextjs drizzle-orm postgres cloudinary lucide-react framer-motion sonner zod

npm install -D drizzle-kit

# 3. Upgrade to Tailwind v4.1.0
npm install tailwindcss@4.1.0 postcss@8.4.47 autoprefixer@10.4.20

# 4. Create folders
mkdir -p app/admin/{dashboard,listings,bookings,users}
mkdir -p app/dashboard/{host,guest}
mkdir -p app/api/{listings/{[id]},bookings/{[id]},payments/onepg,webhook}
mkdir -p app/book/{choose,checkout,success,cancel}
mkdir -p app/listings/[id]/components
mkdir -p app/search

mkdir -p src/components/{ui,layout,listings,booking}
mkdir -p src/hooks
mkdir -p src/lib/{db,onepg,utils}
mkdir -p src/server/{actions,services}
mkdir -p src/types

mkdir -p drizzle/meta

# 5. Initialize basic files (touch)
touch app/CurrencyProvider.tsx
touch src/lib/db/{db.ts,schema.ts}
touch src/lib/clerk.ts
touch src/lib/cloudinary.ts
touch src/lib/sms.ts
touch src/lib/email.ts
touch src/types/{currency.ts,listing.ts,booking.ts,user.ts}
touch drizzle.config.ts

# 6. Git init + branches
git init
git checkout -b dev
git add .
git commit -m "chore: initialize Next.js 15 + Tailwind v4.1 project structure"

git checkout -b main
git merge dev --no-edit
git push origin main
git push origin dev


Priority,Reason
Client (Guest) Flow,Core revenue path: Search → View Listing → Book → Pay (OnePG) → Confirmation (SMS/Email)
Host Dashboard,"Hosts need to see bookings, manage availability — critical for supply side"
Admin Panel,Important but not customer-facing — can be minimal for MVP (list users/listings/bookings)

Day,Focus,Outcome
Day 1,"Client side: Home, Search, Listing Detail, Booking Flow (without payment)","Users can browse and ""book"" (save to DB)"
Day 2,Payment (OnePG) + Confirmation (SMS/Email) + Host Dashboard (view bookings),Full booking cycle works
Day 3,Admin Panel + Polish + Deploy,MVP live on production