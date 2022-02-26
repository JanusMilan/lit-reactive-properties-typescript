// Importieren Interface mit Address Typen
import { Address } from "./model";
// Importieren Interface mit User Typen
import { User } from "./model";

// exportiern Array mit User Daten 
export const users: User[] = [
  {
    id: 0,
    name: "Donald Mayfield"
  },
  {
    id: 1,
    name: "Jill J. Fritz"
  },
  {
    id: 2,
    name: "Terry Buttram"
  }
];

// exportiern Array mit Adress Daten 
export const address: Address[] = [
  {
    street: "2180 BELLFLOWER",
    country: "USA",
    state: "AL",
    city: "Madison",
    zipCode: 35064
  },
  {
    street: "845 ODOM ROAD, SUITE 200",
    country: "USA",
    state: "CA",
    city: "Los Angeles",
    zipCode: 90720
  },
  {
    street: "9025 QUEENS BLVD",
    country: "USA",
    state: "NY",
    city: "Queens",
    zipCode: 11355
  }
];
