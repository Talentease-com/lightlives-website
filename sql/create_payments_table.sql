-- Create payments table for storing donation records
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Razorpay order details
  razorpay_order_id VARCHAR(255) UNIQUE NOT NULL,
  razorpay_payment_id VARCHAR(255),
  razorpay_signature VARCHAR(255),
  
  -- Payment details
  amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('onetime', 'recurring', 'upi')),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  
  -- Donor information
  first_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  pan_number VARCHAR(10),
  
  -- Recurring payment details
  is_recurring BOOLEAN DEFAULT FALSE,
  monthly_contribution_agreed BOOLEAN DEFAULT FALSE,
  
  -- Terms and conditions
  privacy_policy_agreed BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  receipt_number VARCHAR(50) UNIQUE,
  
  -- Additional fields for audit and compliance
  ip_address INET,
  user_agent TEXT,
  
  -- 80G certificate details
  certificate_issued BOOLEAN DEFAULT FALSE,
  certificate_number VARCHAR(50),
  certificate_issued_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order_id ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_payment_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_payment_type ON payments(payment_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add row level security (RLS)
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all payments
CREATE POLICY "Admins can view all payments" ON payments
  FOR SELECT
  USING (auth.role() = 'admin');

-- Create policy for users to view their own payments
CREATE POLICY "Users can view their own payments" ON payments
  FOR SELECT
  USING (email = auth.jwt() ->> 'email');

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON payments TO authenticated;
GRANT SELECT, INSERT ON payments TO anon;

-- Create policy to allow inserts when privacy policy is agreed
CREATE POLICY "Allow insert if privacy policy agreed" ON payments
  FOR INSERT
  WITH CHECK (privacy_policy_agreed = true);

-- Create function to generate receipt number
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS TEXT AS $$
DECLARE
    receipt_num TEXT;
    counter INTEGER;
BEGIN
    -- Get the current date in YYYYMMDD format
    receipt_num := 'LL' || TO_CHAR(NOW(), 'YYYYMMDD');
    
    -- Get the count of payments for today
    SELECT COUNT(*) INTO counter
    FROM payments
    WHERE DATE(created_at) = CURRENT_DATE;
    
    -- Append the counter with leading zeros
    receipt_num := receipt_num || LPAD((counter + 1)::TEXT, 4, '0');
    
    RETURN receipt_num;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically generate receipt number
CREATE OR REPLACE FUNCTION set_receipt_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.receipt_number IS NULL THEN
        NEW.receipt_number := generate_receipt_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_payment_receipt_number
    BEFORE INSERT ON payments
    FOR EACH ROW
    EXECUTE FUNCTION set_receipt_number();
