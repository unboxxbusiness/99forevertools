import type { Lead } from '@/ai/flows/qualify-leads';

export const mockLeads: Lead[] = [
  // Restaurants in New York, USA
  { businessName: 'Pizza Palace', websiteStatus: 'exists', country: 'USA', city: 'New York', pincode: '10001' },
  { businessName: 'Burger Barn', websiteStatus: 'missing', country: 'USA', city: 'New York', pincode: '10001' },
  { businessName: 'Sushi Spot', websiteStatus: 'exists', country: 'USA', city: 'New York', pincode: '10002' },
  { businessName: 'Taco Town', websiteStatus: 'missing', country: 'USA', city: 'New York', pincode: '10002' },
  
  // Plumbers in Los Angeles, USA
  { businessName: 'LA Drains', websiteStatus: 'exists', country: 'USA', city: 'Los Angeles', pincode: '90001' },
  { businessName: 'Pipe Pros', websiteStatus: 'missing', country: 'USA', city: 'Los Angeles', pincode: '90001' },

  // Cafes in London, UK
  { businessName: 'The Royal Brew', websiteStatus: 'exists', country: 'UK', city: 'London', pincode: 'SW1A 0AA' },
  { businessName: 'London Fog Cafe', websiteStatus: 'missing', country: 'UK', city: 'London', pincode: 'SW1A 0AA' },
  { businessName: 'Shoreditch Grind', websiteStatus: 'exists', country: 'UK', city: 'London', pincode: 'E1 6GY' },
  { businessName: 'Missing Bean', websiteStatus: 'missing', country: 'UK', city: 'London', pincode: 'E1 6GY' },

  // Tech Shops in Berlin, Germany
  { businessName: 'Berlin Electronics', websiteStatus: 'exists', country: 'Germany', city: 'Berlin', pincode: '10117' },
  { businessName: 'Gadget Garage', websiteStatus: 'missing', country: 'Germany', city: 'Berlin', pincode: '10117' },

  // Restaurants in Mumbai, India
  { businessName: 'Mumbai Masala', websiteStatus: 'exists', country: 'India', city: 'Mumbai', pincode: '400001' },
  { businessName: 'Curry Corner', websiteStatus: 'missing', country: 'India', city: 'Mumbai', pincode: '400001' },

  // Bookstores in Toronto, Canada
  { businessName: 'Toronto Tomes', websiteStatus: 'exists', country: 'Canada', city: 'Toronto', pincode: 'M5H 2N2' },
  { businessName: 'The Missing Page', websiteStatus: 'missing', country: 'Canada', city: 'Toronto', pincode: 'M5H 2N2' },
];

export const mockBusinessTypes = [
  'Restaurant',
  'Plumber',
  'Gym',
  'Bookstore',
  'Cafe',
  'Tech Shop',
];
