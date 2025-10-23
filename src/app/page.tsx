
'use client';

import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Percent, FileText, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, MessageSquare, Lightbulb, PartyPopper, TrendingUp, MapPin, Star } from 'lucide-react';

const tools:any[] = [
  {
    href: '/gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate GST amounts (add/remove) for any given price.',
    icon: <Percent className="w-8 h-8" />,
  },
  {
    href: '/invoice-generator',
    title: 'Invoice Generator',
    description: 'Quickly generate a clean, professional invoice to print or save as a PDF.',
    icon: <FileText className="w-8 h-8" />,
  },
  {
    href: '/business-loan-emi-calculator',
    title: 'Business Loan EMI Calculator',
    description: 'Calculate monthly payments for business loans.',
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    href: '/profit-margin-calculator',
    title: 'Profit Margin Calculator',
    description: 'Find the profit margin and markup percentage from cost and sale price.',
    icon: <CircleDollarSign className="w-8 h-8" />,
  },
  {
    href: '/break-even-point-calculator',
    title: 'Break-Even Point Calculator',
    description: 'Help businesses determine how much they need to sell to cover costs.',
    icon: <Scale className="w-8 h-8" />,
  },
  {
    href: '/salary-to-ctc-calculator',
    title: 'Salary to CTC Calculator',
    description: 'Estimate the total cost of an employee to the company.',
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    href: '/hra-exemption-calculator',
    title: 'HRA Exemption Calculator',
    description: 'Calculate your House Rent Allowance exemption for tax purposes.',
    icon: <HomeIcon className="w-8 h-8" />,
  },
  {
    href: '/pf-calculator',
    title: 'PF Calculator',
    description: 'Calculate employee and employer PF contributions.',
    icon: <Landmark className="w-8 h-8" />,
  },
  {
    href: '/discount-calculator',
    title: 'Discount Calculator',
    description: 'Quickly calculate the final price after a percentage discount.',
    icon: <TicketPercent className="w-8 h-8" />,
  },
  {
    href: '/unit-price-calculator',
    title: 'Unit Price Calculator',
    description: 'Compare product costs by their unit price (e.g., per kg/gram).',
    icon: <Scaling className="w-8 h-8" />,
  },
  {
    href: '/qr-code-generator',
    title: 'QR Code Generator',
    description: 'Instantly create a downloadable QR code for URLs, Wi-Fi, and more.',
    icon: <QrCode className="w-8 h-8" />,
  },
  {
    href: '/whatsapp-link-generator',
    title: 'WhatsApp Link Generator',
    description: 'Create a wa.me link with a pre-filled message.',
    icon: <MessageSquare className="w-8 h-8" />,
  },
  {
    href: '/business-slogan-generator',
    title: 'Business Slogan Generator',
    description: 'Generate catchy taglines based on keywords.',
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    href: '/festival-wish-generator',
    title: 'Festival Wish Generator',
    description: 'Create pre-written messages for Diwali, Holi, Eid, etc.',
    icon: <PartyPopper className="w-8 h-8" />,
  },
  {
    href: '/business-valuation-calculator',
    title: 'What\'s My Business Worth?',
    description: 'Get a fun, simple valuation based on your revenue and industry.',
    icon: <TrendingUp className="w-8 h-8" />,
  },
  {
    href: '/google-maps-link-generator',
    title: 'Google Maps Link Generator',
    description: 'Create a direct link to a business address on Google Maps.',
    icon: <MapPin className="w-8 h-8" />,
  },
  {
    href: '/review-link-generator',
    title: 'Google Review Link Generator',
    description: 'Create a direct link for customers to leave a Google Review.',
    icon: <Star className="w-8 h-8" />,
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Marketing Super-Tools
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of powerful, simple tools to supercharge your marketing efforts.
          </p>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.sort((a, b) => a.title.localeCompare(b.title)).map((tool, index) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${150 * (index + 1)}ms` }}>
                <ToolCard
                  href={tool.href}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
            <h3 className="mt-4 text-lg font-medium">No tools available yet.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your generated tools will appear here.
            </p>
          </div>
        )}
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground">
        More tools coming soon...
      </footer>
    </div>
  );
}
