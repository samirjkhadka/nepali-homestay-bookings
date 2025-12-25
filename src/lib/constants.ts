const NAV_LINKS = [
  { href: "/search", label: "Homestays" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const PROVINCES = [
  "Koshi",
  "Madhesh",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
] as const;

const DISTRICTS: Record<string, string[]> = {
  Bagmati: ["Kathmandu", "Bhaktapur", "Lalitpur", "Dhading", "Kavre"],
  Gandaki: ["Kaski", "Gorkha", "Lamjung", "Tanahun", "Syangja"],
  Lumbini: ["Rupandehi", "Kapilvastu", "Nawalparasi", "Dang"],
  Koshi: ["Morang", "Sunsari", "Jhapa", "Ilam"],
} as const;

const MUNICIPALITIES: Record<string, string[]> = {
  Kathmandu: ["Kathmandu Metropolitan", "Kirtipur", "Tokha", "Budhanilkantha"],
  Bhaktapur: ["Bhaktapur Municipality", "Madhyapur Thimi"],
  Kaski: ["Pokhara Metropolitan", "Lekhnath"],
  Rupandehi: ["Butwal Sub-Metropolitan", "Siddharthanagar", "Tilottama"],
  Morang: ["Biratnagar Metropolitan", "Urlabari"],
};

const BADGES = [
  "Superhost",
  "Local Expert",
  "Verified",
  "New Host",
  "Cultural Ambassador",
] as const;


const AMENITIES = [
  "WiFi",
  "Kitchen",
  "Garden",
  "Mountain View",
  "Lakefront",
  "Parking",
  "Cultural Experience",
  "Breakfast Included",
  "Organic Meals",
  "Hot Water",
  "Heating",
];


export { PROVINCES, DISTRICTS, MUNICIPALITIES, BADGES, AMENITIES, NAV_LINKS };