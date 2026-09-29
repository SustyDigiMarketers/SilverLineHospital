# SilverLine Multispeciality Hospital — Technical Documentation & Architecture

Welcome to the **SilverLine Multispeciality Hospital** web application repository. This platform is a high-performance healthcare portal engineered with React 18, TypeScript, Vite, and Tailwind CSS. It delivers instant clinical discovery across 32 medical specialties, automated doctor directories, folder-driven media/events and insurance partner manifests, direct Google Sheets form integrations, and healthcare-grade SEO, AEO, and GEO structured schemas.

---

## 1. Project Overview

- **Hospital:** SilverLine Hospital, Trichy, Tamil Nadu, India
- **Core Stacks:** React 18 (SPA), TypeScript 5.2, Vite 5.1, Tailwind CSS 3.4
- **Routing Engine:** Custom zero-dependency hash/pushState internal router in `App.tsx` with animated page transitions and route pre-fetching
- **State & Data Management:** Centralized static datasets with lazy component hydration and Supabase-free standalone architecture
- **Build System:** Vite + TypeScript compiler (`tsc`) with automated prebuild manifest generators

---

## 2. Architectural Directory Structure

```text
silverline-hospitals/
├── public/                     # Static assets served from root
│   ├── Hero/                   # Main banner hero images (Home1, About, Specialities, etc.)
│   ├── Doctor/                 # High-resolution clinical staff portraits
│   ├── Icons/                  # 1.png to 32.png strictly mapped 1:1 to the 32 specialties
│   ├── Gallery/                # Events and press clipping galleries
│   │   ├── Events/             # Event folders containing numbered images (01.jpg, 02.jpg...)
│   │   │   └── events.json     # Optional metadata overrides for events
│   │   └── Press/              # Press release clipping images (01.jpg to 08.jpg)
│   ├── Standby/                # Infrastructure, facility photos, and insurance logos
│   │   └── Insurance/          # Insurance partner logos (1.png to 32.png)
│   ├── Images/                 # Ancillary graphics (e.g., patient_portal_hero.png)
│   ├── logo.svg, logo-white.svg# Primary brand vector logos
│   ├── favicon.svg             # Website favicon
│   ├── robots.txt              # Search crawler instructions
│   └── sitemap.xml             # XML sitemap for search engines
│
├── pages/                      # Route-level page views
│   ├── HomePage.tsx            # Main landing view
│   ├── SpecialtiesPage.tsx     # 32 Specialties grid and search directory
│   ├── DoctorBioPage.tsx       # Individual doctor profile view
│   ├── MediaEventsPage.tsx     # Dynamic event galleries and press release viewer
│   ├── BlogPage.tsx            # Health articles and clinical blog posts
│   ├── CareerPage.tsx          # Job vacancies and application portal
│   ├── InternationalPatientPage.tsx # International medical tourism guide
│   ├── PatientServicesPage.tsx # In-depth patient amenities and visitor information
│   ├── Post/                   # Department post articles and dynamic loaders
│   └── PressRelease/           # Hospital press releases and media statements
│
├── components/                 # Reusable presentation and UI modules
│   ├── Navbar.tsx              # Responsive top navigation with emergency bar
│   ├── MobileNav.tsx           # Floating mobile bottom navigation bar
│   ├── Footer.tsx              # Global footer with department links and accreditations
│   ├── About.tsx               # Hospital story, leadership, and vision
│   ├── Doctors.tsx             # Interactive doctor search and filter directory
│   ├── HealthPackages.tsx      # Preventive health checkup packages
│   ├── Contact.tsx             # Location map, emergency helplines, contact form
│   ├── EmergencyCare.tsx       # 24/7 Trauma, critical care, and ambulance services
│   ├── PatientPortal.tsx       # Patient dashboard and record viewing portal
│   ├── SpecialtyDetail.tsx     # Deep-dive 32 specialty detail page with FAQs
│   ├── HomeGallery.tsx         # Homepage event highlights carousel
│   ├── AppointmentModal.tsx    # Universal appointment booking modal
│   ├── PatientLoginModal.tsx   # Secure patient portal authentication modal
│   └── MasterSetup/            # Modular text and image configuration wrappers
│
├── data/                       # Centralized static application datasets
│   ├── images.ts               # Universal image registry and asset path references
│   ├── specialties.ts          # Centralized access to all 32 medical specialties
│   ├── doctors.ts              # Medical staff registry
│   ├── events.ts               # Dynamic events dataset (re-exported manifest)
│   ├── insurance.ts            # Natural sorted insurance logos (re-exported manifest)
│   ├── navigation.ts           # Route-to-section mapping and navigation link lists
│   └── pressReleases.ts        # Hospital press coverage dataset
│
├── lib/                        # Services, manifests, and utility engines
│   ├── imagePaths.ts           # Detailed component image mapping tree
│   ├── specialtiesData.ts      # Canonical definition of 32 specialties (in strict order)
│   ├── doctorsData.ts          # Doctor interface definition
│   ├── defaultContent.ts       # Text strings, clinical stats, and testimonials
│   ├── formSubmission.ts       # Google Apps Script integration for web forms
│   ├── seoConfig.ts            # Hospital SEO, AEO, and GEO schema metadata
│   ├── galleryEventsData.ts    # Auto-generated events and press image manifest
│   ├── insuranceManifest.ts    # Auto-generated naturally sorted insurance logos manifest
│   └── analyticsService.ts     # Internal page view tracking
│
├── scripts/                    # Build-time automation tools
│   ├── generate-manifests.js   # Master prebuild orchestrator
│   ├── generate-gallery-manifest.js   # Scans public/Gallery/ and builds galleryEventsData.ts
│   └── generate-insurance-manifest.js # Scans public/Standby/Insurance/ and builds insuranceManifest.ts
│
├── package.json                # Dependencies, build scripts, and metadata
└── vite.config.ts              # Vite bundling, alias, and dev server configuration
```

---

## 3. The 32 Medical Specialties & Icon Architecture

SilverLine Hospital features **32 clinical departments**. The order, identifiers, and icons are synchronized 1:1:

1. **Ordering Discipline**: The order 1 to 32 in `lib/specialtiesData.ts` and `data/specialties.ts` must never be re-ordered.
2. **Icon Mapping**: Every specialty has an icon at `/Icons/{id_number}.png` (e.g., Specialty #1 General Medicine is `/Icons/1.png`, Specialty #13 Cardiology is `/Icons/13.png`).
3. **Typography Standard**: All 32 specialty names are formatted in **Title Case** (e.g., *General Medicine*, *Emergency Medicine*, *Radiation Oncology*). Standard medical acronyms remain uppercase (e.g., *ENT*).
4. **Detail Routing**: Each specialty is accessible via both `/specialties/:id` and direct clean slugs (e.g., `/cardiology`, `/nephrology`).

---

## 4. Folder-Driven Asset Pipelines

### Media & Events (`public/Gallery/Events/`)
- Adding an event requires **no code changes**. Simply create a new folder under `public/Gallery/Events/<Event Name>/` and place images named `01.jpg`, `02.jpg`, etc.
- Optional event details (date, category, description) can be added to `public/Gallery/Events/events.json`.
- Running `npm run prebuild` or `npm run build` runs `scripts/generate-gallery-manifest.js` to scan the folders and generate `lib/galleryEventsData.ts`.

### Insurance Partners (`public/Standby/Insurance/`)
- Partner logos are placed in `public/Standby/Insurance/` named numerically (e.g., `1.png`, `2.png`, ... `32.png`).
- Running `npm run prebuild` executes `scripts/generate-insurance-manifest.js`, which applies **natural numeric sorting** (`1.png, 2.png, ... 9.png, 10.png`) rather than ASCII sorting. The generated output is written to `lib/insuranceManifest.ts`.

---

## 5. Centralized Image Registry (`data/images.ts`)

Instead of hardcoding image URLs across components, all image paths are cataloged in `data/images.ts` and `lib/imagePaths.ts`:
- **`images.logos`**: Main and alternate hospital logos.
- **`images.hero`**: High-resolution banners for landing and subpages.
- **`images.doctors`**: Portraits of doctors.
- **`images.specialtyIcons`**: Array of 32 icon paths.
- **`images.facilities`**: Hospital technology and care infrastructure photos.
- **`images.events`**: Dynamic event items and folders.
- **`images.insurance`**: Insurance partner logos.

---

## 6. Form Integrations (Google Sheets)

All patient interactions are processed via `lib/formSubmission.ts`:
- **Appointment Booking**: Captures patient name, phone, department, preferred doctor, and date.
- **Career Applications**: Handles job candidate submissions.
- **International Inquiries**: Ingestion for foreign patient queries.
- **Contact Us**: General feedback and consultation requests.

Submissions are dispatched asynchronously to Google Apps Script webhooks, which append records directly to configured Google Sheets with immediate UI feedback and fallbacks.

---

## 7. SEO, AEO, and GEO Implementation

The platform includes healthcare-grade search optimization:
- **SEO (Search Engine Optimization)**: Dynamic meta tags, OpenGraph tags, and Twitter Cards configured per route in `lib/seoConfig.ts`.
- **AEO (Answer Engine Optimization)**: Comprehensive FAQ schema (`FAQPage` JSON-LD) integrated into specialty pages and doctor bio profiles, enabling Gemini, ChatGPT, and Google Search to cite clinical answers directly.
- **GEO (Generative Engine Optimization)**: Hospital entity structured data (`MedicalBusiness`, `Hospital` JSON-LD) with geographic coordinates (Trichy, Tamil Nadu), emergency department tags, and operating hours.

---

## 8. Available NPM Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Boots local development server on `http://0.0.0.0:3000` |
| `npm run prebuild` | Generates gallery and insurance manifests |
| `npm run build` | Runs prebuild manifest generation, TypeScript verification (`tsc`), and Vite production build |
| `npm run lint` | Validates codebase with ESLint |
| `npm run preview` | Locally previews production build from `dist/` |
| `npm run generate:manifest` | Runs build manifest generator scripts on-demand |

---

## 9. Developer Guidelines

1. **Do Not Break Routes**: All routing logic resides in `App.tsx`. Dynamic post resolution relies on `import.meta.glob('./pages/Post/*.tsx')`.
2. **Preserve Specialty Ordering**: Specialty IDs, numbers, and icon associations must remain strictly synchronized between `lib/specialtiesData.ts` and `public/Icons/`.
3. **No Dead Links**: Every link in `Navbar.tsx`, `MobileNav.tsx`, and `Footer.tsx` must resolve to an active route or open an interactive modal.
4. **Always Verify Builds**: Run `npm run lint` and `npm run build` before committing any code changes.
