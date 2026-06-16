export type PropertyStatus = "AVAILABLE" | "UPCOMING" | "OCCUPIED";

export type Property = {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  availableDate: string;
  status: PropertyStatus;
  description: string;
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
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 980,
    rentAmount: 1650,
    availableDate: "Upcoming availability placeholder",
    status: "UPCOMING",
    description:
      "A well-kept duplex placeholder designed for straightforward rental marketing review. Real photos, address details, and showing instructions will be added later.",
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
      "A larger single-family rental placeholder for demonstrating occupied listing states and future owner-facing property records.",
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
    amenities: ["Secure entry placeholder", "Laundry access", "Storage unit", "Utilities details TBD"],
    images: ["/images/remvick-hero.png"],
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}
