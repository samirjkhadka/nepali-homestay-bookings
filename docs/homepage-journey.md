# Homepage User Journey & Acceptance Criteria

## User Story
As a traveler exploring Nepal,  
I want to land on a beautiful, authentic homepage  
So that I feel the warmth of Nepali hospitality and am inspired to book a homestay.

## Acceptance Criteria
- [ ] Hero carousel shows 3–5 featured listings with stunning photos
- [ ] Each slide shows: title, location, price (in user currency), host name
- [ ] Currency selector in navbar (NPR default, remembers choice)
- [ ] Dark mode toggle
- [ ] Featured listings grid below hero
- [ ] "Why Choose Nepali Homestays" section highlighting community impact
- [ ] Responsive on mobile

## Test Cases
1. User lands → sees hero carousel auto-rotating
2. Changes currency → all prices update instantly
3. Clicks listing → navigates to detail page
4. Mobile view → menu opens smoothly

-- 1. Insert users (hosts)
INSERT INTO users (clerk_id, email, first_name, last_name, role) VALUES
('host_1', 'kamala@example.com', 'Kamala', 'Shakya', 'host'),
('host_2', 'binod@example.com', 'Binod', 'Gurung', 'host')
ON CONFLICT (clerk_id) DO NOTHING;

-- 2. Insert listings
INSERT INTO listings (
  host_id, title, description, location, province, price_npr, max_guests, bedrooms, bathrooms,
  amenities, images, latitude, longitude, is_verified, instant_book, status
) VALUES
(
  (SELECT id FROM users WHERE clerk_id = 'host_1'),
  'Traditional Newari House in Bhaktapur',
  'Experience authentic Newari culture in this beautifully preserved traditional house in the heart of Bhaktapur. Wake up to stunning views of ancient temples and enjoy home-cooked Newari meals with your host family.',
  'Bhaktapur', 'Bagmati', 1445, 4, 2, 1,
  '["WiFi","Kitchen","Garden","Cultural Experience"]',
  '["https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg","https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg","https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg"]',
  27.6728, 85.4298, true, true, 'approved'
),
(
  (SELECT id FROM users WHERE clerk_id = 'host_2'),
  'Lakeside Mountain View Homestay',
  'Wake up to breathtaking views of the Annapurna range and Phewa Lake. This family-run homestay offers comfortable accommodation with traditional Nepali hospitality and delicious organic meals.',
  'Pokhara', 'Gandaki', 2235, 6, 3, 2,
  '["WiFi","Mountain View","Lakefront","Parking"]',
  '["https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg","https://images.pexels.com/photos/1630673/pexels-photo-1630673.jpeg","https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg"]',
  28.2096, 83.9856, true, false, 'approved'
);

-- 3. Insert hosts
INSERT INTO hosts (listing_id, name, avatar, role, bio, languages, badges) VALUES
(
  1, 'Kamala Shakya',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  'Owner',
  'Kamala is a passionate host who loves sharing Newari culture and cuisine with guests. She has been running the homestay for over 10 years.',
  '["English","Nepali","Newari"]',
  '["Superhost","Local Expert"]'
),
(
  1, 'Suresh Shakya',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  'Co-Host',
  'Suresh helps with guest tours and is an expert in local history and temple architecture.',
  '["Nepali","Newari","Hindi"]',
  '["Verified"]'
),
(
  2, 'Binod Gurung',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  'Owner',
  'Binod is a nature lover and mountain guide who enjoys introducing guests to the beauty of Pokhara and the Annapurna region.',
  '["English","Nepali","Gurung"]',
  '["Superhost","Verified"]'
),
(
  2, 'Mina Gurung',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  'Chef',
  'Mina prepares delicious organic meals and shares family recipes with guests.',
  '["Nepali","Hindi"]',
  '["Local Expert"]'
);