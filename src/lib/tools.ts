
import { Star, CalculatorIcon, Search, Paintbrush, Image, MessageSquare, Users, Bot, FileText, Percent, Briefcase, CircleDollarSign, Scale, Calculator, Home as HomeIcon, Landmark, TicketPercent, Scaling, QrCode, Lightbulb, PartyPopper, TrendingUp, MapPin, Hash, PenSquare, Crop, Palette, Layers, GitCompareArrows, Clapperboard, Contact, PlaySquare, CaseSensitive, Shield, Info, Pilcrow, Volume2, AudioLines, Link as LinkIcon, Activity, ExternalLink, Camera, Code, Network, Gift, FileJson, TestTube2, Mail, Clock, Binary, MessageSquarePlus, BookOpen, IndianRupee, User as UserIcon, Sparkles } from 'lucide-react';

export const allTools = [
  {
    category: 'Featured',
    icon: 'Star',
    tools: [
      { href: '/hinglish-typing', title: 'Indian Language Typing Workspace', description: 'Real-time transliteration across 23+ Indian language scripts.', icon: 'FileText' },
      { href: '/logo-maker', title: 'Advanced Logo Maker', description: 'Create a simple, text-based logo for your business.', icon: 'Palette' },
      { href: '/manual-sales-tracker', title: 'Manual Sales Tracker', description: 'A simple dashboard to manually track your daily sales revenue.', icon: 'IndianRupee' },
      { href: '/invoice-generator', title: 'Shareable Invoice Generator', description: 'Generate a professional invoice to print, save as PDF, and share.', icon: 'FileText' },
    ]
  },
  {
    category: 'Financial Calculators',
    icon: 'CalculatorIcon',
    tools: [
      { href: '/gst-calculator', title: 'GST Calculator', description: 'Calculate GST amounts for any price.', icon: 'Percent' },
      { href: '/business-loan-emi-calculator', title: 'Business Loan EMI Calculator', description: 'Calculate monthly payments for business loans.', icon: 'Briefcase' },
      { href: '/profit-margin-calculator', title: 'Profit Margin Calculator', description: 'Find profit margin from cost and sale price.', icon: 'CircleDollarSign' },
      { href: '/break-even-point-calculator', title: 'Break-Even Point Calculator', description: 'Determine how much you need to sell to cover costs.', icon: 'Scale' },
      { href: '/salary-to-ctc-calculator', title: 'Salary to CTC Calculator', description: 'Estimate the total cost of an employee to the company.', icon: 'Calculator' },
      { href: '/hra-exemption-calculator', title: 'HRA Exemption Calculator', description: 'Calculate your House Rent Allowance exemption.', icon: 'HomeIcon' },
      { href: '/pf-calculator', title: 'PF Calculator', description: 'Calculate employee and employer PF contributions.', icon: 'Landmark' },
      { href: '/discount-calculator', title: 'Discount Calculator', description: 'Quickly calculate the final price after a discount.', icon: 'TicketPercent' },
      { href: '/unit-price-calculator', title: 'Unit Price Calculator', description: 'Compare product costs by their unit price.', icon: 'Scaling' },
      { href: '/business-valuation-calculator', title: 'Business Valuation Calculator', description: 'Get a simple valuation based on revenue and industry.', icon: 'TrendingUp' },
      { href: '/compound-interest-calculator', title: 'Compound Interest Calculator', description: 'Visualize the future value of your investments.', icon: 'TrendingUp' },
      { href: '/loan-repayment-calculator', title: 'Loan Repayment Calculator', description: 'Estimate monthly payments for various loans.', icon: 'Landmark' },
      { href: '/roi-calculator', title: 'ROI Calculator', description: 'Calculate return on investment for campaigns.', icon: 'TrendingUp' },
      { href: '/salary-sacrifice-calculator', title: 'Salary Sacrifice Calculator', description: 'Estimate tax savings from pension contributions.', icon: 'Calculator' },
    ]
  },
  {
    category: 'Content & Writing',
    icon: 'FileText',
    tools: [
        { href: '/about-us-generator', title: 'About Us Page Generator', description: 'Help businesses write a simple "About Us" section.', icon: 'Info' },
        { href: '/lorem-ipsum-generator', title: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your mockups.', icon: 'Pilcrow' },
        { href: '/word-counter', title: 'Word & Character Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: 'FileText' },
        { href: '/case-converter', title: 'Case Converter', description: 'Convert text to different letter cases.', icon: 'CaseSensitive' },
        { href: '/hindi-typing', title: 'Hindi Typing Tool', description: 'Type in Hindi using an on-screen Devanagari keyboard.', icon: 'FileText' },
        { href: '/hinglish-typing', title: 'Indian Language Typing Workspace', description: 'Real-time transliteration across 23+ Indian language scripts.', icon: 'FileText' },
        { href: '/text-to-speech', title: 'Text to Speech', description: 'Convert text passages into spoken audio.', icon: 'Volume2' },
        { href: '/readability-checker', title: 'Readability Checker', description: 'Calculate the Flesch-Kincaid readability score.', icon: 'FileText' },
    ]
  },
  {
    category: 'SEO & Marketing',
    icon: 'Search',
    tools: [
      { href: '/meta-tag-generator', title: 'SERP Preview Tool', description: 'Preview meta tags on a Google search result page.', icon: 'Search' },
      { href: '/headline-analyzer', title: 'Headline Analyzer', description: 'Score a headline on length, sentiment, and keywords.', icon: 'Activity' },
      { href: '/keyword-density-checker', title: 'Keyword Density Checker', description: 'Check the density of a keyword in your text.', icon: 'TestTube2' },
      { href: '/robots-txt-generator', title: 'Robots.txt Generator', description: 'Create a robots.txt file for search engine crawlers.', icon: 'Bot' },
      { href: '/utm-link-builder', title: 'UTM Link Builder', description: 'Create URLs with UTM parameters for tracking.', icon: 'LinkIcon' },
      { href: '/review-link-generator', title: 'Google Review Link Generator', description: 'Create a direct link for customers to leave a Google Review.', icon: 'Star' },
      { href: '/email-permutator', title: 'Email Permutator', description: 'Generate possible email addresses from a name and domain.', icon: 'Mail' },
      { href: '/email-subject-line-tester', title: 'Email Subject Line Tester', description: 'Analyze your email subject lines for potential issues.', icon: 'Mail' },
      { href: '/hashtag-generator', title: 'Hashtag Generator', description: 'Suggest relevant hashtags for social media.', icon: 'Hash' },
      { href: '/whatsapp-link-generator', title: 'WhatsApp Link Generator', description: 'Create a wa.me link with a pre-filled message.', icon: 'MessageSquare' },
      { href: '/whatsapp-widget-generator', title: 'WhatsApp Widget Generator', description: 'Create a floating WhatsApp chat button for your website.', icon: 'MessageSquarePlus' },
    ]
  },
  {
    category: 'Branding & Design',
    icon: 'Paintbrush',
    tools: [
      { href: '/logo-maker', title: 'Advanced Logo Maker', description: 'Create a simple, text-based logo for your business.', icon: 'Palette' },
      { href: 'color-palette-generator', title: 'Color Palette Generator', description: 'Generate accessible color schemes from a base color.', icon: 'Palette' },
      { href: '/business-name-generator', title: 'Business Name Generator', description: 'Generate potential names for a new business.', icon: 'PenSquare' },
      { href: '/business-slogan-generator', title: 'Business Slogan Generator', description: 'Generate catchy taglines based on keywords.', icon: 'Lightbulb' },
      { href: '/press-release-title-generator', title: 'Press Release Title Generator', description: 'Help businesses craft compelling headlines.', icon: 'Lightbulb' },
      { href: '/email-signature-generator', title: 'Email Signature Generator', description: 'Create a professional HTML email signature.', icon: 'PenSquare' },
      { href: '/digital-business-card', title: 'Digital Business Card Generator', description: 'Create a modern, shareable digital business card.', icon: 'Contact' },
    ]
  },
  {
    category: 'Image & Video Tools',
    icon: 'Image',
    tools: [
        { href: '/background-remover', title: 'AI Background Remover', description: 'Remove backgrounds locally with an on-device AI model.', icon: 'Sparkles' },
        { href: '/image-compressor', title: 'Image Compressor', description: 'Reduce image file sizes for faster web loading.', icon: 'Image' },
        { href: '/image-resizer', title: 'Image Resizer', description: 'Resize images to specific dimensions.', icon: 'Crop' },
        { href: '/watermark-adder', title: 'Watermark Adder', description: 'Add a text or image watermark to your pictures.', icon: 'Layers' },
        { href: '/before-after-slider', title: "'Before & After' Slider", description: 'Create an interactive slider to showcase transformations.', icon: 'GitCompareArrows' },
        { href: '/gif-maker', title: 'GIF Maker', description: 'Convert a series of images into an animated GIF.', icon: 'Clapperboard' },
        { href: '/favicon-generator', title: 'Favicon Generator', description: 'Create a favicon pack from any image.', icon: 'Star' },
        { href: '/youtube-thumbnail-preview', title: 'YouTube Thumbnail Preview', description: 'See how your thumbnail will look on YouTube.', icon: 'PlaySquare' },
        { href: '/image-to-base64-converter', title: 'Image to Base64 Converter', description: 'Convert images to Base64 encoded strings.', icon: 'Binary' },
        { href: '/image-to-png-converter', title: 'Image to PNG Converter', description: 'Convert various image formats to PNG.', icon: 'Image' },
        { href: '/photo-filter-studio', title: 'Photo Filter Studio', description: 'Apply professional filters to your photos instantly.', icon: 'Camera' },
        { href: '/instagram-profile-photo-maker', title: 'Instagram Profile Photo Maker', description: 'Create a circular profile picture with a gradient story ring.', icon: 'UserIcon' },
    ]
  },
  {
    category: 'Web & Utilities',
    icon: 'Globe',
    tools: [
      { href: '/invoice-generator', title: 'Shareable Invoice Generator', description: 'Generate a professional invoice to print, save as PDF, and share.', icon: 'FileText' },
      { href: '/qr-code-generator', title: 'QR Code Generator', description: 'Instantly create a downloadable QR code.', icon: 'QrCode' },
      { href: '/vcard-qr-code-generator', title: 'Business Card QR Code Generator', description: 'Generate a QR code that contains contact info (vCard).', icon: 'Contact' },
      { href: '/privacy-policy-generator', title: 'Privacy Policy Generator', description: 'Generate a generic privacy policy for your website.', icon: 'Shield' },
      { href: '/terms-and-conditions-generator', title: 'Terms & Conditions Generator', description: 'Generate a generic T&C page for your website.', icon: 'FileText' },
      { href: '/wav-to-mp3-converter', title: 'WAV to MP3 Converter', description: 'Convert .wav audio files to .mp3 format.', icon: 'AudioLines' },
      { href: '/url-shortener', title: 'URL Redirect Tool', description: 'Create a short link that redirects to a long URL.', icon: 'ExternalLink' },
      { href: '/what-is-my-ip', title: 'What Is My IP?', description: 'A simple utility that shows your public IP address.', icon: 'Network' },
      { href: '/discount-coupon-generator', title: 'Discount Coupon Code Generator', description: 'Create batches of unique, random codes for campaigns.', icon: 'Gift' },
      { href: '/time-zone-converter', title: 'Time Zone Converter', description: 'Compare time across different cities.', icon: 'Clock' },
      { href: '/csv-cleaner', title: 'CSV Cleaner', description: 'Clean and standardize data in your CSV files.', icon: 'FileText' },
      { href: '/password-generator', title: 'Password Generator', description: 'Generate strong, secure passwords.', icon: 'Shield' },
      { href: '/whatsapp-bio-link', title: 'WhatsApp Bio Link Page', description: 'Create a Linktree-style page for your WhatsApp profile.', icon: 'Contact' },
      { href: '/whatsapp-broadcast-templates', title: 'WhatsApp Broadcast Templates', description: 'Free templates for sales, support, and more.', icon: 'BookOpen' },
      { href: '/festival-wish-generator', title: 'Festival Wish Generator', description: 'Create pre-written messages for festivals.', icon: 'PartyPopper' },
      { href: '/google-maps-link-generator', title: 'Google Maps Link Generator', description: 'Create a direct link to a business address on Google Maps.', icon: 'MapPin' },
    ]
  }
];

    