
'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet'

const menuItems = [
    { name: 'Calculators', href: '#calculators' },
    { name: 'Content & SEO', href: '#content-and-seo' },
    { name: 'Branding & Design', href: '#branding-and-design' },
    { name: 'Image Tools', href: '#image-tools' },
    { name: 'WhatsApp', href: '#whatsapp-tools' },
    { name: 'Marketing', href: '#marketing-and-utilities' },
]

export const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header className="sticky top-0 z-40 w-full print-hidden">
            <nav className="w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/80 backdrop-blur-lg max-w-5xl rounded-2xl border border-border/50')}>
                    <div className="relative flex items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="relative z-20">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>
                        </div>
                        
                        <div className="flex items-center lg:hidden">
                             <Sheet>
                                <SheetTrigger asChild>
                                     <Button variant="ghost">
                                        <Menu />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                     <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                     <div className="flex flex-col h-full">
                                        <ul className="space-y-6 text-base pt-8 flex-grow">
                                            {menuItems.map((item, index) => (
                                                <li key={index}>
                                                    <SheetTrigger asChild>
                                                        <Link
                                                            href={`/${item.href}`}
                                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                            <span>{item.name}</span>
                                                        </Link>
                                                    </SheetTrigger>
                                                </li>
                                            ))}
                                        </ul>
                                        <SheetTrigger asChild>
                                            <Button asChild size="lg" className="w-full">
                                                <Link href="/offer">
                                                    Lifetime Website Offer
                                                </Link>
                                            </Button>
                                        </SheetTrigger>
                                     </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                         <div className="hidden lg:flex lg:items-center lg:gap-8">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={`/${item.href}`}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         
                         <div className="hidden lg:flex flex-wrap items-center justify-end">
                            <Button asChild size="sm">
                                <Link href="/offer">
                                    Lifetime Website Offer
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
