/*
  # Banking Application Schema

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - first_name (text)
      - last_name (text)
      - balance (decimal)
      - created_at (timestamp)
      
    - transactions
      - id (uuid)
      - user_id (uuid, references profiles)
      - amount (decimal)
      - type (text: 'income' or 'expense')
      - description (text)
      - category (text)
      - created_at (timestamp)
      
    - budgets
      - id (uuid)
      - user_id (uuid, references profiles)
      - category (text)
      - amount (decimal)
      - spent (decimal)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  balance decimal DEFAULT 0.00,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  amount decimal NOT NULL,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  description text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions"
  ON transactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create budgets table
CREATE TABLE budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles NOT NULL,
  category text NOT NULL,
  amount decimal NOT NULL,
  spent decimal DEFAULT 0.00,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own budgets"
  ON budgets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own budgets"
  ON budgets FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update balance
CREATE OR REPLACE FUNCTION update_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.type = 'income' THEN
    UPDATE profiles 
    SET balance = balance + NEW.amount
    WHERE id = NEW.user_id;
  ELSE
    UPDATE profiles 
    SET balance = balance - NEW.amount
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for balance updates
CREATE TRIGGER update_balance_on_transaction
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_balance();