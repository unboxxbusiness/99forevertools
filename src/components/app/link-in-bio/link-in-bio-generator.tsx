
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, User, Link as LinkIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

type BioLink = {
  id: number;
  title: string;
  url: string;
};

export function LinkInBioGenerator() {
  const [profileImage, setProfileImage] = useState('https://picsum.photos/seed/biolink/200/200');
  const [name, setName] = useState('Your Name');
  const [bio, setBio] = useState('A short and catchy bio about you or your business.');
  const [links, setLinks] = useState<BioLink[]>([
    { id: 1, title: 'My Website', url: 'https://example.com' },
    { id: 2, title: 'Follow me on X', url: 'https://x.com/example' },
  ]);
  const [nextId, setNextId] = useState(3);

  const handleAddLink = () => {
    setLinks([...links, { id: nextId, title: '', url: '' }]);
    setNextId(nextId + 1);
  };

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: number, field: 'title' | 'url', value: string) => {
    setLinks(links.map(link => (link.id === id ? { ...link, [field]: value } : link)));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">"Link in Bio" Page Builder</CardTitle>
        <CardDescription>
          Create a simple, shareable landing page for your social media profiles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Your Content</h3>
            <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-semibold">Profile</h4>
                <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image URL</Label>
                    <Input id="profileImage" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="https://..." />
                    {/* Optional: Add a file uploader */}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
            </div>

            <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-semibold">Links</h4>
                 {links.map(link => (
                    <div key={link.id} className="flex gap-2 items-end">
                        <div className="flex-grow space-y-1">
                            <Input placeholder="Link Title" value={link.title} onChange={e => handleLinkChange(link.id, 'title', e.target.value)} />
                            <Input placeholder="https://..." value={link.url} onChange={e => handleLinkChange(link.id, 'url', e.target.value)} />
                        </div>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveLink(link.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                <Button variant="outline" className="w-full" onClick={handleAddLink}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Link
                </Button>
            </div>
          </div>
          
          {/* Preview */}
          <div className="flex justify-center items-center bg-muted/30 p-4 rounded-lg">
              <div className="w-[340px] h-[680px] bg-background rounded-[40px] shadow-2xl border-8 border-black overflow-y-auto p-4 flex flex-col">
                  <div className="text-center mt-8 mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-12 h-12 text-muted-foreground" />
                          )}
                      </div>
                      <h1 className="text-xl font-bold mt-4">{name}</h1>
                      <p className="text-sm text-muted-foreground mt-1">{bio}</p>
                  </div>
                  <div className="space-y-3">
                      {links.map(link => (
                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                            <Button variant="secondary" className="w-full h-14 text-base">
                                <LinkIcon className="mr-2 h-4 w-4" />
                                {link.title || 'Your Link Title'}
                            </Button>
                        </a>
                      ))}
                  </div>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
