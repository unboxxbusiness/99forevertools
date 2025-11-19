
'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '../ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { usePathname, useRouter } from 'next/navigation'

const allMenuItems = [
    { name: 'Calculators', href: '/#calculators' },
    { name: 'Content & SEO', href: '/#content-and-seo' },
    { name: 'Branding & Design', href: '/#branding-and-design' },
    { name: 'Image Tools', href: '/#image-tools' },
    { name: 'WhatsApp Tools', href: '/#whatsapp-tools' },
    { name: 'Marketing & Utilities', href: '/#marketing-and-utilities' },
]

const businessToolsGroup = [
    { name: 'Content & SEO', href: '/#content-and-seo' },
    { name: 'Branding & Design', href: '/#branding-and-design' },
    { name: 'WhatsApp Tools', href: '/#whatsapp-tools' },
    { name: 'Marketing & Utilities', href: '/#marketing-and-utilities' },
];

const technicalToolsGroup = [
    { name: 'Calculators', href: '/#calculators' },
    { name: 'Image Tools', href: '/#image-tools' },
];


export const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const [path, hash] = href.split('#');

        const scrollToSection = () => {
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        if (pathname === '/' && path === '') {
            e.preventDefault();
            scrollToSection();
        } else if (path === '') {
            e.preventDefault();
            router.push(href);
        }
    }, [pathname, router]);


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
                <div className={cn('mx-auto mt-2 max-w-6xl px-4 transition-all duration-300 lg:px-8', isScrolled && 'bg-background/80 backdrop-blur-lg rounded-2xl border border-border/50')}>
                    <div className="relative flex h-16 items-center justify-between gap-6 lg:gap-0">
                        <div className="relative z-20 flex items-center gap-2">
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
                                            {allMenuItems.map((item, index) => (
                                                <li key={index}>
                                                    <SheetTrigger asChild>
                                                        <Link
                                                            href={item.href}
                                                            onClick={(e) => handleNavClick(e, item.href)}
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

                         <div className="hidden lg:flex items-center justify-center flex-1">
                            <ul className="flex items-center gap-x-6 xl:gap-x-8 text-sm">
                                <li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-accent-foreground transition-colors outline-none">
                                            Business & Marketing <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {businessToolsGroup.map((item, index) => (
                                                <DropdownMenuItem key={index} asChild onSelect={(e) => e.preventDefault()}>
                                                    <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.name}</Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                                <li>
                                     <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-accent-foreground transition-colors outline-none">
                                            Technical & Creative <ChevronDown className="h-4 w-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {technicalToolsGroup.map((item, index) => (
                                                <DropdownMenuItem key={index} asChild onSelect={(e) => e.preventDefault()}>
                                                    <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.name}</Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            </ul>
                        </div>
                         
                         <div className="hidden lg:flex items-center justify-end">
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
