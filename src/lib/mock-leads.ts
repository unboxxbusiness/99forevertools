import type { Lead } from '@/ai/flows/qualify-leads';

export const mockLeads: Lead[] = [
  // Restaurants in New York
  { businessName: 'Pizza Palace', websiteStatus: 'exists', country: 'USA', city: 'New York', pincode: '10001' },
  { businessName: 'Burger Barn', websiteStatus: 'missing', country: 'USA', city: 'New York', pincode: '10001' },
  { businessName: 'Sushi Spot', websiteStatus: 'exists', country: 'USA', city: 'New York', pincode: '10002' },
  { businessName: 'Taco Town', websiteStatus: 'missing', country: 'USA', city: 'New York', pincode: '10002' },
  { businessName: 'Pasta Place', websiteStatus: 'exists', country: 'USA', city: 'New York', pincode: '10003' },
  { businessName: 'Downtown Diner', websiteStatus: 'missing', country: 'USA', city: 'New York', pincode: '10003' },
  
  // Plumbers in Los Angeles
  { businessName: 'LA Drains', websiteStatus: 'exists', country: 'USA', city: 'Los Angeles', pincode: '90001' },
  { businessName: 'Pipe Pros', websiteStatus: 'missing', country: 'USA', city: 'Los Angeles', pincode: '90001' },
  { businessName: 'Flow Masters', websiteStatus: 'exists', country: 'USA', city: 'Los Angeles', pincode: '90002' },
  { businessName: 'The Plumb-inator', websiteStatus: 'missing', country: 'USA', city: 'Los Angeles', pincode: '90002' },
  { businessName: 'Hollywood Pipes', websiteStatus: 'exists', country: 'USA', city: 'Los Angeles', pincode: '90028' },
  { businessName: 'Sunset Plumbing', websiteStatus: 'missing', country: 'USA', city: 'Los Angeles', pincode: '90028' },

  // Gyms in Chicago
  { businessName: 'Windy City Fitness', websiteStatus: 'missing', country: 'USA', city: 'Chicago', pincode: '60601' },
  { businessName: 'Iron Temple', websiteStatus: 'exists', country: 'USA', city: 'Chicago', pincode: '60601' },
  { businessName: 'Cardio Central', websiteStatus: 'missing', country: 'USA', city: 'Chicago', pincode: '60602' },
  { businessName: 'Chicago Strength', websiteStatus: 'exists', country: 'USA', city: 'Chicago', pincode: '60602' },
  { businessName: 'Lakeside Gym', websiteStatus: 'missing', country: 'USA', city: 'Chicago', pincode: '60605' },
  { businessName: 'The Loop Fitness', websiteStatus: 'exists', country: 'USA', city: 'Chicago', pincode: '60605' },

  // Bookstores in San Francisco
  { businessName: 'Golden Gate Books', websiteStatus: 'exists', country: 'USA', city: 'San Francisco', pincode: '94102' },
  { businessName: 'Bay Area Reads', websiteStatus: 'exists', country: 'USA', city: 'San Francisco', pincode: '94102' },
  { businessName: 'The Foggy Reader', websiteStatus: 'missing', country: 'USA', city: 'San Francisco', pincode: '94117' },
  { businessName: 'SF Book Nook', websiteStatus: 'missing', country: 'USA', city: 'San Francisco', pincode: '94117' },
  { businessName: 'Alcatraz Books', websiteStatus: 'exists', country: 'USA', city: 'San Francisco', pincode: '94133' },
  { businessName: 'Haight-Ashbury Pages', websiteStatus: 'missing', country: 'USA', city: 'San Francisco', pincode: '94133' },

  // Cafes in Miami
  { businessName: 'Sunshine Cafe', websiteStatus: 'missing', country: 'USA', city: 'Miami', pincode: '33101' },
  { businessName: 'Ocean Brews', websiteStatus: 'exists', country: 'USA', city: 'Miami', pincode: '33101' },
  { businessName: 'Cuban Coffee Corner', websiteStatus: 'missing', country: 'USA', city: 'Miami', pincode: '33130' },
  { businessName: 'Bayside Beans', websiteStatus: 'exists', country: 'USA', city: 'Miami', pincode: '33130' },
  { businessName: 'Miami Grind', websiteStatus: 'missing', country: 'USA', city: 'Miami', pincode: '33135' },
  { businessName: 'Little Havana Roasters', websiteStatus: 'exists', country: 'USA', city: 'Miami', pincode: '33135' },
];

export const mockBusinessTypes = [
  'Restaurant',
  'Plumber',
  'Gym',
  'Bookstore',
  'Cafe',
];
