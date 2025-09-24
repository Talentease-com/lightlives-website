# GitHub Copilot Instructions for Light Lives Website

## Project Overview
Light Lives is a Next.js 15 charity website featuring a sophisticated donation system with Razorpay payment integration, Supabase authentication, and admin functionality. The project uses Tailwind CSS 4, Framer Motion for animations, and shadcn/ui components.

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Database**: Supabase (PostgreSQL with RLS)
- **Payments**: Razorpay integration with webhook support
- **Auth**: Supabase Auth with role-based access control
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
├── utils/supabase/     # Supabase clients (server, client, middleware)
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
- **Middleware**: Only protects `/admin/*` routes (see `src/middleware.ts`)
- **Admin Access**: User must have `website_admin` in `user_metadata.roles`
- **Supabase Clients**: Use appropriate client (`server.ts`, `client.ts`, `middleware.ts`)
- **Layout Protection**: Admin layout redirects unauthorized users

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
- Supabase credentials (`NEXT_PUBLIC_SUPABASE_*`)
- Razorpay keys (`RAZORPAY_*` + `NEXT_PUBLIC_RAZORPAY_KEY_ID`)
- Webhook secrets

## Database Integration
- **Tables**: Main `payments` table (see `sql/create_payments_table.sql`)
- **RLS**: Row-level security enabled
- **Audit**: Track `ip_address`, `user_agent`, timestamps
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