export type PropertyStatus = "AVAILABLE" | "UPCOMING" | "OCCUPIED";

export type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  unit?: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  availableDate: string;
  status: PropertyStatus;
  description: string;
  propertyDetails: string[];
  unitDetails: string[];
  amenities: string[];
  images: string[];
};

// TODO: Replace this static data with a backend/API source when the future admin portal is added.
// TODO: Add application, document, maintenance request, notification, and Stripe rent-payment models later.
export const properties: Property[] = [
  {
    id: "home-1",
    title: "Home 1",
    address: "Address placeholder",
    city: "Chicago",
    state: "IL",
    zip: "00000",
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 1640,
    rentAmount: 2250,
    availableDate: "Available date placeholder",
    status: "AVAILABLE",
    description:
      "A bright, comfortable rental home placeholder with flexible living space, practical storage, and convenient access to neighborhood services. Replace this text with the final listing description.",
    propertyDetails: ["Single-family placeholder", "Street parking details TBD", "Lease terms TBD"],
    unitDetails: ["Full home rental", "Three-bedroom layout placeholder", "Private entry"],
    amenities: ["In-unit laundry", "Garage parking", "Updated kitchen", "Private patio"],
    images: ["/images/remvick-hero.png"],
  },
  {
    id: "home-2",
    title: "Home 2",
    address: "Address placeholder",
    city: "Dolton",
    state: "IL",
    zip: "00000",
    unit: "Unit 1",
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 980,
    rentAmount: 1650,
    availableDate: "Upcoming availability placeholder",
    status: "UPCOMING",
    description:
      "A well-kept duplex placeholder designed for straightforward rental marketing review. Real photos, address details, and showing instructions will be added later.",
    propertyDetails: ["Multi-unit property placeholder", "Shared exterior maintenance TBD", "Showing access TBD"],
    unitDetails: ["Unit 1 placeholder", "Two-bedroom unit", "Unit-specific utilities TBD"],
    amenities: ["Off-street parking", "Pet policy placeholder", "Lawn care details TBD", "Close to transit placeholder"],
    images: ["/images/remvick-hero.png"],
  },
  {
    id: "home-3",
    title: "Home 3",
    address: "Address placeholder",
    city: "Calumet City",
    state: "IL",
    zip: "00000",
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2180,
    rentAmount: 2850,
    availableDate: "Occupied",
    status: "OCCUPIED",
    description:
      "A larger single-family rental placeholder for future owner-facing property records. Occupied properties are hidden from public rental listings.",
    propertyDetails: ["Owner/admin record placeholder", "Occupied property hidden publicly", "Renewal tracking TBD"],
    unitDetails: ["Full home record", "Current tenant details hidden", "Internal-only listing data"],
    amenities: ["Finished lower level", "Fenced yard", "Central air", "School district placeholder"],
    images: ["/images/remvick-hero.png"],
  },
  {
    id: "home-4",
    title: "Home 4",
    address: "Address placeholder",
    city: "Markham",
    state: "IL",
    zip: "00000",
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 720,
    rentAmount: 1350,
    availableDate: "Available date placeholder",
    status: "AVAILABLE",
    description:
      "A compact apartment placeholder with clean layout, warm finishes, and simple rental details for future lead capture testing.",
    propertyDetails: ["Small residential property placeholder", "Parking details TBD", "Lease terms TBD"],
    unitDetails: ["Apartment-style unit", "One-bedroom layout placeholder", "Utilities details TBD"],
    amenities: ["Secure entry placeholder", "Laundry access", "Storage unit", "Utilities details TBD"],
    images: ["/images/remvick-hero.png"],
  },
];

export const publicProperties = properties.filter((property) => property.status !== "OCCUPIED");

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}

export function getPublicPropertyById(id: string) {
  return publicProperties.find((property) => property.id === id);
}
