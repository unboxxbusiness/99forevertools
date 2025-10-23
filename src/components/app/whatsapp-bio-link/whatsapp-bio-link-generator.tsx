
'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Download, PlusCircle, Trash2, User, Phone, MessageSquare, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

type Link = {
  id: number;
  title: string;
  message: string;
};

type Socials = {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
}

const generateBioPageHtml = (config: {
    name: string,
    description: string,
    phone: string,
    profilePic: string | null,
    links: Link[],
    socials: Socials,
    colors: {
        background: string,
        button: string,
        buttonText: string,
        textColor: string,
        socialColor: string,
    }
}) => {
  const { name, description, phone, profilePic, links, socials, colors } = config;
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const linksHtml = links.map(link => {
    if (!link.title || !link.message) return '';
    const encodedMessage = encodeURIComponent(link.message);
    const waLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    return `<a href="${waLink}" target="_blank" class="button">${link.title}</a>`;
  }).join('');

  const socialLinksHtml = `
    <div class="socials">
        ${socials.instagram ? `<a href="${socials.instagram}" target="_blank" title="Instagram">${'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>'}</a>` : ''}
        ${socials.facebook ? `<a href="${socials.facebook}" target="_blank" title="Facebook">${'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'}</a>` : ''}
        ${socials.twitter ? `<a href="${socials.twitter}" target="_blank" title="Twitter">${'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1-3 .5c0 0-4 6-10 6-6 0-10-6-10-6s-1.4.5-3-.5c1.6-2.6 3.3-4.4 3.3-4.4s-1.6-1-2-3.4c0 0 5.6 4.4 12 4.4s12-4.4 12-4.4z"></path></svg>'}</a>` : ''}
        ${socials.linkedin ? `<a href="${socials.linkedin}" target="_blank" title="LinkedIn">${'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>'}</a>` : ''}
    </div>
  `.trim();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: ${colors.background};
            color: #ffffff;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .container {
            max-width: 680px;
            width: 100%;
            text-align: center;
        }
        .profile-pic {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #f5b342;
            margin-bottom: 20px;
        }
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #333;
            border: 4px solid #f5b342;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .profile-placeholder svg {
            width: 60px;
            height: 60px;
            color: #888;
        }
        h1 {
            font-size: 2em;
            margin: 0;
            color: ${colors.textColor};
        }
        p {
            font-size: 1.1em;
            margin: 10px 0 30px;
            color: ${colors.textColor};
            opacity: 0.8;
        }
        .links {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .button {
            background-color: ${colors.button};
            color: ${colors.buttonText};
            padding: 20px;
            text-decoration: none;
            border-radius: 10px;
            font-size: 1.1em;
            font-weight: bold;
            transition: transform 0.2s;
            display: block;
        }
        .button:hover {
            transform: scale(1.02);
            opacity: 0.9;
        }
        .socials {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
        .socials a {
            color: ${colors.socialColor};
            opacity: 0.8;
        }
        .socials a:hover {
            opacity: 1;
        }
        .socials svg {
            width: 28px;
            height: 28px;
        }
        footer {
            margin-top: 40px;
            font-size: 0.8em;
            color: #888;
        }
        footer a {
            color: #f5b342;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        ${profilePic ? 
            `<img src="${profilePic}" alt="Profile Picture" class="profile-pic">` : 
            `<div class="profile-placeholder"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`
        }
        <h1>${name}</h1>
        <p>${description}</p>
        <div class="links">
            ${linksHtml}
        </div>
        ${socialLinksHtml}
        <footer>
            <p>Powered by <a href="https://99forevertools.com" target="_blank">99forevertools</a></p>
        </footer>
    </div>
</body>
</html>`;
};


export function WhatsAppBioLinkGenerator() {
  const [name, setName] = useState('My Business Name');
  const [description, setDescription] = useState('Your one-line business description.');
  const [phone, setPhone] = useState('919876543210');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [links, setLinks] = useState<Link[]>([
    { id: 1, title: '💬 Get a Quote', message: 'Hi! I would like to get a quote for your services.' },
    { id: 2, title: '🛍️ View Catalog', message: 'Hello, please send me your product catalog.' },
  ]);
  const [socials, setSocials] = useState<Socials>({ instagram: '', facebook: '', twitter: '', linkedin: '' });
  const [colors, setColors] = useState({ 
      background: '#1a1a1a',
      textColor: '#ffffff',
      button: '#333333',
      buttonText: '#ffffff',
      socialColor: '#ffffff',
    });

  const [nextId, setNextId] = useState(3);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleLinkChange = (id: number, field: 'title' | 'message', value: string) => {
    setLinks(links.map(link => (link.id === id ? { ...link, [field]: value } : link)));
  };

  const handleSocialChange = (field: keyof Socials, value: string) => {
    setSocials({ ...socials, [field]: value });
  };
  
  const handleColorChange = (field: keyof typeof colors, value: string) => {
    setColors({ ...colors, [field]: value });
  };

  const addLink = () => {
    setLinks([...links, { id: nextId, title: 'New Button', message: '' }]);
    setNextId(nextId + 1);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };
  
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const htmlContent = useMemo(() => generateBioPageHtml({ name, description, phone, profilePic, links, socials, colors }), [name, description, phone, profilePic, links, socials, colors]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    toast({ title: 'HTML code copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'whatsapp-bio.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({ title: 'HTML file downloaded!' });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">WhatsApp Bio Link Page Generator</CardTitle>
        <CardDescription>
          Create a Linktree-style page for your WhatsApp contact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Profile Details</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Business Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp Number (with country code)</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
               <div className="space-y-2">
                  <Label htmlFor="profilePic">Profile Picture</Label>
                  <Input id="profilePic" type="file" accept="image/*" onChange={handleProfilePicChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">WhatsApp Buttons</h3>
                {links.map((link, index) => (
                    <div key={link.id} className="p-3 border rounded-md space-y-2 relative">
                        <Label>Button {index + 1}</Label>
                        <Input placeholder="Button Title" value={link.title} onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)} />
                        <Textarea placeholder="Pre-filled WhatsApp Message" value={link.message} onChange={(e) => handleLinkChange(link.id, 'message', e.target.value)} />
                        <Button variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive" onClick={() => removeLink(link.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 <Button variant="outline" className="w-full" onClick={addLink}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Button
                </Button>
            </div>
            
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">Social Media Links</h3>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="relative"><Instagram className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="instagram" placeholder="https://instagram.com/yourprofile" value={socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="pl-8" /></div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                 <div className="relative"><Facebook className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="facebook" placeholder="https://facebook.com/yourprofile" value={socials.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="pl-8" /></div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                 <div className="relative"><Twitter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="twitter" placeholder="https://twitter.com/yourprofile" value={socials.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} className="pl-8" /></div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                 <div className="relative"><Linkedin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /><Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={socials.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} className="pl-8" /></div>
              </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">Color Customization</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label htmlFor="bgColor">Background</Label>
                        <Input id="bgColor" type="color" value={colors.background} onChange={e => handleColorChange('background', e.target.value)} className="p-1 h-10 w-full"/>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="textColor">Text</Label>
                        <Input id="textColor" type="color" value={colors.textColor} onChange={e => handleColorChange('textColor', e.target.value)} className="p-1 h-10 w-full"/>
                    </div>
                </div>
                 <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-1">
                        <Label htmlFor="btnColor">Button</Label>
                        <Input id="btnColor" type="color" value={colors.button} onChange={e => handleColorChange('button', e.target.value)} className="p-1 h-10 w-full"/>
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="btnTextColor">Button Text</Label>
                        <Input id="btnTextColor" type="color" value={colors.buttonText} onChange={e => handleColorChange('buttonText', e.target.value)} className="p-1 h-10 w-full"/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="socialColor">Social Icons</Label>
                        <Input id="socialColor" type="color" value={colors.socialColor} onChange={e => handleColorChange('socialColor', e.target.value)} className="p-1 h-10 w-full"/>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4 border-t pt-6">
                <h3 className="text-xl font-semibold">Get Your Page</h3>
                 <p className="text-sm text-muted-foreground">Copy the code and save it as an HTML file, or download the file directly and host it on your website.</p>
                <div className="flex gap-4">
                    <Button onClick={handleCopy} className="flex-1">
                        <Copy className="mr-2" /> {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                    <Button onClick={handleDownload} variant="secondary" className="flex-1">
                        <Download className="mr-2" /> Download HTML
                    </Button>
                </div>
            </div>
          </div>
          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Live Preview</h3>
            <div className="bg-muted/30 rounded-lg h-[700px] overflow-hidden">
                <iframe
                    srcDoc={htmlContent}
                    className="w-full h-full border-0"
                    title="WhatsApp Bio Link Preview"
                />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

