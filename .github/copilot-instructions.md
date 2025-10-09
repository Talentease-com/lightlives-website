# GitHub Copilot Instructions for Light Lives Website

## Project Overview
Light Lives is a Next.js 15 charity websit1. Use Payload CMS access control for data security featuring a sophisticated donation system with Razorpay payment integration, Payload CMS for content management and authentication, and admin functionality. The project uses Tailwind CSS 4, Framer Motion for animations, and shadcn/ui components.

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Database**: Payload CMS with Vercel Postgres
- **Payments**: Razorpay integration with webhook support
- **Auth**: Payload CMS built-in authentication with role-based access control
- **UI**: shadcn/ui components (New York style) + custom components
- **Animation**: Framer Motion (`motion` package)
- **Forms**: React Hook Form with validation

### Directory Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes (payments, admin)
│   ├── admin/          # Protected admin interface
│   ├── auth/           # Auth callbacks
│   └── sponsor/        # Donation pages
├── components/
│   ├── Home/           # Landing page sections
│   ├── Layout/         # Navigation, Footer
│   ├── Sponsor/        # Payment forms & gateway
│   └── ui/             # shadcn/ui + custom UI components
├── collections/        # Payload CMS collection schemas
└── hooks/              # Custom React hooks
```

## Development Patterns

### Component Conventions
- Use `'use client'` for interactive components (forms, animations, hooks)
- Server components by default for layouts and static content
- Import components from `@/components/[Category]/ComponentName`
- Custom UI components extend shadcn/ui patterns in `@/components/ui/`

### Styling Patterns
- **Color System**: Use `primary`, `secondary`, `tertiary` CSS custom properties
- **Animations**: Framer Motion with `motion` import, consistent transition durations
- **Forms**: Tailwind classes with `backdrop-blur-[5px]` for glassmorphism
- **Buttons**: Custom `SwooshButton` and shadcn `Button` components
- **No Border Radius**: Consistent `borderRadius: 0` and `rounded-none` styling

### Payment Integration
The payment system follows a specific flow:
1. **Frontend**: `DonationForm` + `usePaymentGateway` hook
2. **API Routes**: `/api/payments/create-order` → `/api/payments/verify`
3. **Database**: Comprehensive payments table with audit fields
4. **Webhook**: `/api/payments/webhook` for status updates

Key payment patterns:
- Amount conversion: INR to paise (`amount * 100`)
- Receipt generation: `donation_${timestamp}_${email_prefix}`
- Form validation: Different fields required per payment type (UPI vs card)
- Status management: `idle | processing | success | error` states

### Authentication & Authorization
- **Payload CMS Admin**: Access via `/admin` route with built-in authentication
- **Admin Access**: Payload CMS users have full admin access to collections and payments
- **Payment Collection**: Secure payment data storage with role-based access
- **No Custom Auth**: Payload CMS handles all authentication internally

## Development Commands

```bash
# Development with Turbopack
npm run dev

# Build with Turbopack  
npm run build

# Linting
npm run lint
```

## Environment Setup
Copy `example.env.local` to `.env.local` with:
- Payload CMS credentials (`PAYLOAD_SECRET`, `POSTGRES_URL`)
- Razorpay keys (`RAZORPAY_*` + `NEXT_PUBLIC_RAZORPAY_KEY_ID`)
- Webhook secrets

## Database Integration
- **Collections**: Payments collection with comprehensive schema
- **Admin Interface**: Built-in Payload CMS admin for payment management
- **Audit**: Track `ipAddress`, `userAgent`, timestamps
- **Compliance**: Store PAN, address for 80G tax certificates

## Key Files to Reference
- **Payment Flow**: `src/components/Sponsor/DonationForm.tsx` + `PaymentGateway.tsx`
- **API Pattern**: `src/app/api/payments/create-order/route.ts`
- **Auth Pattern**: `src/app/admin/layout.tsx`
- **UI Components**: `src/components/ui/` (shadcn/ui extensions)
- **Styling**: `src/app/globals.css` (CSS custom properties)

## Common Tasks

### Adding New UI Components
1. Use shadcn/ui CLI or extend existing patterns in `src/components/ui/`
2. Follow the no-border-radius convention
3. Use motion components for animations
4. Import icons from `lucide-react`

### Payment Integration Changes
1. Update `DonationForm.tsx` for UI changes
2. Modify `PaymentGateway.tsx` for gateway logic
3. Update API routes for backend changes
4. Test with Razorpay test credentials
5. Refer to `PAYMENT_INTEGRATION.md` for detailed flow

### Admin Features
1. Protect with admin layout pattern
2. Use Supabase RLS for data security
3. Follow existing tab structure in admin interface
4. Add error handling for unauthorized access

### Animation Patterns
- Use `motion.div` with consistent `initial`, `animate`, `transition` props
- Standard transitions: `duration: 0.8` for page entries
- Stagger animations for lists using `motion` utilities
- Backdrop blur effects combined with animations

Remember: This is a production charity website with real payment processing. Always test payment flows thoroughly and maintain security best practices.