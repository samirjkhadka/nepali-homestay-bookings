-- Users table (Clerk synced)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  clerk_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'guest', -- guest, host, admin
  phone VARCHAR(20),
  preferred_currency VARCHAR(10) DEFAULT 'NPR',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  host_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  price_npr INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  amenities JSONB,
  images JSONB,
  is_verified BOOLEAN DEFAULT false,
  instant_book BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Hosts table (multiple hosts per listing)
CREATE TABLE hosts (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  avatar TEXT,
  role VARCHAR(50),
  bio TEXT,
  languages JSONB,
  badges JSONB
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  listing_id INTEGER NOT NULL REFERENCES listings(id),
  guest_id INTEGER NOT NULL REFERENCES users(id),
  check_in TIMESTAMP NOT NULL,
  check_out TIMESTAMP NOT NULL,
  guests INTEGER NOT NULL,
  total_price_npr INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed
  gateway_ref VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);


-- Insert test users (hosts and guest)
INSERT INTO users (clerk_id, email, first_name, last_name, role, avatar_url) VALUES
('user_host_1', 'kamala@example.com', 'Kamala', 'Shakya', 'host', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'),
('user_host_2', 'binod@example.com', 'Binod', 'Gurung', 'host', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg'),
('user_guest_1', 'guest@example.com', 'John', 'Traveler', 'guest', 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'),
('user_admin', 'admin@example.com', 'Admin', 'User', 'admin', null)
ON CONFLICT (clerk_id) DO NOTHING;

-- Insert listings
INSERT INTO listings (
  host_id, title, description, location, province, price_npr, max_guests, bedrooms, bathrooms,
  amenities, images, latitude, longitude, is_verified, instant_book, status
) VALUES
(
  (SELECT id FROM users WHERE clerk_id = 'user_host_1'),
  'Traditional Newari House in Bhaktapur',
  'Experience authentic Newari culture in this beautifully preserved traditional house in the heart of Bhaktapur. Wake up to stunning views of ancient temples and enjoy home-cooked Newari meals with your host family.',
  'Bhaktapur', 'Bagmati', 1445, 4, 2, 1,
  '["WiFi","Kitchen","Garden","Cultural Experience","Breakfast Included"]',
  '["https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg","https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg","https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg","https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"]',
  27.6728, 85.4298, true, true, 'approved'
),
(
  (SELECT id FROM users WHERE clerk_id = 'user_host_2'),
  'Lakeside Mountain View Homestay',
  'Wake up to breathtaking views of the Annapurna range and Phewa Lake. This family-run homestay offers comfortable accommodation with traditional Nepali hospitality and delicious organic meals.',
  'Pokhara', 'Gandaki', 2235, 6, 3, 2,
  '["WiFi","Mountain View","Lakefront","Parking","Organic Meals"]',
  '["https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg","https://images.pexels.com/photos/1630673/pexels-photo-1630673.jpeg","https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg"]',
  28.2096, 83.9856, true, false, 'approved'
);

-- Insert hosts (multiple per listing)
INSERT INTO hosts (listing_id, name, avatar, role, bio, languages, badges) VALUES
(1, 'Kamala Shakya', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'Owner', 'Kamala is a passionate host who loves sharing Newari culture and cuisine with guests. She has been running the homestay for over 10 years.', '["English","Nepali","Newari"]', '["Superhost","Local Expert"]'),
(1, 'Suresh Shakya', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', 'Co-Host', 'Suresh helps with guest tours and is an expert in local history and temple architecture.', '["Nepali","Newari","Hindi"]', '["Verified"]'),
(2, 'Binod Gurung', 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', 'Owner', 'Binod is a nature lover and mountain guide who enjoys introducing guests to the beauty of Pokhara and the Annapurna region.', '["English","Nepali","Gurung"]', '["Superhost","Verified"]'),
(2, 'Mina Gurung', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', 'Chef', 'Mina prepares delicious organic meals and shares family recipes with guests.', '["Nepali","Hindi"]', '["Local Expert"]');

-- Insert sample bookings
INSERT INTO bookings (
  listing_id, guest_id, check_in, check_out, guests, total_price_npr, status, payment_status
) VALUES
(1, (SELECT id FROM users WHERE clerk_id = 'user_guest_1'), '2025-01-10', '2025-01-13', 2, 4335, 'confirmed', 'paid'),
(2, (SELECT id FROM users WHERE clerk_id = 'user_guest_1'), '2025-02-05', '2025-02-08', 4, 6705, 'pending', 'pending');