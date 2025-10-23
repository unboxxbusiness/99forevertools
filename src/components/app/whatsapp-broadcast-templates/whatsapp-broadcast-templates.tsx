
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const templates = {
  sales: [
    {
      title: 'Limited-Time Offer',
      text: '🎉 Special Offer! 🎉 Get 20% off all [Product Name] for the next 48 hours only. Use code: SALE20 at checkout. Shop now: [Link]',
    },
    {
      title: 'New Arrival',
      text: '✨ Just In! ✨ Our new collection of [Product Category] has just dropped. Be the first to check it out! 👉 [Link]',
    },
    {
      title: 'Flash Sale Alert',
      text: '⚡️ FLASH SALE! ⚡️ For the next 3 hours, get [Discount] on [Product/Service]. Don\'t miss out! Shop here: [Link]',
    },
    {
      title: 'Abandoned Cart Reminder',
      text: '🤔 Did you forget something? You left some great items in your cart. Complete your order now and get free shipping! 🛒 [Cart Link]',
    },
  ],
  support: [
    {
      title: 'Welcome Message',
      text: 'Welcome to [Your Company]! We\'re thrilled to have you. If you have any questions, just reply to this message. We\'re here to help! 😊',
    },
    {
      title: 'Support Query Received',
      text: 'Hi [Customer Name], we\'ve received your query and will get back to you shortly. Our support team is available from [Support Hours]. Thank you for your patience.',
    },
    {
      title: 'Issue Resolved',
      text: 'Hi [Customer Name], your issue regarding [Issue Topic] has been resolved. Please let us know if there is anything else we can help with. Have a great day!',
    },
    {
      title: 'Feedback Request',
      text: 'Hi [Customer Name], we hope you\'re enjoying your [Product/Service]. Could you take a moment to share your feedback with us? It helps us improve! [Feedback Link]',
    },
  ],
  events: [
    {
      title: 'Event Invitation',
      text: 'You\'re invited! Join us for [Event Name] on [Date] at [Time]. We\'ll be discussing [Topic]. Register here to save your spot: [Registration Link]',
    },
    {
      title: 'Event Reminder',
      text: '🔔 Reminder: Our event, [Event Name], is starting tomorrow at [Time]! We can\'t wait to see you there. Here\'s the link to join: [Event Link]',
    },
    {
      title: 'Webinar Follow-Up',
      text: 'Thank you for attending our [Webinar Name]! Here is a link to the recording and the slides we promised: [Link]. We hope you found it valuable!',
    },
  ],
  reminders: [
    {
      title: 'Appointment Reminder',
      text: 'Hi [Customer Name], this is a friendly reminder of your appointment with us on [Date] at [Time]. Please reply with YES to confirm. See you soon!',
    },
    {
      title: 'Payment Due Reminder',
      text: 'Hi [Customer Name], just a friendly reminder that your payment for invoice #[Invoice Number] is due on [Due Date]. You can pay online here: [Payment Link]',
    },
    {
      title: 'Subscription Renewal',
      text: 'Your subscription to [Service Name] is scheduled to renew on [Date]. No action is needed if you wish to continue. Thanks for being a loyal customer!',
    },
  ],
};

type TemplateCategory = keyof typeof templates;

const TemplateCard = ({ title, text }: { title: string; text: string }) => {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast({ title: `Copied "${title}" template!` });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-muted/50 p-4 rounded-lg flex flex-col justify-between">
            <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{text}</p>
            </div>
            <Button variant="ghost" className="mt-4 w-full justify-start text-primary" onClick={handleCopy}>
                {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Template'}
            </Button>
        </div>
    )
}

export function WhatsAppBroadcastTemplates() {
  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">WhatsApp Broadcast Template Library</CardTitle>
        <CardDescription>
          Copy-and-paste message templates for your business broadcasts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="sales" className="py-2">Sales</TabsTrigger>
            <TabsTrigger value="support" className="py-2">Support</TabsTrigger>
            <TabsTrigger value="events" className="py-2">Events</TabsTrigger>
            <TabsTrigger value="reminders" className="py-2">Reminders</TabsTrigger>
          </TabsList>
          
          {(Object.keys(templates) as TemplateCategory[]).map(category => (
            <TabsContent key={category} value={category} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates[category].map((template) => (
                        <TemplateCard key={template.title} title={template.title} text={template.text} />
                    ))}
                </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
