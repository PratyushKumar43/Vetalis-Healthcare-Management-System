# Vetalis - AI-Powered Healthcare Management System

A comprehensive healthcare management platform with AI-powered features, built with Next.js 14, TypeScript, and modern web technologies.

![Vetalis Healthcare Management System](image.png)

## Features

### Landing Page
- 🎨 Modern, clean medical UI design
- 📱 Fully responsive (mobile-first)
- ⚡ Optimized performance with Next.js Image
- 🎯 High-conversion landing page
- 🔒 Security-focused messaging
- 🏥 Doctor-first design approach

### Dashboard Features
- 👥 **Patient Management** - Complete patient records and history
- 💊 **AI Prescriptions** - AI-assisted prescription generation with Gemini
- 📄 **Report Analyzer** - AI-powered medical report analysis
- 🤖 **Medical Chatbot** - Safe, medical-only AI assistant
- 📊 **Vitals Tracking** - Real-time vital signs monitoring and visualization
- 🔐 **Role-Based Access** - Admin, Doctor, and Patient roles with granular permissions

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **Fonts:** Inter (Google Fonts)

### Backend & Infrastructure
- **Authentication:** Neon Auth
- **Database:** Neon (PostgreSQL) - Direct SQL queries
- **Cache/Session:** Redis (optional)
- **AI Model:** Google Gemini AI
- **File Storage:** Cloudinary (images, PDFs, documents)

### Deployment
- **Platform:** Vercel (recommended)
- **Database:** Neon PostgreSQL
- **Redis:** Upstash Redis or Redis Cloud

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

All detailed documentation files are located in the `/docs` folder:

- **Setup Guides**: See `/docs/NEON_AUTH_SETUP.md`, `/docs/GOOGLE_OAUTH_SETUP.md`
- **Implementation Guides**: See `/docs/DASHBOARD_IMPLEMENTATION.md`
- **Feature Documentation**: See `/docs/NOTIFICATIONS_SETUP.md`, `/docs/ROLE_BASED_ACCOUNT_CREATION.md`
- **Product Requirements**: See `/docs/prd.md`
- **Migration Guides**: See `/docs/MIGRATION_TO_NEON_AUTH.md`

For a complete list, see `/docs/README.md`.

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Landing page
│   ├── globals.css                   # Global styles
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── layout.tsx                # Dashboard layout with sidebar
│   │   ├── page.tsx                  # Dashboard home
│   │   ├── patients/
│   │   │   ├── page.tsx              # Patient list
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Patient details
│   │   ├── prescriptions/
│   │   │   ├── page.tsx              # Prescription list
│   │   │   └── new/
│   │   │       └── page.tsx          # Create prescription
│   │   ├── reports/
│   │   │   ├── page.tsx              # Report list
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Report analysis
│   │   ├── chatbot/
│   │   │   └── page.tsx              # Chatbot interface
│   │   ├── vitals/
│   │   │   └── page.tsx              # Vitals tracking
│   │   └── admin/
│   │       └── page.tsx              # Admin dashboard
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts          # NextAuth handler
│       ├── patients/
│       │   └── route.ts              # Patient API
│       ├── prescriptions/
│       │   └── route.ts              # Prescription API
│       ├── reports/
│       │   ├── upload/
│       │   │   └── route.ts          # Upload to Cloudinary
│       │   ├── analyze/
│       │   │   └── route.ts          # AI analysis
│       │   └── [id]/
│       │       └── download/
│       │           └── route.ts      # Signed download URL
│       ├── chatbot/
│       │   └── route.ts              # Chatbot API
│       └── vitals/
│           └── route.ts              # Vitals API
├── components/
│   ├── landing/                      # Landing page components
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Services.tsx
│   │   ├── FeatureAbout.tsx
│   │   ├── Specialists.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── dashboard/                    # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── PatientList.tsx
│   │   ├── PrescriptionForm.tsx
│   │   ├── ReportUpload.tsx
│   │   ├── ChatbotInterface.tsx
│   │   └── VitalsChart.tsx
│   └── ui/                           # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── lib/
│   ├── auth.ts                       # NextAuth configuration
│   ├── db.ts                         # Database connection
│   ├── redis.ts                      # Redis client
│   ├── cloudinary.ts                 # Cloudinary integration
│   ├── ai/
│   │   ├── gemini.ts                 # Gemini AI integration
│   │   └── prompts.ts                # AI prompts
│   └── utils.ts                      # Utility functions
├── middleware.ts                     # Route protection
├── prd.md                            # Product Requirements Document
└── package.json
```

## Sections

### Landing Page
1. **Navigation** - Sticky header with logo and menu
2. **Hero** - Main value proposition with hero text
3. **Stats** - Key metrics and statistics
4. **Services** - Core modules and features
5. **Feature About** - Technology deep dive
6. **Specialists** - Team/experts showcase
7. **CTA** - Final conversion section
8. **Footer** - Links, newsletter, and legal

### Dashboard Features
1. **Patient Management** - CRUD operations, medical history, search
2. **AI Prescriptions** - Manual and AI-assisted prescription generation
3. **Report Analyzer** - Upload and AI-analyze medical reports
4. **Medical Chatbot** - Safe AI assistant for medical queries
5. **Vitals Tracking** - Record and visualize patient vital signs
6. **Admin Panel** - User management, analytics, system settings

## Authentication & Authorization

### User Roles
- **Admin** - Full system access, user management, analytics
- **Doctor** - Patient management, prescriptions, reports, chatbot
- **Patient** - View own records, vitals, reports, limited chatbot access

### Authentication Flow
1. User signs up with email/password via Neon Auth
2. Email verification (handled by Neon Auth)
3. Role assignment during registration (stored in database)
4. Login with Neon Auth
5. Session managed by Neon Auth
6. Role-based route protection via middleware

## Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@neon-host/dbname"

# Redis
REDIS_URL="redis://default:password@redis-host:port"

# Neon Auth
NEXT_PUBLIC_NEON_AUTH_URL="https://your-neon-auth-url.neonauth.us-east-1.aws.neon.tech/neondb/auth"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"

# OAuth (Google - Configure in Neon Auth Dashboard)
# Note: Google OAuth is configured through Neon Auth dashboard, not via environment variables
# You need to:
# 1. Go to Neon Auth dashboard
# 2. Enable Google OAuth provider
# 3. Add your Google OAuth credentials there
# The OAuth flow will work automatically once configured in Neon Auth

# Cloudinary (File Storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
CLOUDINARY_UPLOAD_PRESET="medical_reports" # Optional: for unsigned uploads
```

## Database Setup

1. Create a Neon PostgreSQL database
2. Create tables directly in Neon using SQL (see `MIGRATION_TO_NEON_AUTH.md` for schema examples)
3. No migrations needed - use raw SQL queries

## Redis Setup

1. Create a Redis instance (Upstash, Redis Cloud, or self-hosted)
2. Update `REDIS_URL` in `.env.local`
3. Test connection:
```bash
npm run redis:test
```

## AI Integration Setup

1. Get Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add `GEMINI_API_KEY` to `.env.local`
3. Test AI integration:
```bash
npm run test:ai
```

## Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the Dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Add credentials to `.env.local`
4. Create an upload preset (optional, for unsigned uploads):
   - Go to Settings > Upload
   - Create preset named `medical_reports`
   - Set signing mode to "Signed"
   - Set folder to `reports`
   - Enable "Use filename" for better organization
5. Install Cloudinary SDK:
```bash
npm install cloudinary
# or
npm install next-cloudinary  # For Next.js optimized uploads
```
6. Test Cloudinary connection:
```bash
npm run test:cloudinary
```

### Cloudinary Configuration for Medical Reports

**Recommended Settings:**
- **Resource Type:** `auto` (handles images and PDFs)
- **Access Mode:** Private (signed URLs)
- **Folder Structure:** `reports/{patientId}/{reportId}`
- **Transformations:** 
  - Auto-format (WebP for images)
  - Quality: auto
  - Secure delivery: enabled
- **File Size Limit:** 10MB per file
- **Allowed Formats:** PDF, JPG, PNG, JPEG

**Security:**
- Use signed uploads for server-side uploads
- Generate signed URLs with expiration for file access
- Enable access control on upload preset
- Store only Cloudinary public_id in database, not full URLs

## Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Database & Redis

- **Neon:** Create database and get connection string
- **Redis:** Use Upstash Redis (Vercel integration) or Redis Cloud

### Required Environment Variables for Production

- `DATABASE_URL`
- `REDIS_URL`
- `NEXT_PUBLIC_NEON_AUTH_URL` (your Neon Auth URL from dashboard)
- `GEMINI_API_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## API Documentation

### Authentication Endpoints
- Authentication handled by Neon Auth at `/auth/sign-in` and `/auth/sign-up`
- Account management at `/account/*` routes

### Patient Endpoints
- `GET /api/patients` - List patients (with filters)
- `POST /api/patients` - Create patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient

### Prescription Endpoints
- `GET /api/prescriptions` - List prescriptions
- `POST /api/prescriptions` - Create prescription
- `POST /api/prescriptions/ai-suggest` - Get AI suggestions

### Report Endpoints
- `GET /api/reports` - List reports
- `POST /api/reports/upload` - Upload report to Cloudinary
- `POST /api/reports/analyze` - Analyze with AI
- `GET /api/reports/[id]/download` - Get signed download URL

### Chatbot Endpoints
- `POST /api/chatbot/message` - Send message
- `GET /api/chatbot/sessions` - Get chat history

## Security Features

- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ JWT tokens in HTTP-only cookies
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation with Zod
- ✅ SQL injection prevention (ORM)
- ✅ XSS protection
- ✅ Audit logging
- ✅ Secure file storage with Cloudinary (signed URLs)
- ✅ Private file access with expiration
- ✅ HIPAA-compliant file handling

## License

MIT

