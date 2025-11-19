
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
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>
                             <Sheet>
                                <SheetTrigger asChild>
                                     <Button variant="ghost" className="lg:hidden">
                                        <Menu />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right">
                                     <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                     <ul className="space-y-6 text-base pt-8">
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
                                </SheetContent>
                            </Sheet>
                        </div>
                         <div className="absolute inset-0 m-auto hidden size-fit lg:block">
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
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button asChild size="sm">
                                    <Link href="/offer">
                                        Lifetime Website Offer
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
