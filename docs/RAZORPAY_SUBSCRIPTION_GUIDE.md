# Razorpay Subscription Integration - Complete Guide

**Last Updated**: October 31, 2024  
**Status**: ✅ Implementation Complete - Ready for Testing

## Table of Contents
- [Overview](#overview)
- [How It Works](#how-it-works)
- [Implementation Summary](#implementation-summary)
- [Setup & Configuration](#setup--configuration)
- [Testing Guide](#testing-guide)
- [Technical Details](#technical-details)
- [Troubleshooting](#troubleshooting)

---

## Overview

### What Was Built
A complete recurring donation system using Razorpay subscriptions that allows donors to commit to monthly donations. The system automatically charges donors' cards every month without any user intervention.

### Key Features
- ✅ **Quantity-Based Pricing**: Single ₹1/month plan × quantity = desired amount
- ✅ **Automatic Monthly Billing**: Razorpay handles recurring charges
- ✅ **Webhook Integration**: Real-time status updates via webhooks
- ✅ **Complete Audit Trail**: Every event tracked and logged
- ✅ **Admin Dashboard**: View subscription status, billing cycles, and history
- ✅ **Zero Breaking Changes**: All existing payment flows unchanged
- ✅ **Type Safe**: Full TypeScript support

### The Concept
Instead of creating multiple plans (₹500/month, ₹1000/month, etc.), we use **one base plan** at ₹1/month and multiply by quantity:
- Donor wants ₹500/month → `quantity = 500`
- Donor wants ₹1000/month → `quantity = 1000`
- Plan ID: `plan_Ra3JkZ2WZM7KRt`

---

## How It Works

### User Flow

```
┌─────────────────────────────────────────────────────────┐
│ 1. USER SELECTS "MONTHLY" TAB                           │
│    Chooses ₹500/month donation                          │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 2. FILLS DONATION FORM                                  │
│    Name, Email, Phone, Address, PAN                     │
│    ✓ Agrees to monthly contribution                     │
│    ✓ Accepts privacy policy                             │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 3. CLICKS "DONATE ₹500/MONTH"                           │
│    → POST /api/payments/create-subscription             │
│    → Creates subscription (quantity=500)                │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 4. RAZORPAY CHECKOUT OPENS                              │
│    Shows: "₹500 will be charged every month"            │
│    User enters card details and pays                    │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 5. VERIFICATION & STORAGE                               │
│    → POST /api/payments/verify                          │
│    → Verifies signature                                 │
│    → Stores in database with subscription metadata      │
│    → Sends confirmation email                           │
└──────────────────┬──────────────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────────────┐
│ 6. MONTHLY AUTOMATIC CHARGES (30 days later)            │
│    → Razorpay charges card automatically                │
│    → Webhook: subscription.charged                      │
│    → Database updated                                   │
│    → Email sent                                         │
│    → Repeats every month for 12 months                  │
└─────────────────────────────────────────────────────────┘
```

### Subscription Lifecycle

```
created → authenticated → active
             │              │
             │              ├──→ (monthly) subscription.charged
             │              │
             │              ├──→ (payment fails) subscription.halted
             │              │         └──→ (retry success) → active
             │              │
             │              ├──→ (user cancels) subscription.cancelled
             │              │
             │              └──→ (12 months done) subscription.completed
```

---

## Implementation Summary

### Files Created
1. **`/src/app/(frontend)/api/payments/create-subscription/route.ts`**
   - API endpoint to create Razorpay subscriptions
   - Converts amount to quantity for ₹1 plan
   - Returns subscription details

### Files Modified
1. **`/src/collections/Payments.ts`**
   - Added 9 subscription fields (subscription ID, status, counts, dates, etc.)
   - All fields conditionally shown when `isRecurring: true`

2. **`/src/app/(frontend)/api/payments/verify/route.ts`**
   - Handles subscription signature verification
   - Stores subscription metadata
   - Different signature format: `payment_id|subscription_id`

3. **`/src/components/Sponsor/PaymentGateway.tsx`**
   - Added `createSubscription()` function
   - Auto-detects payment type and creates subscription vs order
   - Passes subscription data to verification

4. **`/src/app/(frontend)/api/payments/webhook/route.ts`**
   - Added 5 subscription event handlers
   - Updates database on billing cycles
   - Sends emails on successful charges

5. **`/src/payload-types.ts`**
   - Auto-regenerated TypeScript types (via `pnpm generate:types`)

### Files Unchanged
- **`/src/components/Sponsor/DonationForm.tsx`** - No changes needed!
- All one-time and UPI payment flows work as before

### New Database Fields

All added to `Payments` collection:

| Field | Type | Description |
|-------|------|-------------|
| `razorpaySubscriptionId` | text | Razorpay subscription ID |
| `planId` | text | Plan used (plan_Ra3JkZ2WZM7KRt) |
| `subscriptionQuantity` | number | Amount in ₹ (500 = ₹500/month) |
| `subscriptionStatus` | select | created, active, cancelled, etc. |
| `subscriptionStartDate` | date | When subscription started |
| `subscriptionEndDate` | date | When subscription ends |
| `totalSubscriptionCount` | number | Total billing cycles (12) |
| `paidSubscriptionCount` | number | Completed billing cycles |
| `remainingSubscriptionCount` | number | Remaining billing cycles |

---

## Setup & Configuration

### Prerequisites
- [ ] Razorpay account (test mode for development)
- [ ] Existing environment variables:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
  - `WEBHOOK_SECRET`

### Step 1: Create Razorpay Plan

**In Razorpay Dashboard:**
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate to: **Subscriptions → Plans**
3. Click: **Create Plan**
4. Configure:
   ```
   Plan Name: Monthly Donation Base Plan
   Billing Interval: Every 1 Month
   Plan Amount: ₹1.00
   Currency: INR
   Description: Base plan for quantity-based subscriptions
   ```
5. Click **Create Plan**
6. **Copy the Plan ID** (should be: `plan_Ra3JkZ2WZM7KRt`)
7. If different, update in `/src/app/(frontend)/api/payments/create-subscription/route.ts`:
   ```typescript
   const MONTHLY_PLAN_ID = "your_plan_id_here";
   ```

### Step 2: Configure Webhooks

**In Razorpay Dashboard:**
1. Navigate to: **Settings → Webhooks**
2. Click: **Add Webhook**
3. Configuration:
   ```
   Webhook URL: https://yourdomain.com/api/payments/webhook
   
   (For local testing with ngrok: https://your-id.ngrok.io/api/payments/webhook)
   ```
4. Select Events:
   - [x] `subscription.charged`
   - [x] `subscription.activated`
   - [x] `subscription.cancelled`
   - [x] `subscription.completed`
   - [x] `subscription.halted`
   - [x] `payment.captured` (existing)
   - [x] `payment.failed` (existing)
   - [x] `order.paid` (existing)
5. Copy **Webhook Secret**
6. Add to `.env.local` (should already exist):
   ```env
   WEBHOOK_SECRET=your_webhook_secret_here
   ```
7. Click **Create Webhook**

### Step 3: Verify Environment

Check `.env.local`:
```env
# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Webhook
WEBHOOK_SECRET=your_webhook_secret

# Database & other existing vars...
```

---

## Testing Guide

### Local Testing Setup

#### 1. Start Development Server
```bash
cd /Users/lance/Developer/Code/Talentease-repos/lightlives-website
pnpm dev
```

#### 2. Setup ngrok (for webhook testing)
```bash
# In a separate terminal
ngrok http 3000

# Copy the ngrok URL (e.g., https://abc123.ngrok.io)
# Add to Razorpay webhook: https://abc123.ngrok.io/api/payments/webhook
```

### Test Subscription Flow

#### Step 1: Create Subscription
1. Open: http://localhost:3000/sponsor
2. Click: **Monthly** tab
3. Select: **₹500** (or enter custom amount)
4. Fill form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +919876543210 or 9876543210
   - Address: 123 Test Street, Mumbai
   - PAN: ABCDE1234F
   - [✓] I agree to contribute monthly
   - [✓] Privacy Policy
5. Click: **Donate ₹500/Month**

#### Step 2: Complete Payment
Razorpay modal opens. Use test card:
```
Card Number: 4111 1111 1111 1111
Expiry: 12/25 (any future date)
CVV: 123 (any 3 digits)
OTP: 123456 (any 6 digits - if prompted)
```

#### Step 3: Verify Success
- ✅ Success message appears
- ✅ Receipt number shown
- ✅ Browser console shows no errors

### Verify Database

1. Open: http://localhost:3000/admin
2. Navigate: **Logs → Payments**
3. Find your test payment
4. Verify fields populated:
   - **Subscription ID**: `sub_xxxxxxxxxxxxx`
   - **Plan ID**: `plan_Ra3JkZ2WZM7KRt`
   - **Quantity**: 500
   - **Status**: "authenticated" or "active"
   - **Total Count**: 12
   - **Paid Count**: 0 (first charge not yet processed)
   - **Remaining Count**: 12

### Verify Webhooks

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Navigate: **Settings → Webhooks**
3. Click on your webhook
4. Check **Delivery Logs**
5. Should see events:
   - `subscription.charged` or `subscription.activated` ✓ 200 OK

### Check Application Logs

Look for these messages in terminal:
```
✓ Creating Razorpay subscription with options: {...}
✓ Razorpay subscription created successfully: sub_xxxxx
✓ Razorpay webhook event: subscription.charged
✓ Subscription charged: sub_xxxxx, Payment: pay_xxxxx
```

### Test Edge Cases

**Different Amounts:**
- [ ] ₹500
- [ ] ₹1000
- [ ] ₹2500
- [ ] Custom: ₹750

**Validation Errors:**
- [ ] Submit without monthly contribution checkbox
- [ ] Invalid PAN format (should fail)
- [ ] Invalid email format (should fail)

**Subscription Cancellation:**
1. Complete a subscription
2. Go to Razorpay Dashboard → Subscriptions
3. Find subscription and click Cancel
4. Check webhook logs for `subscription.cancelled`
5. Verify database status updated to "cancelled"

---

## Technical Details

### API Endpoints

#### `POST /api/payments/create-subscription`

**Purpose**: Creates Razorpay subscription

**Request:**
```json
{
  "amount": 500,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "notify": 1
}
```

**Response:**
```json
{
  "id": "sub_xxxxxxxxxxxxx",
  "plan_id": "plan_Ra3JkZ2WZM7KRt",
  "quantity": 500,
  "status": "created",
  "total_count": 12,
  "paid_count": 0,
  "remaining_count": 12,
  "start_at": 1730419200,
  "end_at": 1762041600,
  "short_url": "https://rzp.io/i/xxxxx"
}
```

#### `POST /api/payments/verify`

**Additional Subscription Fields:**
```json
{
  "razorpay_payment_id": "pay_xxxxxxxxxxxxx",
  "razorpay_subscription_id": "sub_xxxxxxxxxxxxx",
  "razorpay_signature": "abc123...",
  "planId": "plan_Ra3JkZ2WZM7KRt",
  "subscriptionQuantity": 500,
  "subscriptionStatus": "authenticated",
  "totalCount": 12,
  "paidCount": 0,
  "remainingCount": 12,
  "startAt": 1730419200,
  "endAt": 1762041600
}
```

**Signature Verification:**
- **Subscriptions**: HMAC(`payment_id|subscription_id`)
- **Regular Payments**: HMAC(`order_id|payment_id`)

### Webhook Events

#### `subscription.charged`
**When**: Monthly billing cycle completes successfully  
**Actions**:
- Update payment status to "completed"
- Update subscription status
- Increment paid count
- Decrement remaining count
- Send email confirmation

#### `subscription.activated`
**When**: Subscription becomes active after first payment  
**Actions**:
- Set status to "active"
- Record start date

#### `subscription.cancelled`
**When**: User or admin cancels subscription  
**Actions**:
- Set status to "cancelled"
- Update payment status

#### `subscription.completed`
**When**: All 12 billing cycles completed  
**Actions**:
- Set status to "completed"
- Record end date

#### `subscription.halted`
**When**: Payment fails (card declined, insufficient funds)  
**Actions**:
- Set status to "halted"
- Razorpay will retry automatically

### PaymentGateway Logic

```typescript
// Simplified logic
const handlePayment = async () => {
  if (paymentType === 'recurring') {
    // Create subscription
    const subscription = await createSubscription();
    
    // Open Razorpay with subscription_id
    razorpay.open({
      subscription_id: subscription.id,
      handler: (response) => {
        verifyPayment(response, subscription);
      }
    });
  } else {
    // Create order (existing flow)
    const order = await createOrder();
    
    // Open Razorpay with order_id
    razorpay.open({
      order_id: order.id,
      amount: order.amount,
      handler: (response) => {
        verifyPayment(response);
      }
    });
  }
};
```

### Admin Dashboard View

When viewing a subscription payment in Payload CMS:

```
┌──────────────────────────────────────────────────────┐
│ Payment Details                                      │
├──────────────────────────────────────────────────────┤
│ Receipt Number: LL20241031AB3D                       │
│ Amount: ₹500                                         │
│ Type: Recurring                                      │
│ Status: Completed                                    │
│                                                      │
│ Subscription Details                                 │
├──────────────────────────────────────────────────────┤
│ Subscription ID: sub_xxxxxxxxxxxxx                  │
│ Plan ID: plan_Ra3JkZ2WZM7KRt                        │
│ Quantity: 500                                        │
│ Status: Active                                       │
│                                                      │
│ Billing Cycles:                                      │
│ • Total: 12 months                                   │
│ • Paid: 3 cycles                                     │
│ • Remaining: 9 cycles                                │
│                                                      │
│ Dates:                                               │
│ • Start: Nov 1, 2024                                 │
│ • Next Charge: Feb 1, 2025                           │
│ • End: Nov 1, 2025                                   │
└──────────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Issue: "Invalid plan_id" error

**Symptoms**: Error when creating subscription  
**Causes**:
- Plan not created in Razorpay dashboard
- Wrong plan ID in code
- Using test key but plan created in live mode

**Solutions**:
1. Verify plan exists in Razorpay Dashboard → Subscriptions → Plans
2. Check plan ID matches in code: `plan_Ra3JkZ2WZM7KRt`
3. Ensure using correct mode (test/live)
4. Update `MONTHLY_PLAN_ID` constant if plan ID differs

### Issue: Signature verification failed

**Symptoms**: Payment completes but verification fails  
**Causes**:
- Wrong signature format for subscriptions
- Incorrect Razorpay secret key
- Extra whitespace in environment variables

**Solutions**:
1. Verify using correct format:
   - Subscriptions: `razorpay_payment_id|razorpay_subscription_id`
   - Regular: `razorpay_order_id|razorpay_payment_id`
2. Check `RAZORPAY_KEY_SECRET` in `.env.local`
3. Remove any whitespace from environment variables
4. Restart dev server after env changes

### Issue: Webhook not triggered

**Symptoms**: No webhook events received  
**Causes**:
- Webhook URL not configured
- Local development without ngrok
- Webhook secret mismatch
- Events not selected

**Solutions**:
1. Configure webhook in Razorpay Dashboard
2. Use ngrok for local testing
3. Verify webhook secret matches `.env.local`
4. Check webhook event selection includes subscription events
5. Check Razorpay webhook logs for delivery failures

### Issue: "razorpayOrderId is required" error

**Symptoms**: Subscription payment fails validation  
**Causes**:
- `razorpayOrderId` was set as required but subscriptions don't have order IDs

**Solutions**:
✅ **Already Fixed**: Field is now optional (subscriptions use `razorpaySubscriptionId` instead)

### Issue: Database not updating after webhook

**Symptoms**: Webhook received but payment record not updated  
**Causes**:
- Subscription ID doesn't match database record
- Payment record not found
- Type mismatch after schema change

**Solutions**:
1. Verify subscription ID stored correctly during initial payment
2. Check webhook handler can find payment by subscription ID
3. Regenerate types: `pnpm generate:types`
4. Restart dev server
5. Check application logs for specific error

### Issue: Amount not matching

**Symptoms**: Charged amount different from expected  
**Causes**:
- Incorrect quantity calculation
- Plan amount not ₹1

**Solutions**:
1. Verify plan amount is ₹1 in Razorpay dashboard
2. Check quantity = desired amount (500 for ₹500)
3. Ensure no extra fees/taxes configured in plan

### Issue: Subscription not showing in admin

**Symptoms**: Payment created but subscription fields empty  
**Causes**:
- Fields only visible when `isRecurring: true`
- Data not saved during verification

**Solutions**:
1. Check `isRecurring` field is `true`
2. Verify subscription data passed to verify endpoint
3. Check payload.create() includes subscription fields
4. Look for errors in verification API logs

---

## Production Deployment Checklist

### Before Going Live

- [ ] **Switch to Live Keys**
  ```env
  RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
  RAZORPAY_KEY_SECRET=live_secret_key
  NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
  ```

- [ ] **Create Live Plan**
  - Switch to Live Mode in Razorpay Dashboard
  - Create same plan (₹1/month)
  - Update plan ID in code if different

- [ ] **Configure Live Webhook**
  - Use production URL
  - Select same events
  - Update `WEBHOOK_SECRET` with live secret

- [ ] **Test in Production**
  - Use test card in live mode
  - Verify webhooks work
  - Check email delivery

- [ ] **Monitor First Week**
  - Check subscription creation rate
  - Monitor webhook delivery success
  - Review failed payments
  - Verify email confirmations

### Ongoing Monitoring

**Daily (First Month)**:
- Razorpay Dashboard → Subscriptions (check new subscriptions)
- Webhook delivery logs (ensure 100% success rate)
- Application logs (look for errors)

**Weekly**:
- Review failed payments and retry status
- Check subscription cancellation rate
- Monitor donor feedback

**Monthly**:
- Generate revenue reports
- Check subscriptions nearing completion (month 11-12)
- Plan renewal/thank you campaigns

---

## Quick Reference

### Test Cards
```
Success: 4111 1111 1111 1111
Failure: 4111 1111 1111 1112
CVV: Any 3 digits
Expiry: Any future date
OTP: Any 6 digits
```

### Key URLs
- Razorpay Dashboard: https://dashboard.razorpay.com
- Webhook Logs: Dashboard → Settings → Webhooks
- Subscription Management: Dashboard → Subscriptions
- API Docs: https://razorpay.com/docs/api/subscriptions/

### Commands
```bash
# Start dev server
pnpm dev

# Regenerate types
pnpm generate:types

# Build for production
pnpm build

# Start ngrok
ngrok http 3000
```

### Environment Variables
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
WEBHOOK_SECRET=your_webhook_secret
```

### Plan Configuration
- **Plan ID**: `plan_Ra3JkZ2WZM7KRt`
- **Amount**: ₹1/month
- **Location**: `/src/app/(frontend)/api/payments/create-subscription/route.ts`

---

## Support & Resources

### Documentation
- This guide (comprehensive)
- `/docs/PAYMENT_INTEGRATION.md` (original payment docs)
- Inline code comments

### External Resources
- [Razorpay Subscriptions API](https://razorpay.com/docs/api/subscriptions/)
- [Razorpay Checkout](https://razorpay.com/docs/payments/subscriptions/checkout/)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)

### Getting Help
1. Check this documentation
2. Review Razorpay dashboard logs
3. Check application logs for errors
4. Verify environment variables
5. Contact Razorpay support: support@razorpay.com

---

## Success Criteria

Your integration is successful when:
- ✅ Code compiles without errors
- ✅ Test subscription completes successfully
- ✅ Database stores subscription data correctly
- ✅ Webhooks are received and processed (check logs)
- ✅ Confirmation emails are sent
- ✅ Admin panel shows subscription details
- ✅ Monthly charges process automatically
- ✅ Donors can successfully commit to recurring donations

**Implementation Status**: ✅ **COMPLETE - Ready for Testing**

---

*This guide consolidates all subscription integration documentation into one comprehensive resource. For questions or issues, refer to the troubleshooting section or check the referenced external documentation.*
