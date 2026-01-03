# Product Requirements Document (PRD)
## MedCore – AI-Powered Healthcare Management System
### Landing Page Implementation

**Version:** v3.0  
**Last Updated:** 2024  
**Status:** Ready for Development (Landing Page + Dashboard)

---

## Executive Summary

This PRD defines the requirements for building **MedCore**, an AI-powered Healthcare Management System, including:
1. High-conversion landing page
2. Complete dashboard system with role-based access control
3. Feature integrations (Patient Management, AI Prescriptions, Report Analysis, Chatbot, Vitals Tracking)
4. Authentication and authorization system
5. Database architecture and API design

---

## 1. Project Overview

### 1.1 Product Name
**MedCore – AI-Powered Healthcare Management System**

### 1.2 Objective
Design and develop a **high-conversion landing page** that:
- Clearly communicates product value proposition in <10 seconds
- Builds trust through medical safety, compliance, and security messaging
- Explains AI usage safely and transparently
- Converts visitors into demo requests and sign-ups
- Maintains professional, doctor-respectful tone throughout

### 1.3 Success Criteria
| Metric | Target | Measurement |
|--------|--------|-------------|
| Conversion Rate | >5% | Demo requests / Total visitors |
| Bounce Rate | <45% | Single-page sessions |
| Page Load Time | <2 seconds | Core Web Vitals |
| Time to Interactive | <3 seconds | TTI metric |

---

## 2. Target Audience

### 2.1 Primary Audience
- **Doctors** (General practitioners, specialists)
- **Clinic Owners** (Small to medium practices)
- **Hospital Administrators** (Decision makers for enterprise adoption)

### 2.2 Secondary Audience
- Healthcare startups
- Healthtech decision makers
- Medical practice managers

### 2.3 User Personas

**Persona 1: Dr. Sarah Chen (General Practitioner)**
- Age: 35-50
- Tech comfort: Moderate
- Pain points: Paperwork, time management, patient record organization
- Goals: Reduce administrative burden, improve patient care efficiency

**Persona 2: Dr. James Wilson (Clinic Owner)**
- Age: 40-60
- Tech comfort: High
- Pain points: System integration, staff training, compliance
- Goals: Streamline operations, ensure compliance, scale practice

---

## 3. Technical Requirements

### 3.1 Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation
- **Authentication:** Neon Auth
- **Database:** Neon (PostgreSQL)
- **Cache/Session:** Redis
- **AI Model:** Google Gemini AI
- **Database Queries:** Direct SQL queries using Neon serverless client
- **File Storage:** Cloudinary (images, PDFs, documents)
- **Analytics:** Google Analytics / Vercel Analytics (optional)
- **Deployment:** Vercel (recommended)

### 3.2 Performance Requirements
- Lighthouse Score: >90 (Performance, Accessibility, SEO, Best Practices)
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- Total Bundle Size: <200KB (gzipped)

### 3.3 Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 3.4 Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

### 3.5 Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios: 4.5:1 (text), 3:1 (UI components)
- Focus indicators on all interactive elements

---

## 4. Authentication & Authorization System

### 4.1 Authentication Architecture

**Technology:** Neon Auth

**Authentication Methods:**
- Email/Password (Credentials Provider)
- OAuth providers (Google, Microsoft - optional for enterprise)
- Magic Link (passwordless - optional)

**Session Management:**
- JWT tokens stored in HTTP-only cookies
- Session data cached in Redis for performance
- Refresh token rotation for security
- Session timeout: 24 hours (configurable)

**Security Features:**
- Password hashing with bcrypt (12 rounds)
- Rate limiting on login attempts (5 attempts per 15 minutes)
- CSRF protection
- XSS protection
- Secure cookie flags (HttpOnly, Secure, SameSite)

### 4.2 Role-Based Access Control (RBAC)

**User Roles:**
1. **Admin** - Full system access
2. **Doctor** - Clinical features, patient management
3. **Patient** - View own records, vitals, reports

**Role Permissions Matrix:**

| Feature | Admin | Doctor | Patient |
|---------|-------|--------|---------|
| User Management | ✅ Full | ❌ | ❌ |
| Patient Records | ✅ Full | ✅ Full | ✅ Own Only |
| Prescription Management | ✅ Full | ✅ Full | ✅ View Own |
| Report Analysis | ✅ Full | ✅ Full | ✅ View Own |
| Medical Chatbot | ✅ Full | ✅ Full | ✅ Limited |
| Vitals Tracking | ✅ Full | ✅ Full | ✅ Own Only |
| System Settings | ✅ Full | ❌ | ❌ |
| Analytics Dashboard | ✅ Full | ✅ Limited | ❌ |
| Audit Logs | ✅ Full | ✅ Own Actions | ❌ |

**Implementation:**
- Middleware-based route protection
- Server-side permission checks
- Client-side UI conditional rendering
- API route authorization

### 4.3 Database Schema (Neon PostgreSQL)

**Core Tables:**

```sql
-- Users Table
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL, -- 'admin', 'doctor', 'patient'
  name VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE
)

-- Doctors Table
doctors (
  id UUID PRIMARY KEY REFERENCES users(id),
  license_number VARCHAR(50) UNIQUE,
  specialization VARCHAR(100),
  clinic_id UUID REFERENCES clinics(id),
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE
)

-- Patients Table
patients (
  id UUID PRIMARY KEY REFERENCES users(id),
  date_of_birth DATE,
  gender VARCHAR(20),
  blood_type VARCHAR(10),
  emergency_contact JSONB,
  medical_history JSONB,
  allergies JSONB
)

-- Clinics Table
clinics (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  address JSONB,
  phone VARCHAR(20),
  admin_id UUID REFERENCES users(id)
)

-- Patient Records Table
patient_records (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  visit_date TIMESTAMP,
  diagnosis TEXT,
  notes TEXT,
  created_at TIMESTAMP
)

-- Prescriptions Table
prescriptions (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  medications JSONB, -- Array of medication objects
  ai_generated BOOLEAN DEFAULT FALSE,
  ai_suggestions JSONB,
  status VARCHAR(20), -- 'draft', 'active', 'completed'
  created_at TIMESTAMP
)

-- Medical Reports Table
medical_reports (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  report_type VARCHAR(50), -- 'lab', 'imaging', 'pathology'
  public_id VARCHAR(255), -- Cloudinary public_id (for secure access)
  file_url TEXT, -- Cloudinary secure URL
  file_format VARCHAR(10), -- 'pdf', 'jpg', 'png'
  file_size INTEGER, -- File size in bytes
  ai_analysis JSONB,
  anomalies JSONB,
  confidence_score DECIMAL(5,2),
  uploaded_at TIMESTAMP
)

-- Vitals Table
vitals (
  id UUID PRIMARY KEY,
  patient_id UUID REFERENCES patients(id),
  recorded_by UUID REFERENCES users(id),
  temperature DECIMAL(4,1),
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  respiratory_rate INTEGER,
  oxygen_saturation DECIMAL(4,1),
  recorded_at TIMESTAMP
)

-- Chatbot Sessions Table
chatbot_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role VARCHAR(20),
  messages JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Audit Logs Table
audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP
)
```

### 4.4 Redis Cache Strategy

**Use Cases:**
- Session storage (NextAuth sessions)
- Rate limiting counters
- API response caching (medical data queries)
- Real-time feature flags
- Chatbot conversation context
- Temporary file upload metadata

**Cache Keys Pattern:**
- Sessions: `session:{sessionId}`
- Rate Limits: `ratelimit:{userId}:{action}`
- API Cache: `cache:{endpoint}:{params}`
- Chat Context: `chat:{userId}:{sessionId}`

**TTL (Time To Live):**
- Sessions: 24 hours
- API Cache: 5 minutes (medical data), 1 hour (static data)
- Rate Limits: 15 minutes
- Chat Context: 30 minutes

---

## 5. Dashboard Architecture & Feature Integration

### 5.1 Dashboard Layout Structure

**Main Dashboard Components:**
- Sidebar Navigation (role-based menu items)
- Top Header (user profile, notifications, search)
- Main Content Area (feature-specific views)
- Footer (quick links, system status)

**Responsive Design:**
- Desktop: Sidebar + Main content
- Tablet: Collapsible sidebar
- Mobile: Bottom navigation + Drawer menu

### 5.2 Feature Dashboards

#### 5.2.1 Patient Management Dashboard

**Route:** `/dashboard/patients`

**Access:** Admin (Full), Doctor (Full), Patient (View Own)

**Features:**
- **Patient List View** (Admin/Doctor)
  - Search and filter patients
  - Sort by name, last visit, status
  - Quick actions (View, Edit, Add Record)
  - Pagination (20 per page)
  
- **Patient Detail View**
  - Personal information card
  - Medical history timeline
  - Current medications
  - Active prescriptions
  - Recent vitals (last 30 days)
  - Uploaded reports
  - Quick actions (Add Record, Prescribe, Upload Report)

- **Add/Edit Patient Form**
  - Personal details
  - Contact information
  - Medical history
  - Allergies
  - Emergency contacts

**API Endpoints:**
- `GET /api/patients` - List patients (with filters)
- `GET /api/patients/[id]` - Get patient details
- `POST /api/patients` - Create new patient
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient (Admin only)

**Database Queries:**
- Optimized with indexes on `email`, `name`, `created_at`
- Redis cache for frequently accessed patients

#### 5.2.2 AI Prescription Dashboard

**Route:** `/dashboard/prescriptions`

**Access:** Admin (Full), Doctor (Full), Patient (View Own)

**Features:**
- **Prescription List View**
  - Filter by status, patient, date range
  - Search by patient name or medication
  - Quick status updates
  
- **Create Prescription**
  - Manual entry form
  - AI-assisted mode (Gemini integration)
  - Drug interaction checker
  - Allergy warnings
  - Dosage calculator
  
- **AI Prescription Assistant**
  - Input: Patient symptoms, diagnosis, medical history
  - Gemini AI generates suggestions
  - Doctor reviews and approves/modifies
  - Audit trail of AI suggestions vs final prescription

**AI Integration (Gemini):**
```typescript
// API Route: /api/prescriptions/ai-suggest
POST /api/prescriptions/ai-suggest
Body: {
  patientId: string,
  symptoms: string[],
  diagnosis: string,
  medicalHistory: object,
  allergies: string[]
}

Response: {
  suggestions: Medication[],
  interactions: Interaction[],
  warnings: string[],
  confidence: number
}
```

**API Endpoints:**
- `GET /api/prescriptions` - List prescriptions
- `POST /api/prescriptions` - Create prescription
- `POST /api/prescriptions/ai-suggest` - Get AI suggestions
- `PUT /api/prescriptions/[id]` - Update prescription
- `GET /api/prescriptions/[id]` - Get prescription details

**Database:**
- Store AI suggestions in `ai_suggestions` JSONB field
- Track `ai_generated` flag for analytics

#### 5.2.3 Report Analyzer Dashboard

**Route:** `/dashboard/reports`

**Access:** Admin (Full), Doctor (Full), Patient (View Own)

**Features:**
- **Report Upload**
  - Drag & drop file upload
  - Support: PDF, JPG, PNG
  - File size limit: 10MB
  - Progress indicator
  
- **Report List View**
  - Thumbnail preview
  - Report type badges
  - AI analysis status
  - Date uploaded
  - Quick view/download
  
- **AI Analysis View**
  - Extracted text/data from report
  - Highlighted abnormal values
  - AI-generated summary
  - Confidence score
  - Doctor notes section
  - Export options (PDF, JSON)

**AI Integration (Gemini):**
```typescript
// API Route: /api/reports/analyze
POST /api/reports/analyze
Body: FormData {
  file: File,
  reportType: 'lab' | 'imaging' | 'pathology',
  patientId: string
}

Response: {
  extractedData: object,
  anomalies: Anomaly[],
  summary: string,
  confidence: number,
  recommendations: string[]
}
```

**Processing Flow:**
1. Upload file to Cloudinary (with secure upload preset)
2. Extract text using OCR (Cloudinary OCR or Tesseract.js)
3. Send to Gemini AI for analysis
4. Store results in database with Cloudinary URL
5. Cache analysis in Redis (24 hours)

**Cloudinary Configuration:**
- Upload preset: `medical_reports` (signed, secure)
- Resource type: `auto` (supports PDF, images)
- Transformation: Auto-format, quality optimization
- Access control: Private by default, signed URLs for access
- Folder structure: `reports/{patientId}/{reportId}`

**API Endpoints:**
- `GET /api/reports` - List reports
- `POST /api/reports/upload` - Upload report
- `POST /api/reports/analyze` - Analyze report with AI
- `GET /api/reports/[id]` - Get report details
- `GET /api/reports/[id]/download` - Download report file

#### 5.2.4 Medical Chatbot Dashboard

**Route:** `/dashboard/chatbot`

**Access:** Admin (Full), Doctor (Full), Patient (Limited)

**Features:**
- **Chat Interface**
  - Message history
  - Real-time responses
  - Typing indicators
  - File attachments (for reports)
  
- **Chat History**
  - Previous conversations
  - Search conversations
  - Export chat logs
  
- **Context Awareness**
  - Patient-specific context (for doctors)
  - Medical history integration
  - Report references

**AI Integration (Gemini):**
```typescript
// API Route: /api/chatbot/message
POST /api/chatbot/message
Body: {
  message: string,
  sessionId?: string,
  context?: {
    patientId?: string,
    reportId?: string
  }
}

Response: {
  response: string,
  sessionId: string,
  sources: string[],
  disclaimers: string[]
}
```

**Safety Constraints:**
- Medical-only scope enforcement
- No diagnosis generation
- No emergency advice
- Disclaimers on every response
- Rate limiting (20 messages per hour)

**API Endpoints:**
- `POST /api/chatbot/message` - Send message
- `GET /api/chatbot/sessions` - Get chat history
- `GET /api/chatbot/sessions/[id]` - Get specific session
- `DELETE /api/chatbot/sessions/[id]` - Delete session

#### 5.2.5 Vitals Tracking Dashboard

**Route:** `/dashboard/vitals`

**Access:** Admin (Full), Doctor (Full), Patient (View/Add Own)

**Features:**
- **Vitals Entry Form**
  - Temperature, BP, Heart Rate, etc.
  - Quick entry templates
  - Bulk entry (for clinics)
  
- **Vitals Visualization**
  - Line charts (time series)
  - Trend analysis
  - Normal range indicators
  - Alert thresholds
  
- **Vitals History**
  - Filter by date range
  - Export to CSV/PDF
  - Comparison view

**API Endpoints:**
- `GET /api/vitals` - List vitals (with filters)
- `POST /api/vitals` - Add vitals entry
- `GET /api/vitals/[patientId]/chart` - Get chart data
- `GET /api/vitals/[patientId]/trends` - Get trend analysis

**Database:**
- Time-series optimized queries
- Indexes on `patient_id`, `recorded_at`

#### 5.2.6 Admin Dashboard

**Route:** `/dashboard/admin`

**Access:** Admin Only

**Features:**
- **User Management**
  - List all users
  - Create/edit users
  - Role assignment
  - Account status (active/suspended)
  
- **System Analytics**
  - Total users, patients, prescriptions
  - AI usage statistics
  - System health metrics
  - Error logs
  
- **Clinic Management**
  - Create/edit clinics
  - Assign doctors to clinics
  - Clinic settings
  
- **Audit Logs**
  - View all system actions
  - Filter by user, action, date
  - Export logs
  
- **System Settings**
  - AI model configuration
  - Rate limits
  - Feature flags
  - Email templates

**API Endpoints:**
- `GET /api/admin/users` - List users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/[id]` - Update user
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/audit-logs` - Get audit logs
- `GET /api/admin/system-health` - System status

### 5.3 Middleware & Route Protection

**Middleware Implementation:**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const session = await getServerSession();
  
  // Protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Role-based access
    const role = session.user.role;
    const path = request.nextUrl.pathname;
    
    if (path.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}
```

**Route Protection Patterns:**
- Server Components: Direct database checks
- API Routes: Middleware + role verification
- Client Components: Conditional rendering based on session

### 5.4 API Route Structure

```
/api
  /auth
    /[...nextauth]          # NextAuth.js handler
    /signup                 # User registration
    /verify-email           # Email verification
  
  /patients
    /[id]                   # Patient CRUD
    /[id]/records           # Patient records
    /[id]/vitals            # Patient vitals
  
  /prescriptions
    /[id]                   # Prescription CRUD
    /ai-suggest             # AI suggestions
  
  /reports
    /upload                 # File upload
    /analyze                # AI analysis
    /[id]                   # Report details
  
  /chatbot
    /message                # Send message
    /sessions               # Chat history
  
  /vitals
    /[patientId]            # Vitals CRUD
    /[patientId]/chart      # Chart data
  
  /admin
    /users                  # User management
    /analytics              # System analytics
    /audit-logs             # Audit logs
```

---

## 6. Page Structure & Content Requirements

### 4.1 Navigation Bar

**Requirements:**
- Sticky header (fixed on scroll)
- Logo + Product name
- Navigation links: Dashboard, Patients, AI Reports, Pharmacy
- Primary CTA: "Doctor Login" (top right)
- Mobile: Hamburger menu
- Backdrop blur effect for modern aesthetic

**Technical Specs:**
- Height: 64px (desktop), 56px (mobile)
- Background: White with 80% opacity + backdrop blur
- Border: Bottom border (1px, slate-100)
- Z-index: 50

---

### 4.2 Hero Section (Above the Fold)

**Purpose:** Instant clarity + credibility

**Content:**
- **Headline:** "AI-Powered Healthcare Management, Built for Doctors"
- **Sub-headline:** "Manage patients, generate prescriptions, analyze medical reports, and use safe medical AI — all in one secure platform."
- **Key Benefits (3 bullets):**
  - Centralized patient & vitals management
  - Doctor-controlled AI assistance
  - Secure, compliant healthcare workflows

**CTA Buttons:**
- Primary: "Book Free Demo" (teal-600 background, white text)
- Secondary: "Watch Product Overview" (outline style)

**Visual Requirements:**
- Dashboard mockup or doctor using system image
- Clean medical UI aesthetic
- Optional: Animated gradient background

**Technical Specs:**
- Min-height: calc(100vh - 64px)
- Grid layout: 3-column (desktop), stacked (mobile)
- Image optimization: Next.js Image component
- Lazy loading for below-fold content

---

### 4.3 Stats & Metrics Section

**Purpose:** Build credibility with numbers

**Content:**
- 4 stat cards in grid layout:
  1. 99% Analysis Accuracy
  2. 50k+ Records Secured
  3. 24/7 Chatbot Availability
  4. 1.2s Prescription Generation

**Design:**
- Hover effects (background color change)
- Large numbers (4xl-5xl font size)
- Small uppercase labels
- Border separators between cards

---

### 4.4 Problem Section

**Purpose:** Show understanding of real pain points

**Content:**
- **Title:** "Healthcare Systems Are Still Too Manual"
- **Pain Points (4 items):**
  - Scattered patient data across files and systems
  - Time-consuming prescription writing
  - Manual interpretation of medical reports
  - Unsafe usage of generic AI tools
- **Transition Line:** "MedCore solves these problems with a doctor-first, AI-assisted approach."

**Design:**
- Two-column layout (text + illustration/icon)
- Alternating layout for visual interest
- Icons for each pain point

---

### 4.5 Product Overview Section

**Purpose:** Explain platform capabilities at high level

**Content:**
- **Title:** "One Platform. Complete Healthcare Management."
- **Feature Summary Cards (4):**
  1. Patient & Vitals Management
  2. Smart Prescription System
  3. AI Medical Report Analysis
  4. Medical-Only AI Chatbot

**Card Requirements:**
- Icon/illustration
- Title (xl font, semibold)
- Description (1-2 lines, slate-500)
- Hover effect: Shadow lift, color change
- Optional: "Learn More" link

**Layout:**
- Grid: 2 columns (tablet), 4 columns (desktop)
- Responsive: Stack on mobile

---

### 4.6 Feature Deep Dive Sections

#### 4.6.1 Patient Management
- **Headline:** "Complete Patient Records, Always Accessible"
- **Content:**
  - Add patients with full medical history
  - Track vital signs over time
  - Secure, searchable digital records
- **Supporting Note:** "Designed to reduce paperwork and improve clinical efficiency."

#### 4.6.2 Prescription Generation
- **Headline:** "Prescriptions — Manual or AI-Assisted"
- **Content:**
  - Write prescriptions manually with ease
  - Use AI for safe, doctor-reviewed suggestions
  - Automatic allergy & interaction checks
- **Disclaimer:** "AI only assists. Final decisions always remain with the doctor."

#### 4.6.3 AI Medical Report Analysis
- **Headline:** "Understand Medical Reports in Seconds"
- **Content:**
  - Upload lab and diagnostic reports
  - AI highlights abnormal values
  - Clear explanations for doctors and patients
- **Trust Line:** "Built on verified medical data sources."

#### 4.6.4 Medical-Only AI Chatbot
- **Headline:** "A Medical Chatbot You Can Trust"
- **Content:**
  - Answers medical questions only
  - Explains reports, medications, and conditions
  - No diagnosis. No emergency advice.
- **Safety Highlight:** "Strict medical scope with built-in guardrails."

**Layout Pattern:**
- Alternating left/right layout for visual interest
- Image/illustration on one side, content on other
- Mobile: Stack vertically

---

### 4.7 How It Works Section

**Purpose:** Reduce friction, increase clarity

**Content:**
4-step process:
1. Doctor signs up
2. Adds patients & records
3. Uses AI tools with full control
4. Delivers faster, safer care

**Design:**
- Timeline/step indicator
- Numbered steps with icons
- Connecting lines/arrows
- Brief description per step

---

### 4.8 Security & Compliance Section

**Purpose:** Build trust (critical for healthcare)

**Content:**
- **Headline:** "Built with Healthcare-Grade Security"
- **Features:**
  - End-to-end data encryption
  - Role-based access control
  - Audit logs for every action
  - HIPAA & DPDP-ready architecture

**Visual:**
- Security icons (shield, lock, key)
- Compliance badges (textual, not legal claims)
- Trust indicators

**Layout:**
- Grid of security features
- Icons + descriptions
- Optional: Certificate badges section

---

### 4.9 Why Choose Us Section

**Purpose:** Differentiate from competitors

**Content:**
- Doctor-first AI design
- No black-box automation
- Medical-only AI scope
- Built for real clinical workflows

**Design:**
- Feature comparison or benefit cards
- Icons for each point
- Emphasis on doctor control and transparency

---

### 4.10 Testimonials / Social Proof (Optional for MVP)

**Content:**
- Doctor quotes (can be placeholders initially)
- "Designed with clinicians in mind"
- Optional: Logos of partner clinics/hospitals

**Design:**
- Carousel or grid of testimonials
- Avatar + name + title
- Quote text
- Star ratings (if applicable)

---

### 4.11 FAQ Section

**Purpose:** Address common concerns and objections

**Mandatory Questions:**
1. Is AI making medical decisions?
2. Is patient data secure?
3. Can I use the system without AI?
4. Is this suitable for clinics and hospitals?
5. Which reports are supported?

**Design:**
- Accordion component (expand/collapse)
- Searchable FAQ (optional)
- Categories (Security, Features, Pricing, etc.)

**Technical:**
- Use headless UI Accordion or custom component
- Smooth expand/collapse animations
- Keyboard accessible

---

### 4.12 Final CTA Section

**Purpose:** Conversion push

**Content:**
- **Headline:** "Ready to Modernize Your Healthcare Practice?"
- **Description:** "Join over 500+ clinics using MedCore to manage patients, automate prescriptions, and analyze reports."
- **CTA Buttons:**
  - Primary: "Book a Free Demo"
  - Secondary: "Request Early Access"
- **Supporting Text:** "No credit card required. Doctor-friendly onboarding."

**Design:**
- Dark background (slate-900) with gradient
- Centered content
- Large, prominent CTAs
- Trust indicators (no credit card, free trial)

---

### 4.13 Footer

**Content:**
- Brand logo + tagline
- Links: Features, Support, Documentation, API Reference
- Social media links
- Newsletter signup
- Legal: Privacy Policy, Terms of Service, BAA Agreement
- Copyright notice

**Layout:**
- Multi-column grid
- Responsive: Stack on mobile
- Newsletter form in footer

---

## 7. Design System

### 5.1 Color Palette
- **Primary:** Teal-600 (#0d9488), Teal-700 (#0f766e)
- **Secondary:** Slate-900 (#0f172a), Slate-500 (#64748b)
- **Background:** White (#ffffff), Slate-50 (#f8fafc)
- **Accent:** Cyan-100, Teal-50
- **Text:** Slate-900 (headings), Slate-600 (body)
- **Success:** Emerald-500
- **Error:** Red-500

### 5.2 Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:**
  - H1: 4xl-6xl, font-medium, tracking-tight
  - H2: 3xl-4xl, font-medium, tracking-tight
  - H3: 2xl, font-semibold
- **Body:** Base (16px), leading-relaxed
- **Small Text:** text-sm (14px), text-xs (12px)

### 5.3 Spacing
- Section padding: py-16 to py-24
- Container max-width: 1280px
- Grid gap: gap-6 to gap-12
- Card padding: p-8 to p-12

### 5.4 Components
- Buttons: Rounded-sm, uppercase tracking-widest, font-bold
- Cards: White background, border (slate-100), shadow on hover
- Forms: Rounded-sm, border (slate-200), focus: teal-500
- Icons: Lucide React, consistent sizing (w-4 to w-8)

---

## 8. Content Guidelines

### 6.1 Tone & Language
- **Professional:** Medical-grade seriousness
- **Trust-focused:** Emphasize security and compliance
- **Non-technical:** Surface content should be accessible
- **No exaggerated AI claims:** Be honest about AI limitations
- **Doctor-respectful:** Acknowledge doctor expertise and control

### 6.2 Messaging Principles
1. **Doctor-first:** Always emphasize doctor control
2. **Transparency:** Clear about AI capabilities and limitations
3. **Security:** Highlight compliance and data protection
4. **Efficiency:** Focus on time-saving and workflow improvement
5. **Safety:** Medical safety is paramount

### 6.3 Content Hierarchy
1. Value proposition (Hero)
2. Problem statement
3. Solution overview
4. Feature details
5. Trust signals (Security, Compliance)
6. Social proof (Testimonials)
7. FAQ (Address objections)
8. Final CTA

---

## 9. SEO Requirements

### 7.1 Meta Tags
- **Title:** "MedCore - AI-Powered Healthcare Management System for Doctors"
- **Description:** "Manage patients, generate prescriptions, and analyze medical reports with AI assistance. Secure, HIPAA-compliant healthcare platform built for doctors."
- **Keywords:** Healthcare Management System, AI in Healthcare, Medical AI Software, Digital Patient Records, EMR System

### 7.2 Structured Data
- Organization schema
- Product schema
- FAQ schema (JSON-LD)

### 7.3 Headings Structure
- Single H1 per page (Hero headline)
- H2 for major sections
- H3 for subsections
- Proper heading hierarchy

### 7.4 Image Optimization
- Alt text for all images
- WebP format with fallbacks
- Lazy loading for below-fold images
- Responsive images (srcset)

---

## 10. Forms & Interactions

### 8.1 Demo Request Form
**Fields:**
- Name (required)
- Email (required, validated)
- Phone (optional)
- Organization/Clinic Name (optional)
- Message (optional, textarea)

**Validation:**
- Email format validation
- Required field indicators
- Error messages
- Success state

**Submission:**
- API endpoint: `/api/demo-request`
- Success message/redirect
- Error handling
- Optional: Email notification

### 8.2 Newsletter Signup
**Fields:**
- Email (required, validated)

**Validation:**
- Email format
- Duplicate check (optional)

**Submission:**
- API endpoint: `/api/newsletter`
- Success message
- Integration with email service (optional)

---

## 11. Analytics & Tracking

### 9.1 Events to Track
- CTA clicks (Book Demo, Request Access)
- Form submissions
- Section scroll depth
- Video plays (if applicable)
- FAQ expands
- External link clicks

### 9.2 Tools (Optional)
- Google Analytics 4
- Vercel Analytics
- Hotjar (heatmaps, session recordings)

---

## 12. Implementation Phases

### Phase 1: Landing Page MVP (Week 1-2)
- Navigation
- Hero section
- Stats section
- Product overview
- Final CTA
- Footer
- Basic responsive design

### Phase 2: Landing Page Enhanced (Week 3)
- Problem section
- Feature deep dives
- How it works
- Security section
- FAQ section
- Animations and transitions

### Phase 3: Landing Page Polish (Week 4)
- Testimonials
- Form integrations
- Analytics setup
- Performance optimization
- Accessibility audit

### Phase 4: Authentication & Database Setup (Week 5-6)
- NextAuth.js configuration
- Neon database setup
- Redis integration
- User registration/login
- Email verification
- Role-based middleware

### Phase 5: Patient Management Dashboard (Week 7-8)
- Patient CRUD operations
- Patient list with search/filter
- Patient detail view
- Medical history timeline
- Database schema implementation

### Phase 6: AI Prescription Dashboard (Week 9-10)
- Prescription form
- Gemini AI integration
- Drug interaction checker
- Prescription list view
- AI suggestion workflow

### Phase 7: Report Analyzer Dashboard (Week 11-12)
- Cloudinary integration for file uploads
- File upload system with progress tracking
- OCR integration (Cloudinary OCR or Tesseract.js)
- Gemini AI analysis
- Report visualization
- Anomaly detection UI
- Signed URL generation for secure access

### Phase 8: Chatbot & Vitals (Week 13-14)
- Chatbot interface
- Gemini AI chat integration
- Vitals entry form
- Vitals visualization charts
- Trend analysis

### Phase 9: Admin Dashboard (Week 15-16)
- User management UI
- System analytics
- Audit logs viewer
- Clinic management
- System settings

### Phase 10: Testing & Optimization (Week 17-18)
- End-to-end testing
- Performance optimization
- Security audit
- Load testing
- Bug fixes

---

## 13. Out of Scope (v1.0)

- Blog section
- Pricing page
- Multi-language support
- Dark mode
- Video consultations
- Telemedicine features
- Mobile apps (iOS/Android)
- Third-party EMR integrations

---

## 14. Deliverables

### 12.1 Code Deliverables
- Next.js project with TypeScript
- All section components
- Responsive design implementation
- Form handling
- SEO optimization
- Performance optimization

### 12.2 Documentation
- Component documentation
- Deployment guide
- Content guidelines
- Design system reference

---

## 15. Success Metrics & KPIs

### 13.1 Primary Metrics
- **Conversion Rate:** Demo requests / Total visitors (Target: >5%)
- **Bounce Rate:** Single-page sessions (Target: <45%)
- **Time on Page:** Average session duration (Target: >2 minutes)

### 13.2 Secondary Metrics
- Form completion rate
- Scroll depth (75%+ of page)
- CTA click-through rate
- FAQ engagement
- Mobile vs desktop conversion

### 13.3 Technical Metrics
- Page load time (<2s)
- Lighthouse scores (>90)
- Core Web Vitals (all green)
- Error rate (<0.1%)

---

## 16. Risk Mitigation

### 14.1 Content Risks
- **Risk:** Medical claims compliance
- **Mitigation:** All medical claims reviewed by legal/medical team
- **Risk:** AI overpromising
- **Mitigation:** Clear disclaimers, doctor-control messaging

### 14.2 Technical Risks
- **Risk:** Performance issues
- **Mitigation:** Image optimization, code splitting, lazy loading
- **Risk:** Browser compatibility
- **Mitigation:** Progressive enhancement, polyfills if needed

### 14.3 Security Risks
- **Risk:** Form spam/abuse
- **Mitigation:** Rate limiting, CAPTCHA (optional), validation

---

## 17. Future Enhancements (Post-MVP)

- Interactive product demo
- Video testimonials
- Case studies
- Integration showcase
- API documentation link
- Developer resources
- Multi-language support
- A/B testing framework

---

## Appendix

### A. Content Examples

**Hero Headline Variations:**
1. "AI-Powered Healthcare Management, Built for Doctors"
2. "The Complete Healthcare Platform Doctors Trust"
3. "Modernize Your Practice with AI-Assisted Healthcare Management"

**CTA Variations:**
- "Book a Free Demo"
- "Request Early Access"
- "Start Free Trial"
- "Schedule a Consultation"

### B. Component Checklist
- [ ] Navigation bar
- [ ] Hero section
- [ ] Stats section
- [ ] Problem section
- [ ] Product overview
- [ ] Feature deep dives (4 sections)
- [ ] How it works
- [ ] Security & compliance
- [ ] Why choose us
- [ ] Testimonials
- [ ] FAQ
- [ ] Final CTA
- [ ] Footer
- [ ] Forms (Demo request, Newsletter)
- [ ] Loading states
- [ ] Error states
- [ ] Success states

---

**Document Status:** ✅ Ready for Development  
**Next Steps:** 
1. Set up Next.js project with TypeScript
2. Configure NextAuth.js with Neon database
3. Set up Redis for session management
4. Implement landing page components
5. Build authentication system
6. Develop dashboard features incrementally

---

## 18. Implementation Checklist

### Authentication & Infrastructure
- [ ] NextAuth.js v5 setup
- [ ] Neon PostgreSQL database connection
- [ ] Redis client configuration
- [ ] Environment variables setup
- [ ] Database schema migration
- [ ] User registration flow
- [ ] Email verification
- [ ] Password reset flow
- [ ] Role-based middleware

### Landing Page
- [x] Navigation component
- [x] Hero section
- [x] Stats section
- [x] Services section
- [x] Feature About section
- [x] Specialists section
- [x] CTA section
- [x] Footer
- [x] Animations

### Dashboard - Patient Management
- [ ] Patient list page
- [ ] Patient detail page
- [ ] Add/Edit patient form
- [ ] Patient search and filters
- [ ] Medical history timeline
- [ ] API endpoints

### Dashboard - AI Prescriptions
- [ ] Prescription list page
- [ ] Prescription form (manual)
- [ ] AI suggestion integration
- [ ] Drug interaction checker
- [ ] Prescription detail view
- [ ] Gemini AI integration

### Dashboard - Report Analyzer
- [ ] Report upload interface
- [ ] Report list page
- [ ] AI analysis view
- [ ] Anomaly highlighting
- [ ] Report download
- [ ] OCR integration

### Dashboard - Medical Chatbot
- [ ] Chat interface
- [ ] Message history
- [ ] Gemini AI integration
- [ ] Context management
- [ ] Safety constraints
- [ ] Rate limiting

### Dashboard - Vitals Tracking
- [ ] Vitals entry form
- [ ] Vitals list view
- [ ] Chart visualization
- [ ] Trend analysis
- [ ] Export functionality

### Dashboard - Admin Panel
- [ ] User management
- [ ] System analytics
- [ ] Audit logs
- [ ] Clinic management
- [ ] System settings

### Testing & Deployment
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Security audit
- [ ] Performance optimization
- [ ] Production deployment
