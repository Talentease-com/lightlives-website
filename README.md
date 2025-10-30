# Light Lives Website

**Version 1.0.0**

A modern, full-featured charity website built with Next.js 15, Payload CMS, and Razorpay payment integration. Designed to showcase impact, manage content dynamically, and process donations seamlessly.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.59+-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Setup](#-environment-setup)
- [Development](#-development)
- [Payment Integration](#-payment-integration)
- [Content Management](#-content-management)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## ✨ Features

### Public Website
- **Dynamic Homepage** - Hero carousel, impact statistics, testimonials, and gallery sections
- **Donation System** - Razorpay integration with one-time, recurring, and UPI payment options
- **Contact & Forms** - Newsletter subscription, career applications, CSR inquiries
- **Content Pages** - About, Programs, Team, Privacy Policy, Terms & Conditions
- **Responsive Design** - Mobile-first with Tailwind CSS 4 and custom components
- **Smooth Animations** - Framer Motion for page transitions and micro-interactions

### Admin Panel (Payload CMS)
- **Content Management** - WYSIWYG editor for pages, galleries, and testimonials
- **Media Library** - Cloudflare R2 integration for scalable file storage
- **Payment Tracking** - View donations with auto-generated receipts
- **Form Submissions** - Manage contact forms, career applications, and newsletters
- **Global Settings** - Email configuration, footer links, social media URLs
- **User Management** - Role-based access control for admin users

### Technical Highlights
- **Server Components** - React Server Components for optimal performance
- **Type Safety** - End-to-end TypeScript with auto-generated CMS types
- **Cache Optimization** - React `cache()` with on-demand revalidation
- **Payment Security** - Webhook verification, PCI compliance, receipt generation
- **Form Validation** - Centralized validators for phone, email, PAN, amounts
- **Logging System** - Colored console logs for CMS operations

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org)** - React framework with App Router and Turbopack
- **[React 19](https://react.dev)** - Latest React with concurrent features
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com)** - Beautifully designed components (New York style)
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library via `motion` package
- **[React Hook Form](https://react-hook-form.com)** - Performant form management

### Backend & CMS
- **[Payload CMS 3.59+](https://payloadcms.com)** - Headless CMS with admin UI
- **[Vercel Postgres](https://vercel.com/storage/postgres)** - Database adapter for Payload
- **[Cloudflare R2](https://www.cloudflare.com/products/r2/)** - Object storage for media files
- **[Resend](https://resend.com)** - Transactional email service

### Payments & Integrations
- **[Razorpay](https://razorpay.com)** - Payment gateway for donations
- **[Plyr](https://plyr.io)** - Video player for gallery content

### Development
- **TypeScript** - Type-safe development
- **ESLint** - Code linting
- **pnpm** - Fast, disk-efficient package manager

---

## 🏗 Architecture

### Route Groups
```
src/app/
├── (frontend)/          # Public website routes
│   ├── layout.tsx       # Shared layout with Navbar + Footer
│   ├── page.tsx         # Homepage
│   ├── sponsor/         # Donation pages
│   ├── about/           # About, Team, Programs
│   ├── contact/         # Contact form
│   ├── csr/             # CSR partnerships
│   └── support/         # Volunteer opportunities
│
├── (payload)/           # CMS admin interface
│   ├── layout.tsx       # Auto-generated (DO NOT EDIT)
│   ├── custom.scss      # Admin panel styles
│   └── admin/           # Admin routes
│
└── api/
    ├── payments/        # Payment API endpoints
    └── newsletter/      # Newsletter subscription
```

### Data Flow
1. **Content** → Payload CMS → Vercel Postgres → React Server Components
2. **Media** → Cloudflare R2 → CDN → Optimized delivery
3. **Payments** → Frontend form → API route → Razorpay → Webhook → Database
4. **Cache** → `cache()` wrapper → On-demand revalidation via hooks

### Key Patterns
- **Server-first**: All data fetching via `getPayload()` in Server Components
- **Type Generation**: Auto-generated types from CMS schema (`payload-types.ts`)
- **Revalidation**: `afterChange` hooks trigger cache invalidation
- **Validation**: Shared utilities across frontend and backend

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (install via `npm install -g pnpm`)
- **PostgreSQL** database (Vercel Postgres recommended)
- **Razorpay** account for payments
- **Cloudflare R2** bucket for media storage (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Talentease-com/lightlives-website.git
   cd lightlives-website
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp example.env.local .env.local
   ```
   Edit `.env.local` with your credentials (see [Environment Setup](#-environment-setup))

4. **Generate Payload types**
   ```bash
   pnpm generate:types
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   - **Website**: [http://localhost:3000](http://localhost:3000)
   - **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔑 Environment Setup

Copy `example.env.local` to `.env.local` and configure:

### Required Variables
```env
# Payload CMS
PAYLOAD_SECRET=your-super-secret-key-here
DATABASE_URI=postgres://username:password@host/database

# Razorpay Payments
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
WEBHOOK_SECRET=your-webhook-secret

# Email (Resend)
RESEND_API_KEY=re_xxxxx

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Optional Variables (Media Storage)
```env
# Cloudflare R2
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=auto
NEXT_PUBLIC_S3_HOSTNAME=your-custom-domain.com
```

### Database Setup
For **Vercel Postgres**:
1. Create database at [vercel.com/storage](https://vercel.com/storage)
2. Copy connection string to `DATABASE_URI`
3. Payload will auto-create tables on first run

---

## 💻 Development

### Available Scripts

```bash
# Development server (with Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Generate TypeScript types from CMS schema
pnpm generate:types

# Generate admin import map
pnpm generate:importmap

# Payload CLI
pnpm payload

# Linting
pnpm lint
```

### Project Structure
```
src/
├── app/                 # Next.js App Router
├── collections/         # Payload CMS collections
├── globals/             # Payload CMS globals (site-wide settings)
├── components/          # React components
├── lib/                 # Utilities and helpers
├── hooks/               # Custom React hooks
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

### Adding New Components

Use shadcn/ui for base components:
```bash
npx shadcn@latest add [component-name]
```

**Important**: Always apply `rounded-none` class to match brand guidelines (no border radius).

### Payload CMS Development

**Add new collection**:
```typescript
// src/collections/YourCollection.ts
import { CollectionConfig } from 'payload'

export const YourCollection: CollectionConfig = {
  slug: 'your-collection',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
```

**Register in config**:
```typescript
// src/payload.config.ts
import { YourCollection } from './collections/YourCollection'

export default buildConfig({
  collections: [
    withCollectionLogging(YourCollection),
    // ...
  ],
})
```

**Generate types**:
```bash
pnpm generate:types
```

---

## 💳 Payment Integration

### Razorpay Flow
1. **User fills donation form** → `DonationForm.tsx`
2. **Create order** → `/api/payments/create-order`
3. **Razorpay checkout** → `PaymentGateway.tsx` hook
4. **Verify payment** → `/api/payments/verify`
5. **Webhook updates** → `/api/payments/webhook`
6. **Receipt generation** → Auto-generated via `beforeChange` hook

### Payment Types
- **One-time**: Single donation with instant receipt
- **Recurring**: Future implementation for subscriptions
- **UPI**: Direct UPI payment flow
- **Bank Transfer**: Manual process with details displayed

### Amount Validation
- **Minimum**: ₹1
- **Maximum**: ₹10,00,000
- **Conversion**: Always multiply by 100 for Razorpay (paise)

See **[PAYMENT_INTEGRATION.md](docs/PAYMENT_INTEGRATION.md)** for detailed implementation.

---

## 📝 Content Management

### Collections (Data Types)
- **Users** - Admin authentication
- **Media** - File uploads to Cloudflare R2
- **Payments** - Donation records
- **Impacts** - Impact statistics
- **Testimonials** - User testimonials
- **Teams** - Leadership & Advisory Board members
- **Galleries** - Hero, Team, General, Vertical, Video galleries
- **Contact Submissions** - Form responses
- **Career Applications** - Job applications
- **Newsletter Subscribers** - Email list

### Globals (Site-wide Settings)
- **Email Settings** - SMTP configuration
- **Social Settings** - Contact info, social media links
- **Footer Links** - Dynamic footer navigation by category
- **Page Images** - Reusable image assets
- **Page Videos** - Video content

### Admin Access
1. Navigate to `/admin`
2. Create first user on initial setup
3. Role-based permissions managed via Payload

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure environment variables** in project settings
3. **Set build command**: `pnpm build`
4. **Set output directory**: `.next`
5. **Deploy** - Automatic on push to main branch

### Manual Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Post-Deployment
- Configure Razorpay webhook URL in dashboard
- Set up custom domain for Cloudflare R2 (see [CLOUDFLARE_R2_CUSTOM_DOMAIN_SETUP.md](docs/CLOUDFLARE_R2_CUSTOM_DOMAIN_SETUP.md))
- Test payment flow end-to-end
- Verify email sending via Resend

---

## 📚 Documentation

### Implementation Guides
- **[Payment Integration](docs/PAYMENT_INTEGRATION.md)** - Razorpay setup, payment flow, webhook handling
- **[Form Validation](docs/FORM_VALIDATION.md)** - Centralized validation utilities
- **[Footer Revalidation](docs/FOOTER_REVALIDATION.md)** - Cache invalidation patterns
- **[Payload Logging](docs/PAYLOAD_LOGGING.md)** - CRUD operation logging system
- **[Email Settings](docs/EMAIL_SETTINGS_IMPLEMENTATION.md)** - Email configuration guide
- **[Teams Page](docs/TEAMS_PAGE_IMPLEMENTATION.md)** - Team member display implementation
- **[Video Player](docs/VIDEO_PLAYER_IMPLEMENTATION.md)** - Video gallery implementation

### Infrastructure & DevOps
- **[Cloudflare R2 Custom Domain](docs/CLOUDFLARE_R2_CUSTOM_DOMAIN_SETUP.md)** - CDN setup to avoid serverless limits
- **[Media Management](docs/MEDIA_MANAGEMENT_STRATEGY.md)** - File upload and storage strategy

---

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes following project conventions
3. Test locally with `pnpm dev`
4. Run `pnpm generate:types` if CMS schema changed
5. Commit with descriptive message
6. Create pull request

### Code Conventions
- **'use client'** - Forms, animations, hooks, event handlers
- **Server components** - Layouts, static content, data fetching
- **Import paths** - Use `@/components/[Category]/ComponentName`
- **No border radius** - Always `rounded-none` (brand guideline)
- **Color variables** - Use `bg-primary`, `text-secondary`, `border-tertiary`

### Testing Checklist
- [ ] Forms validate correctly
- [ ] Payment flow completes end-to-end
- [ ] Mobile responsive design
- [ ] Admin panel accessible
- [ ] Cache revalidation working
- [ ] No TypeScript errors

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework
- **Payload CMS** - For the flexible headless CMS
- **shadcn** - For beautiful UI components
- **Razorpay** - For reliable payment processing

---

## 📧 Support

For issues and questions:
- **Website Issues**: Create an issue in this repository
- **Payment Issues**: Contact Razorpay support
- **CMS Issues**: Check [Payload CMS documentation](https://payloadcms.com/docs)

---

**Built with ❤️ for Light Lives Charity**
