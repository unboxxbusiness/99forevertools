
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Percent, FileText, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, MessageSquare, Lightbulb, PartyPopper, TrendingUp, MapPin, Star, Hash, PenSquare, Sparkles, Image, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link, Activity, Link2, ExternalLink, Camera, Code, Network, Search, Gift, FileJson, Bot, TestTube2, Mail, Users, CalculatorIcon, Paintbrush, Clock } from 'lucide-react';

const allTools = [
  {
    category: 'Calculators',
    icon: <CalculatorIcon className="w-6 h-6" />,
    tools: [
      { href: '/gst-calculator', title: 'GST Calculator', description: 'Calculate GST amounts (add/remove) for any given price.', icon: <Percent className="w-8 h-8" /> },
      { href: '/business-loan-emi-calculator', title: 'Business Loan EMI Calculator', description: 'Calculate monthly payments for business loans.', icon: <Briefcase className="w-8 h-8" /> },
      { href: '/profit-margin-calculator', title: 'Profit Margin Calculator', description: 'Find the profit margin and markup percentage from cost and sale price.', icon: <CircleDollarSign className="w-8 h-8" /> },
      { href: '/break-even-point-calculator', title: 'Break-Even Point Calculator', description: 'Determine how much you need to sell to cover costs.', icon: <Scale className="w-8 h-8" /> },
      { href: '/salary-to-ctc-calculator', title: 'Salary to CTC Calculator', description: 'Estimate the total cost of an employee to the company.', icon: <Calculator className="w-8 h-8" /> },
      { href: '/hra-exemption-calculator', title: 'HRA Exemption Calculator', description: 'Calculate your House Rent Allowance exemption for tax purposes.', icon: <HomeIcon className="w-8 h-8" /> },
      { href: '/pf-calculator', title: 'PF Calculator', description: 'Calculate employee and employer PF contributions.', icon: <Landmark className="w-8 h-8" /> },
      { href: '/discount-calculator', title: 'Discount Calculator', description: 'Quickly calculate the final price after a percentage discount.', icon: <TicketPercent className="w-8 h-8" /> },
      { href: '/unit-price-calculator', title: 'Unit Price Calculator', description: 'Compare product costs by their unit price (e.g., per kg/gram).', icon: <Scaling className="w-8 h-8" /> },
      { href: '/business-valuation-calculator', title: 'What\'s My Business Worth?', description: 'Get a fun, simple valuation based on your revenue and industry.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/compound-interest-calculator', title: 'Compound Interest Calculator', description: 'Visualize the future value of your investments.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/loan-repayment-calculator', title: 'Loan Repayment Calculator', description: 'Estimate monthly payments for various types of loans.', icon: <Landmark className="w-8 h-8" /> },
      { href: '/roi-calculator', title: 'ROI Calculator', description: 'Calculate the return on investment for your marketing campaigns.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/salary-sacrifice-calculator', title: 'Salary Sacrifice Calculator', description: 'Estimate tax savings from pre-tax pension contributions.', icon: <Calculator className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Content & SEO',
    icon: <Search className="w-6 h-6" />,
    tools: [
      { href: '/about-us-generator', title: 'About Us Page Generator', description: 'Help businesses write a simple "About Us" section.', icon: <Info className="w-8 h-8" /> },
      { href: '/meta-tag-generator', title: 'SERP Preview Tool', description: 'Show how a meta title and description will look on Google.', icon: <Search className="w-8 h-8" /> },
      { href: '/headline-analyzer', title: 'Headline Analyzer', description: 'Score a headline based on length, sentiment, and keywords.', icon: <Activity className="w-8 h-8" /> },
      { href: '/keyword-density-checker', title: 'Keyword Density Checker', description: 'Check the density of a keyword in your text.', icon: <TestTube2 className="w-8 h-8" /> },
      { href: '/readability-checker', title: 'Readability Checker', description: 'Calculate the Flesch-Kincaid readability score of your text.', icon: <TestTube2 className="w-8 h-8" /> },
      { href: '/lorem-ipsum-generator', title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your design mockups.', icon: <Pilcrow className="w-8 h-8" /> },
      { href: '/press-release-title-generator', title: 'Press Release Title Generator', description: 'Help businesses craft compelling headlines.', icon: <Sparkles className="w-8 h-8" /> },
      { href: '/word-counter', title: 'Word & Character Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: <FileText className="w-8 h-8" /> },
      { href: '/case-converter', title: 'Case Converter', description: 'Convert text to UPPERCASE, lowercase, Title Case, etc.', icon: <CaseSensitive className="w-8 h-8" /> },
      { href: '/hashtag-generator', title: 'Instagram Hashtag Generator', description: 'Suggest relevant hashtags based on a business category.', icon: <Hash className="w-8 h-8" /> },
      { href: '/robots-txt-generator', title: 'Robots.txt Generator', description: 'Create a robots.txt file to guide search engine crawlers.', icon: <Bot className="w-8 h-8" /> },
      { href: '/schema-generator', title: 'Schema Markup Generator', description: 'Generate structured data for articles, FAQs, and more.', icon: <FileJson className="w-8 h-8" /> },
      { href: '/utm-link-builder', title: 'UTM Link Builder', description: 'Create URLs with UTM parameters for campaign tracking.', icon: <Link2 className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Branding & Design',
    icon: <Paintbrush className="w-6 h-6" />,
    tools: [
      { href: '/invoice-generator', title: 'Invoice Generator', description: 'Quickly generate a clean, professional invoice.', icon: <FileText className="w-8 h-8" /> },
      { href: '/business-slogan-generator', title: 'Business Slogan Generator', description: 'Generate catchy taglines based on keywords.', icon: <Lightbulb className="w-8 h-8" /> },
      { href: '/business-name-generator', title: 'Business Name Generator', description: 'Generate potential names for a new business.', icon: <PenSquare className="w-8 h-8" /> },
      { href: '/image-compressor', title: 'Image Compressor', description: 'Reduce image file sizes for faster web loading.', icon: <Image className="w-8 h-8" /> },
      { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images to specific dimensions.', icon: <Crop className="w-8 h-8" /> },
      { href: '/logo-maker', title: 'Logo Maker', description: 'Create a simple, text-based logo for your business.', icon: <Palette className="w-8 h-8" /> },
      { href: '/color-palette-generator', title: 'Color Palette Generator', description: 'Generate accessible color schemes from a base color.', icon: <Palette className="w-8 h-8" /> },
      { href: '/watermark-adder', title: 'Watermark Adder', description: 'Add a text or image watermark to your pictures.', icon: <Layers className="w-8 h-8" /> },
      { href: '/before-after-slider', title: "'Before & After' Slider", description: 'Create an interactive slider to showcase transformations.', icon: <GitCompareArrows className="w-8 h-8" /> },
      { href: '/gif-maker', title: 'GIF Maker', description: 'Convert a series of images into an animated GIF.', icon: <Clapperboard className="w-8 h-8" /> },
      { href: '/favicon-generator', title: 'Favicon Generator', description: 'Create a favicon pack from any image.', icon: <Star className="w-8 h-8" /> },
      { href: '/youtube-thumbnail-preview', title: 'YouTube Thumbnail Preview', description: 'See how your thumbnail will look on the YouTube homepage.', icon: <PlaySquare className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Marketing & Utilities',
    icon: <Users className="w-6 h-6" />,
    tools: [
      { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Instantly create a downloadable QR code.', icon: <QrCode className="w-8 h-8" /> },
      { href: '/vcard-qr-code-generator', title: 'Business Card QR Code Generator', description: 'Generate a QR code that contains contact info (vCard).', icon: <Contact className="w-8 h-8" /> },
      { href: '/whatsapp-link-generator', title: 'WhatsApp Link Generator', description: 'Create a wa.me link with a pre-filled message.', icon: <MessageSquare className="w-8 h-8" /> },
      { href: '/festival-wish-generator', title: 'Festival Wish Generator', description: 'Create pre-written messages for Diwali, Holi, Eid, etc.', icon: <PartyPopper className="w-8 h-8" /> },
      { href: '/google-maps-link-generator', title: 'Google Maps Link Generator', description: 'Create a direct link to a business address on Google Maps.', icon: <MapPin className="w-8 h-8" /> },
      { href: '/review-link-generator', title: 'Google Review Link Generator', description: 'Create a direct link for customers to leave a Google Review.', icon: <Star className="w-8 h-8" /> },
      { href: '/privacy-policy-generator', title: 'Privacy Policy Generator', description: 'Generate a generic privacy policy for your website.', icon: <Shield className="w-8 h-8" /> },
      { href: '/terms-and-conditions-generator', title: 'Terms & Conditions Generator', description: 'Generate a generic T&C page for your website.', icon: <FileText className="w-8 h-8" /> },
      { href: '/email-signature-generator', title: 'Email Signature Generator', description: 'Create a professional HTML email signature.', icon: <PenSquare className="w-8 h-8" /> },
      { href: '/text-to-speech', title: 'Text to Speech', description: 'Convert text passages into spoken audio.', icon: <Volume2 className="w-8 h-8" /> },
      { href: '/wav-to-mp3-converter', title: 'WAV to MP3 Converter', description: 'Convert .wav audio files to .mp3 format.', icon: <AudioLines className="w-8 h-8" /> },
      { href: '/url-shortener', title: 'URL Redirect Tool', description: 'Create a short link on your domain that redirects to a long URL.', icon: <ExternalLink className="w-8 h-8" /> },
      { href: '/what-is-my-ip', title: 'What Is My IP?', description: 'A simple utility that shows your public IP address.', icon: <Network className="w-8 h-8" /> },
      { href: '/discount-coupon-generator', title: 'Discount Coupon Code Generator', description: 'Create batches of unique, random codes for campaigns.', icon: <Gift className="w-8 h-8" /> },
      { href: '/digital-business-card', title: 'Digital Business Card Generator', description: 'Create a modern, shareable digital business card.', icon: <Contact className="w-8 h-8" /> },
      { href: '/email-permutator', title: 'Email Permutator', description: 'Generate possible email addresses from a name and domain.', icon: <Mail className="w-8 h-8" /> },
      { href: '/email-subject-line-tester', title: 'Email Subject Line Tester', description: 'Analyze your email subject lines for potential issues.', icon: <Mail className="w-8 h-8" /> },
      { href: '/time-zone-converter', title: 'Time Zone Converter', description: 'Compare time across different cities.', icon: <Clock className="w-8 h-8" /> },
      { href: '/csv-cleaner', title: 'CSV Cleaner', description: 'Clean and standardize data in your CSV files.', icon: <FileText className="w-8 h-8" /> },
      { href: '/password-generator', title: 'Password Generator', description: 'Generate strong, secure passwords.', icon: <Shield className="w-8 h-8" /> },
    ]
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = allTools.map(category => {
    const filtered = category.tools.filter(tool =>
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...category, tools: filtered };
  }).filter(category => category.tools.length > 0);

  const defaultActiveCategories = allTools.map(c => c.category);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
            Marketing Super-Tools
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of powerful, simple tools to supercharge your marketing efforts.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Search for a tool..."
              className="h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredCategories.length > 0 ? (
          <Accordion type="multiple" defaultValue={defaultActiveCategories} className="w-full space-y-6">
            {filteredCategories.map((category, catIndex) => (
              <AccordionItem key={category.category} value={category.category} className="border-b-0">
                <AccordionTrigger className="text-2xl font-semibold tracking-tight hover:no-underline border-b pb-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg text-primary">{category.icon}</div>
                        {category.category}
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                    {category.tools.sort((a, b) => a.title.localeCompare(b.title)).map((tool, toolIndex) => (
                      <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${50 * (toolIndex + 1)}ms` }}>
                        <ToolCard
                          href={tool.href}
                          title={tool.title}
                          description={tool.description}
                          icon={tool.icon}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
            <h3 className="mt-4 text-lg font-medium">No tools found for "{searchTerm}"</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try searching for something else.
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
