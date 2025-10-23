
'use client';

import { useState } from 'react';
import { Header } from '@/components/app/header';
import { ToolCard } from '@/components/app/tool-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Percent, FileText, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, MessageSquare, Lightbulb, PartyPopper, TrendingUp, MapPin, Star, Hash, PenSquare, Image, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Search, Gift, FileJson, Bot, TestTube2, Mail, Users, CalculatorIcon, Paintbrush, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon } from 'lucide-react';

const allTools = [
  {
    category: 'Featured',
    icon: <Star className="w-6 h-6" />,
    tools: [
        { href: '/social-media-image-generator', title: 'Social Media Image Generator', description: 'Create images for your social media posts.', icon: <Image className="w-8 h-8" /> },
        { href: '/logo-maker', title: 'Advanced Logo Maker', description: 'Create a simple, text-based logo for your business.', icon: <Palette className="w-8 h-8" /> },
        { href: '/manual-sales-tracker', title: 'Manual Sales Tracker', description: 'A simple dashboard to manually track your daily sales revenue.', icon: <IndianRupee className="w-8 h-8" /> },
        { href: '/invoice-generator', title: 'Shareable Invoice Generator', description: 'Generate a professional invoice to print, save as PDF, and share.', icon: <FileText className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Calculators',
    icon: <CalculatorIcon className="w-6 h-6" />,
    tools: [
      { href: '/gst-calculator', title: 'GST Calculator', description: 'Calculate GST amounts for any price.', icon: <Percent className="w-8 h-8" /> },
      { href: '/business-loan-emi-calculator', title: 'Business Loan EMI Calculator', description: 'Calculate monthly payments for business loans.', icon: <Briefcase className="w-8 h-8" /> },
      { href: '/profit-margin-calculator', title: 'Profit Margin Calculator', description: 'Find profit margin from cost and sale price.', icon: <CircleDollarSign className="w-8 h-8" /> },
      { href: '/break-even-point-calculator', title: 'Break-Even Point Calculator', description: 'Determine how much you need to sell to cover costs.', icon: <Scale className="w-8 h-8" /> },
      { href: '/salary-to-ctc-calculator', title: 'Salary to CTC Calculator', description: 'Estimate the total cost of an employee to the company.', icon: <Calculator className="w-8 h-8" /> },
      { href: '/hra-exemption-calculator', title: 'HRA Exemption Calculator', description: 'Calculate your House Rent Allowance exemption.', icon: <HomeIcon className="w-8 h-8" /> },
      { href: '/pf-calculator', title: 'PF Calculator', description: 'Calculate employee and employer PF contributions.', icon: <Landmark className="w-8 h-8" /> },
      { href: '/discount-calculator', title: 'Discount Calculator', description: 'Quickly calculate the final price after a discount.', icon: <TicketPercent className="w-8 h-8" /> },
      { href: '/unit-price-calculator', title: 'Unit Price Calculator', description: 'Compare product costs by their unit price.', icon: <Scaling className="w-8 h-8" /> },
      { href: '/business-valuation-calculator', title: 'Business Valuation Calculator', description: 'Get a simple valuation based on revenue and industry.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/compound-interest-calculator', title: 'Compound Interest Calculator', description: 'Visualize the future value of your investments.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/loan-repayment-calculator', title: 'Loan Repayment Calculator', description: 'Estimate monthly payments for various loans.', icon: <Landmark className="w-8 h-8" /> },
      { href: '/roi-calculator', title: 'ROI Calculator', description: 'Calculate return on investment for campaigns.', icon: <TrendingUp className="w-8 h-8" /> },
      { href: '/salary-sacrifice-calculator', title: 'Salary Sacrifice Calculator', description: 'Estimate tax savings from pension contributions.', icon: <Calculator className="w-8 h-8" /> },
      { href: '/manual-sales-tracker', title: 'Manual Sales Tracker', description: 'A simple dashboard to manually track your daily sales revenue.', icon: <IndianRupee className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Content & SEO',
    icon: <Search className="w-6 h-6" />,
    tools: [
      { href: '/about-us-generator', title: 'About Us Page Generator', description: 'Help businesses write a simple "About Us" section.', icon: <Info className="w-8 h-8" /> },
      { href: '/meta-tag-generator', title: 'SERP Preview Tool', description: 'Preview meta tags on a Google search result page.', icon: <Search className="w-8 h-8" /> },
      { href: '/headline-analyzer', title: 'Headline Analyzer', description: 'Score a headline on length, sentiment, and keywords.', icon: <Activity className="w-8 h-8" /> },
      { href: '/keyword-density-checker', title: 'Keyword Density Checker', description: 'Check the density of a keyword in your text.', icon: <TestTube2 className="w-8 h-8" /> },
      { href: '/readability-checker', title: 'Readability Checker', description: 'Calculate the Flesch-Kincaid readability score.', icon: <FileText className="w-8 h-8" /> },
      { href: '/lorem-ipsum-generator', title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your mockups.', icon: <Pilcrow className="w-8 h-8" /> },
      { href: '/press-release-title-generator', title: 'Press Release Title Generator', description: 'Help businesses craft compelling headlines.', icon: <Lightbulb className="w-8 h-8" /> },
      { href: '/word-counter', title: 'Word & Character Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: <FileText className="w-8 h-8" /> },
      { href: '/case-converter', title: 'Case Converter', description: 'Convert text to different letter cases.', icon: <CaseSensitive className="w-8 h-8" /> },
      { href: '/hashtag-generator', title: 'Hashtag Generator', description: 'Suggest relevant hashtags for social media.', icon: <Hash className="w-8 h-8" /> },
      { href: '/robots-txt-generator', title: 'Robots.txt Generator', description: 'Create a robots.txt file for search engine crawlers.', icon: <Bot className="w-8 h-8" /> },
      { href: '/schema-generator', title: 'Schema Markup Generator', description: 'Generate structured data for articles, FAQs, and more.', icon: <FileJson className="w-8 h-8" /> },
      { href: '/utm-link-builder', title: 'UTM Link Builder', description: 'Create URLs with UTM parameters for tracking.', icon: <LinkIcon className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Branding & Design',
    icon: <Paintbrush className="w-6 h-6" />,
    tools: [
      { href: '/invoice-generator', title: 'Shareable Invoice Generator', description: 'Generate a professional invoice to print, save as PDF, and share.', icon: <FileText className="w-8 h-8" /> },
      { href: '/business-slogan-generator', title: 'Business Slogan Generator', description: 'Generate catchy taglines based on keywords.', icon: <Lightbulb className="w-8 h-8" /> },
      { href: '/business-name-generator', title: 'Business Name Generator', description: 'Generate potential names for a new business.', icon: <PenSquare className="w-8 h-8" /> },
      { href: '/logo-maker', title: 'Advanced Logo Maker', description: 'Create a simple, text-based logo for your business.', icon: <Palette className="w-8 h-8" /> },
      { href: '/color-palette-generator', title: 'Color Palette Generator', description: 'Generate accessible color schemes from a base color.', icon: <Palette className="w-8 h-8" /> },
      { href: '/email-signature-generator', title: 'Email Signature Generator', description: 'Create a professional HTML email signature.', icon: <PenSquare className="w-8 h-8" /> },
      { href: '/social-media-image-generator', title: 'Social Media Image Generator', description: 'Create images for your social media posts.', icon: <Image className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Image Tools',
    icon: <Image className="w-6 h-6" />,
    tools: [
        { href: '/image-compressor', title: 'Image Compressor', description: 'Reduce image file sizes for faster web loading.', icon: <Image className="w-8 h-8" /> },
        { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images to specific dimensions.', icon: <Crop className="w-8 h-8" /> },
        { href: '/watermark-adder', title: 'Watermark Adder', description: 'Add a text or image watermark to your pictures.', icon: <Layers className="w-8 h-8" /> },
        { href: '/before-after-slider', title: "'Before & After' Slider", description: 'Create an interactive slider to showcase transformations.', icon: <GitCompareArrows className="w-8 h-8" /> },
        { href: '/gif-maker', title: 'GIF Maker', description: 'Convert a series of images into an animated GIF.', icon: <Clapperboard className="w-8 h-8" /> },
        { href: '/favicon-generator', title: 'Favicon Generator', description: 'Create a favicon pack from any image.', icon: <Star className="w-8 h-8" /> },
        { href: '/youtube-thumbnail-preview', title: 'YouTube Thumbnail Preview', description: 'See how your thumbnail will look on YouTube.', icon: <PlaySquare className="w-8 h-8" /> },
        { href: '/image-to-base64-converter', title: 'Image to Base64 Converter', description: 'Convert images to Base64 encoded strings.', icon: <Binary className="w-8 h-8" /> },
        { href: '/image-to-png-converter', title: 'Image to PNG Converter', description: 'Convert various image formats to PNG.', icon: <Image className="w-8 h-8" /> },
        { href: '/photo-filter-studio', title: 'Photo Filter Studio', description: 'Apply professional filters to your photos instantly.', icon: <Camera className="w-8 h-8" /> },
        { href: '/instagram-profile-photo-maker', title: 'Instagram Profile Photo Maker', description: 'Create a circular profile picture with a gradient story ring.', icon: <UserIcon className="w-8 h-8" /> },
    ]
  },
  {
    category: 'WhatsApp Tools',
    icon: <MessageSquare className="w-6 h-6" />,
    tools: [
      { href: '/whatsapp-link-generator', title: 'WhatsApp Link Generator', description: 'Create a wa.me link with a pre-filled message.', icon: <MessageSquare className="w-8 h-8" /> },
      { href: '/whatsapp-widget-generator', title: 'WhatsApp Widget Generator', description: 'Create a floating WhatsApp chat button for your website.', icon: <MessageSquarePlus className="w-8 h-8" /> },
      { href: '/whatsapp-bio-link', title: 'WhatsApp Bio Link Page', description: 'Create a Linktree-style page for your WhatsApp profile.', icon: <Contact className="w-8 h-8" /> },
      { href: '/whatsapp-broadcast-templates', title: 'WhatsApp Broadcast Templates', description: 'Free templates for sales, support, and more.', icon: <BookOpen className="w-8 h-8" /> },
    ]
  },
  {
    category: 'Marketing & Utilities',
    icon: <Users className="w-6 h-6" />,
    tools: [
      { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Instantly create a downloadable QR code.', icon: <QrCode className="w-8 h-8" /> },
      { href: '/upi-qr-code-generator', title: 'UPI QR Code Generator', description: 'Create a QR code for UPI payments.', icon: <IndianRupee className="w-8 h-8" /> },
      { href: '/vcard-qr-code-generator', title: 'Business Card QR Code Generator', description: 'Generate a QR code that contains contact info (vCard).', icon: <Contact className="w-8 h-8" /> },
      { href: '/festival-wish-generator', title: 'Festival Wish Generator', description: 'Create pre-written messages for festivals.', icon: <PartyPopper className="w-8 h-8" /> },
      { href: '/google-maps-link-generator', title: 'Google Maps Link Generator', description: 'Create a direct link to a business address on Google Maps.', icon: <MapPin className="w-8 h-8" /> },
      { href: '/review-link-generator', title: 'Google Review Link Generator', description: 'Create a direct link for customers to leave a Google Review.', icon: <Star className="w-8 h-8" /> },
      { href: '/privacy-policy-generator', title: 'Privacy Policy Generator', description: 'Generate a generic privacy policy for your website.', icon: <Shield className="w-8 h-8" /> },
      { href: '/terms-and-conditions-generator', title: 'Terms & Conditions Generator', description: 'Generate a generic T&C page for your website.', icon: <FileText className="w-8 h-8" /> },
      { href: '/text-to-speech', title: 'Text to Speech', description: 'Convert text passages into spoken audio.', icon: <Volume2 className="w-8 h-8" /> },
      { href: '/wav-to-mp3-converter', title: 'WAV to MP3 Converter', description: 'Convert .wav audio files to .mp3 format.', icon: <AudioLines className="w-8 h-8" /> },
      { href: '/url-shortener', title: 'URL Redirect Tool', description: 'Create a short link that redirects to a long URL.', icon: <ExternalLink className="w-8 h-8" /> },
      { href: '/what-is-my-ip', title: 'What Is My IP?', description: 'A simple utility that shows your public IP address.', icon: <Network className="w-8 h-8" /> },
      { href: '/discount-coupon-generator', title: 'Discount Coupon Code Generator', description: 'Create batches of unique, random codes for campaigns.', icon: <Gift className="w-8 h-8" /> },
      { href: '/digital-business-card', title: 'Digital Business Card Generator', description: 'Create a modern, shareable digital business card.', icon: <Contact className="w-8 h-8" /> },
      { href: '/email-permutator', title: 'Email Permutator', description: 'Generate possible email addresses from a name and domain.', icon: <Mail className="w-8 h-8" /> },
      { href: '/email-subject-line-tester', title: 'Email Subject Line Tester', description: 'Analyze your email subject lines for potential issues.', icon: <Mail className="w-8 h-8" /> },
      { href: '/time-zone-converter', title: 'Time Zone Converter', description: 'Compare time across different cities.', icon: <Clock className="w-8 h-8" /> },
      { href: '/csv-cleaner', title: 'CSV Cleaner', description: 'Clean and standardize data in your CSV files.', icon: <FileText className="w-8 h-8" /> },
      { href: '/password-generator', title: 'Password Generator', description: 'Generate strong, secure passwords.', icon: <Shield className="w-8 h-8" /> },
    ]
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const totalTools = allTools.reduce((acc, category) => acc + category.tools.length, 0);

  const filteredTools = allTools.flatMap(category => 
    category.tools
      .filter(tool =>
        (activeCategory === 'All' || category.category === activeCategory) &&
        (tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
  );
  
  const categories = allTools.map(category => ({
      name: category.category,
      icon: category.icon
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4">
        <div className="py-20 md:py-32 text-center animate-fade-in relative">
          <div 
            className="absolute inset-0 -z-10" 
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1), transparent 60%)'
            }}
          />
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
            Free Tools for Small Business Growth
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A collection of powerful, simple tools to supercharge your marketing, finance, and sales efforts.
          </p>
           <p className="mt-8 text-lg font-semibold">
              Explore our collection of {totalTools}+ powerful tools
          </p>
          <div className="mt-2 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for your perfect tool..."
              className="h-12 text-lg pl-12 bg-background/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No registration required  &bull;  100% free  &bull;  More Tools Coming Soon
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-in">
          <Button 
            variant={activeCategory === 'All' ? 'default' : 'secondary'}
            onClick={() => setActiveCategory('All')}
            className="rounded-full"
          >
            All Tools
          </Button>
          {categories.map(category => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? 'default' : 'secondary'}
              onClick={() => setActiveCategory(category.name)}
              className="rounded-full gap-2"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
            {filteredTools.map((tool, index) => (
              <div key={tool.href} className="animate-fade-in" style={{ animationDelay: `${50 * (index % 12)}ms` }}>
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
            <h3 className="mt-4 text-lg font-medium">No tools found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
