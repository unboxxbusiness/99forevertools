import type { Lead } from '@/ai/flows/qualify-leads';

export const mockLeads: Lead[] = [
  // Restaurants in New York
  { businessName: 'Pizza Palace', websiteStatus: 'exists', city: 'New York' },
  { businessName: 'Burger Barn', websiteStatus: 'missing', city: 'New York' },
  { businessName: 'Sushi Spot', websiteStatus: 'exists', city: 'New York' },
  { businessName: 'Taco Town', websiteStatus: 'missing', city: 'New York' },
  { businessName: 'Pasta Place', websiteStatus: 'exists', city: 'New York' },
  { businessName: 'Downtown Diner', websiteStatus: 'missing', city: 'New York' },
  
  // Plumbers in Los Angeles
  { businessName: 'LA Drains', websiteStatus: 'exists', city: 'Los Angeles' },
  { businessName: 'Pipe Pros', websiteStatus: 'missing', city: 'Los Angeles' },
  { businessName: 'Flow Masters', websiteStatus: 'exists', city: 'Los Angeles' },
  { businessName: 'The Plumb-inator', websiteStatus: 'missing', city: 'Los Angeles' },
  { businessName: 'Hollywood Pipes', websiteStatus: 'exists', city: 'Los Angeles' },
  { businessName: 'Sunset Plumbing', websiteStatus: 'missing', city: 'Los Angeles' },

  // Gyms in Chicago
  { businessName: 'Windy City Fitness', websiteStatus: 'missing', city: 'Chicago' },
  { businessName: 'Iron Temple', websiteStatus: 'exists', city: 'Chicago' },
  { businessName: 'Cardio Central', websiteStatus: 'missing', city: 'Chicago' },
  { businessName: 'Chicago Strength', websiteStatus: 'exists', city: 'Chicago' },
  { businessName: 'Lakeside Gym', websiteStatus: 'missing', city: 'Chicago' },
  { businessName: 'The Loop Fitness', websiteStatus: 'exists', city: 'Chicago' },

  // Bookstores in San Francisco
  { businessName: 'Golden Gate Books', websiteStatus: 'exists', city: 'San Francisco' },
  { businessName: 'Bay Area Reads', websiteStatus: 'exists', city: 'San Francisco' },
  { businessName: 'The Foggy Reader', websiteStatus: 'missing', city: 'San Francisco' },
  { businessName: 'SF Book Nook', websiteStatus: 'missing', city: 'San Francisco' },
  { businessName: 'Alcatraz Books', websiteStatus: 'exists', city: 'San Francisco' },
  { businessName: 'Haight-Ashbury Pages', websiteStatus: 'missing', city: 'San Francisco' },

  // Cafes in Miami
  { businessName: 'Sunshine Cafe', websiteStatus: 'missing', city: 'Miami' },
  { businessName: 'Ocean Brews', websiteStatus: 'exists', city: 'Miami' },
  { businessName: 'Cuban Coffee Corner', websiteStatus: 'missing', city: 'Miami' },
  { businessName: 'Bayside Beans', websiteStatus: 'exists', city: 'Miami' },
  { businessName: 'Miami Grind', websiteStatus: 'missing', city: 'Miami' },
  { businessName: 'Little Havana Roasters', websiteStatus: 'exists', city: 'Miami' },
];

export const mockBusinessTypes = [
  'Restaurant',
  'Plumber',
  'Gym',
  'Bookstore',
  'Cafe',
];
