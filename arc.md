app/
├── (sections)/              # Homepage UI
├── admin/                   # Admin UI
├── host/                    # Host UI
├── listings/
├── book/
├── api/                     # Controllers ONLY
└── login/

src/
├── application/             # Use cases (NEW - BIG WIN)
│   ├── listing/
│   │   ├── createListing.ts
│   │   ├── updateListing.ts
│   │   └── approveListing.ts
│   ├── host/
│   │   ├── onboardHost.ts
│   │   └── sendSetupLink.ts
│   ├── booking/
│   └── auth/
├── domain/                  # Pure business logic (keep strong)
│   ├── listing/
│   ├── booking/
│   ├── host/
│   └── payment/
├── repositories/            # DB queries (NEW - from lib/db/queries)
│   ├── listingRepository.ts
│   ├── hostRepository.ts
│   └── bookingRepository.ts
├── infrastructure/          # Adapters (rename lib/ → here)
│   ├── db/                  # drizzle config
│   ├── auth/
│   ├── sms/
│   ├── email/
│   └── payment/
├── components/              # UI components
├── hooks/
└── types/