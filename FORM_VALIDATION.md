# Form Validation System

This document describes the comprehensive validation system implemented for the Light Lives donation forms, ensuring data integrity and user experience consistency.

## Overview

The validation system uses shared utilities between the frontend form (React Hook Form) and backend (Payload CMS) to ensure consistent validation rules and error messages across the entire application.

## Shared Validation Utilities

### Location
- **File**: `src/lib/validationUtils.ts`
- **Purpose**: Centralized validation logic used by both frontend forms and Payload CMS collections

### Validation Functions

#### `validatePhone(phone: string)`
- **Supports**: Indian mobile numbers with/without country codes, international numbers
- **Formats Accepted**:
  - `+91XXXXXXXXXX` (Indian with country code)
  - `91XXXXXXXXXX` (Indian without +)
  - `XXXXXXXXXX` (10-digit Indian mobile starting with 6-9)
  - `+XXXXXXXXXXX` (International format, 11-15 digits)
- **Example Valid**: `+919876543210`, `919876543210`, `9876543210`

#### `validateEmail(email: string)`
- **Rules**: 
  - Standard email format validation
  - Maximum 255 characters
  - Required field validation
- **Example Valid**: `user@example.com`

#### `validateName(name: string, isRequired: boolean)`
- **Rules**:
  - Only letters, spaces, hyphens, apostrophes, and periods
  - No leading/trailing spaces
  - Minimum 1 character if required
- **Example Valid**: `John`, `Mary-Jane`, `O'Connor`, `Dr. Smith`

#### `validatePAN(pan: string)`
- **Format**: 5 letters + 4 digits + 1 letter (ABCDE1234F)
- **Rules**:
  - 4th character must be 'P' for individual PAN
  - Case insensitive input, converted to uppercase
- **Example Valid**: `ABCDP1234F`

#### `validateAmount(amount: number | string)`
- **Rules**:
  - Minimum: ₹1
  - Maximum: ₹10,00,000
  - Must be positive number
- **Example Valid**: `1000`, `50000`

#### `validateAddress(address: string, isRequired: boolean)`
- **Rules**:
  - Minimum 10 characters when required
  - Maximum 500 characters
- **Example Valid**: `123 Main Street, Mumbai, Maharashtra 400001`

## Frontend Implementation (DonationForm)

### Integration with React Hook Form
```tsx
// Example usage in form field
{...register('phone', { 
  required: 'Phone number is required',
  validate: (value) => {
    const result = validatePhone(value || '')
    return result === true ? true : result
  }
})}
```

### Real-time Validation
- **Custom Amount**: Validates amount as user types
- **PAN Input**: Auto-converts to uppercase
- **Phone Input**: Includes placeholder with format examples

### Form Fields Validation

#### Required Fields (All Payment Types)
- **Last Name**: Name validation + required
- **Email**: Email validation + required  
- **Phone**: Phone validation + required
- **Privacy Policy**: Must be checked

#### Additional Required Fields (Non-UPI)
- **Address**: Address validation + required (min 10 chars)
- **PAN**: PAN validation + required

#### UPI-Specific Fields
- **First Name**: Name validation + required for UPI
- **UPI Amount**: Amount validation (₹1 - ₹10,00,000)

## Backend Implementation (Payload CMS)

### Collection Schema
- **File**: `src/collections/Payments.ts`
- **Integration**: Uses shared validation utilities for consistent validation

### Validation Integration
```typescript
// Example field configuration
{
  name: 'phone',
  type: 'text',
  required: true,
  validate: (val: string | null | undefined) => {
    return validatePhone(val || '')
  },
}
```

### Database Constraints
- **Unique Fields**: razorpayOrderId, receiptNumber
- **Required Fields**: amount, currency, paymentType, paymentStatus, lastName, email, phone, privacyPolicyAgreed
- **Field Limits**: Proper maxLength constraints for all text fields

## Error Messages

### Standardized Messages
All error messages are defined in `ValidationMessages` object in `validationUtils.ts`:

```typescript
export const ValidationMessages = {
  phone: {
    required: 'Phone number is required',
    invalid: 'Please enter a valid phone number (e.g., +91XXXXXXXXXX, 91XXXXXXXXXX, or XXXXXXXXXX)',
  },
  // ... other messages
}
```

### User-Friendly Display
- Clear, actionable error messages
- Format examples included where helpful
- Consistent styling across all form fields

## Payment Type Specific Validation

### One-Time Donation
- All standard fields required
- Address and PAN mandatory for 80G certificate

### Recurring/Monthly Donation
- All one-time fields +
- Monthly contribution agreement checkbox required

### UPI Payment
- Simplified form with basic details only
- First name becomes required
- No address/PAN required (optional)

## Benefits

1. **Consistency**: Same validation rules across frontend and backend
2. **Maintainability**: Single source of truth for validation logic
3. **User Experience**: Real-time validation with helpful error messages
4. **Data Integrity**: Robust server-side validation prevents invalid data
5. **Type Safety**: Full TypeScript support with proper type checking

## Testing the System

### Frontend Testing
1. Visit `/sponsor` page
2. Try different payment types (One-time, Monthly, UPI)
3. Test validation by entering invalid data:
   - Invalid phone numbers
   - Invalid email formats
   - Invalid PAN numbers
   - Invalid amounts

### Backend Testing
1. Access Payload admin at `/admin`
2. Try creating payment records manually
3. Validation errors will appear for invalid data
4. Same validation rules apply as frontend

## Future Enhancements

1. **International Support**: Add validation for other country phone formats
2. **Business PAN**: Support company PAN validation (non-P 4th character)
3. **Address Validation**: Integrate with postal code APIs
4. **Dynamic Limits**: Make amount limits configurable
5. **Localization**: Multi-language error messages