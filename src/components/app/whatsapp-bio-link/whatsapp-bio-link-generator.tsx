'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Check, Download, PlusCircle, Trash2, User, Phone, MessageSquare } from 'lucide-react';

type Link = {
  id: number;
  title: string;
  message: string;
};

const generateBioPageHtml = (config: {
    name: string,
    description: string,
    phone: string,
    profilePic: string | null,
    links: Link[]
}) => {
  const { name, description, phone, profilePic, links } = config;
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const linksHtml = links.map(link => {
    const encodedMessage = encodeURIComponent(link.message);
    const waLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    return `<a href="${waLink}" target="_blank" class="button">${link.title}</a>`;
  }).join('');

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
            background-color: #1a1a1a;
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
        }
        p {
            font-size: 1.1em;
            margin: 10px 0 30px;
            color: #cccccc;
        }
        .links {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .button {
            background-color: #333;
            color: #ffffff;
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
            background-color: #444;
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
  const [nextId, setNextId] = useState(3);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleLinkChange = (id: number, field: 'title' | 'message', value: string) => {
    setLinks(links.map(link => (link.id === id ? { ...link, [field]: value } : link)));
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

  const htmlContent = useMemo(() => generateBioPageHtml({ name, description, phone, profilePic, links }), [name, description, phone, profilePic, links]);

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
                <h3 className="font-semibold text-lg">Buttons</h3>
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
