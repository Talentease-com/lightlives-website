# Payment Integration Documentation

This document outlines the payment integration implementation for the Light Lives donation system using Razorpay and Supabase.

## Architecture Overview

The payment system consists of:

1. **Frontend Components**: `DonationForm` and `usePaymentGateway` hook
2. **Backend APIs**: Order creation, payment verification, and webhook handling
3. **Database**: Supabase payments table for storing donation records
4. **Payment Gateway**: Razorpay for processing payments

## Features

### Payment Types
- **One-time donations**: Single payment transactions
- **Monthly donations**: Recurring payment setup
- **UPI payments**: Quick UPI-based payments with QR code

### Security Features
- Payment signature verification
- Webhook signature validation
- Input sanitization and validation
- Row-level security on database
- Audit trail with IP address and user agent logging

### User Experience
- Real-time payment status updates
- Loading states and error handling
- Receipt generation
- Success/failure feedback

## Database Schema

The payment system uses a comprehensive `payments` table with the following structure:

```sql
-- Core payment information
id (UUID, Primary Key)
razorpay_order_id (VARCHAR, Unique)
razorpay_payment_id (VARCHAR)
razorpay_signature (VARCHAR)

-- Payment details
amount (DECIMAL)
currency (VARCHAR)
payment_type (ENUM: onetime, recurring, upi)
payment_status (ENUM: pending, completed, failed, cancelled)

-- Donor information
first_name (VARCHAR)
last_name (VARCHAR)
email (VARCHAR)
phone (VARCHAR)
address (TEXT)
pan_number (VARCHAR)

-- Compliance and audit
receipt_number (VARCHAR, Auto-generated)
ip_address (INET)
user_agent (TEXT)
privacy_policy_agreed (BOOLEAN)

-- Timestamps
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

## API Endpoints

### POST /api/payments/create-order
Creates a Razorpay order for payment processing.

**Request Body:**
```json
{
  "amount": 1000,
  "currency": "INR",
  "receipt": "donation_123456_user"
}
```

**Response:**
```json
{
  "id": "order_123456",
  "amount": 100000,
  "currency": "INR",
  "receipt": "donation_123456_user",
  "status": "created"
}
```

### POST /api/payments/verify
Verifies payment signature and stores donation record.

**Request Body:**
```json
{
  "razorpay_order_id": "order_123456",
  "razorpay_payment_id": "pay_123456",
  "razorpay_signature": "signature_hash",
  "amount": 1000,
  "currency": "INR",
  "paymentType": "onetime",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "address": "123 Street, City",
  "pan": "ABCDE1234F",
  "privacyPolicy": true
}
```

### POST /api/payments/webhook
Handles Razorpay webhook events for payment status updates.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Webhook Security
WEBHOOK_SECRET=your_webhook_secret
```

## Setup Instructions

### 1. Database Setup
Run the SQL script to create the payments table:
```bash
psql -f sql/create_payments_table.sql
```

### 2. Razorpay Configuration
1. Create a Razorpay account
2. Get API keys from the Razorpay dashboard
3. Set up webhook URL: `https://yourdomain.com/api/payments/webhook`
4. Configure webhook events: `payment.captured`, `payment.failed`, `order.paid`

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your credentials.

### 4. Test the Integration
1. Use Razorpay test keys for development
2. Test with Razorpay test card numbers
3. Verify database entries are created correctly

## Usage Example

```tsx
import DonationForm from '@/components/Sponsor/DonationForm';

function SponsorPage() {
  return (
    <div>
      <DonationForm className="max-w-2xl mx-auto" />
    </div>
  );
}
```

## Error Handling

The system includes comprehensive error handling:

- **Validation errors**: Form validation and input sanitization
- **Payment errors**: Razorpay payment failures and network issues
- **Database errors**: Connection issues and constraint violations
- **Security errors**: Invalid signatures and unauthorized access

## Security Considerations

1. **PCI Compliance**: All card data is handled by Razorpay (PCI DSS Level 1)
2. **Data Encryption**: Sensitive data is encrypted in transit and at rest
3. **Signature Verification**: All payments are verified using cryptographic signatures
4. **Access Control**: Database uses row-level security
5. **Audit Trail**: All transactions are logged with metadata

## Testing

### Test Cards (Razorpay)
- **Success**: 4111 1111 1111 1111
- **Failure**: 4111 1111 1111 1112
- **CVV**: Any 3-digit number
- **Expiry**: Any future date

### Test UPI IDs
- **Success**: success@razorpay
- **Failure**: failure@razorpay

## Monitoring and Analytics

- Monitor payment success rates
- Track donation patterns and amounts
- Monitor failed payments for issues
- Generate reports for tax compliance (80G certificates)

## Future Enhancements

1. **Email Notifications**: Send confirmation and receipt emails
2. **80G Certificate Generation**: Automated tax certificate generation
3. **Recurring Payment Management**: Donor portal for managing subscriptions
4. **Analytics Dashboard**: Admin dashboard for payment analytics
5. **Multi-currency Support**: Support for international donations

## Support

For issues related to:
- **Razorpay**: Check Razorpay documentation and dashboard
- **Supabase**: Check Supabase logs and documentation
- **Application**: Check browser console and server logs
