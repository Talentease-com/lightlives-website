This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

 n

First, run the development server:
 
```bash
npm run dev
# or
yarn dev   
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Documentation

### Implementation Guides
- **[Payment Integration](PAYMENT_INTEGRATION.md)** - Razorpay setup, payment flow, and webhook handling
- **[Form Validation](FORM_VALIDATION.md)** - Centralized validation utilities
- **[Footer Revalidation](FOOTER_REVALIDATION.md)** - Cache invalidation patterns
- **[Payload Logging](PAYLOAD_LOGGING.md)** - CRUD operation logging
- **[Email Settings](EMAIL_SETTINGS_IMPLEMENTATION.md)** - Email configuration and setup
- **[Teams Page](TEAMS_PAGE_IMPLEMENTATION.md)** - Team member display implementation

### Infrastructure & DevOps
- **[Cloudflare R2 Custom Domain Setup](CLOUDFLARE_R2_CUSTOM_DOMAIN_SETUP.md)** - Configure CDN for media files to avoid serverless limits

## Website Pages

### Home
The main landing page for Light Lives website.

### Sponsor Page
A dedicated page for sponsoring children through donations. Features:
- One-time, recurring, and UPI payment options
- Customizable donation amounts
- Impact statistics
- Tax benefits information
- Bank transfer details

To access the sponsor page, navigate to `/sponsor` or use the "Sponsor" link in the Support Us dropdown in the navbar.
