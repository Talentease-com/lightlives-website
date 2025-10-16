// Shared validation utilities for both frontend forms and Payload CMS

export const ValidationPatterns = {
  // Phone number patterns
  phone: {
    indianWithCountryCode: /^\+91[6-9]\d{9}$/,
    indianWithoutPlus: /^91[6-9]\d{9}$/,
    indianMobile: /^[6-9]\d{9}$/,
    international: /^\+\d{10,14}$/,
  },
  
  // Email pattern
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Name pattern (letters, spaces, hyphens, apostrophes, periods)
  name: /^[a-zA-Z\s\-'\.]+$/,
  
  // PAN pattern
  pan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
}

export const ValidationMessages = {
  phone: {
    required: 'Phone number is required',
    invalid: 'Please enter a valid phone number (e.g., +91XXXXXXXXXX, 91XXXXXXXXXX, or XXXXXXXXXX)',
  },
  
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
    tooLong: 'Email address is too long (max 255 characters)',
  },
  
  name: {
    required: 'This field is required',
    invalid: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods',
    tooShort: 'Name must be at least 1 character long',
    whitespace: 'Name cannot start or end with spaces',
  },
  
  pan: {
    invalid: 'Please enter a valid PAN number (Format: ABCDE1234F - 5 letters, 4 digits, 1 letter)',
    notIndividual: 'Individual PAN number should have "P" as the 4th character',
  },
  
  amount: {
    required: 'Amount is required',
    tooLow: 'Amount must be at least ₹1',
    tooHigh: 'Amount cannot exceed ₹10,00,000',
    invalid: 'Amount must be greater than ₹0',
  },
  
  address: {
    required: 'Address is required',
    tooShort: 'Address must be at least 10 characters long',
    tooLong: 'Address is too long (max 500 characters)',
  },
}

export const validatePhone = (phone: string): string | true => {
  if (!phone || phone.trim().length === 0) {
    return ValidationMessages.phone.required
  }
  
  // Remove all non-digit characters except + at the beginning
  const cleanPhone = phone.replace(/[^\d+]/g, '')
  
  const patterns = [
    ValidationPatterns.phone.indianWithCountryCode,
    ValidationPatterns.phone.indianWithoutPlus,
    ValidationPatterns.phone.indianMobile,
    ValidationPatterns.phone.international,
  ]
  
  const isValid = patterns.some(pattern => pattern.test(cleanPhone))
  return isValid ? true : ValidationMessages.phone.invalid
}

export const validateEmail = (email: string): string | true => {
  if (!email || email.trim().length === 0) {
    return ValidationMessages.email.required
  }
  
  if (!ValidationPatterns.email.test(email)) {
    return ValidationMessages.email.invalid
  }
  
  if (email.length > 255) {
    return ValidationMessages.email.tooLong
  }
  
  return true
}

export const validateName = (name: string, isRequired = false): string | true => {
  if (isRequired && (!name || name.trim().length === 0)) {
    return ValidationMessages.name.required
  }
  
  if (name) {
    if (!ValidationPatterns.name.test(name)) {
      return ValidationMessages.name.invalid
    }
    
    if (name.length < 1) {
      return ValidationMessages.name.tooShort
    }
    
    if (name.trim() !== name) {
      return ValidationMessages.name.whitespace
    }
  }
  
  return true
}

export const validatePAN = (pan: string): string | true => {
  if (!pan || pan.trim().length === 0) {
    return true // PAN is optional
  }
  
  // Convert to uppercase for validation
  const upperPAN = pan.toUpperCase().trim()
  
  if (!ValidationPatterns.pan.test(upperPAN)) {
    return ValidationMessages.pan.invalid
  }
  
  // Additional validation - 4th character should be 'P' for individual PAN
  if (upperPAN[3] !== 'P') {
    return ValidationMessages.pan.notIndividual
  }
  
  return true
}

export const validateAmount = (amount: number | string): string | true => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
    return ValidationMessages.amount.invalid
  }
  
  if (numAmount < 1) {
    return ValidationMessages.amount.tooLow
  }
  
  if (numAmount > 1000000) {
    return ValidationMessages.amount.tooHigh
  }
  
  return true
}

export const validateAddress = (address: string, isRequired = false): string | true => {
  if (isRequired && (!address || address.trim().length === 0)) {
    return ValidationMessages.address.required
  }
  
  if (address) {
    if (address.trim().length < 10) {
      return ValidationMessages.address.tooShort
    }
    
    if (address.length > 500) {
      return ValidationMessages.address.tooLong
    }
  }
  
  return true
}