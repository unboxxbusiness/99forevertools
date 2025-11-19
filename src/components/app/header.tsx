
'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '../ui/sheet'
import { usePathname, useRouter } from 'next/navigation'

const allMenuItems = [
    { name: 'Featured', href: '/#featured' },
    { name: 'Calculators', href: '/#calculators' },
    { name: 'Content & SEO', href: '/#content-and-seo' },
    { name: 'Branding & Design', href: '/#branding-and-design' },
    { name: 'Image Tools', href: '/#image-tools' },
    { name: 'WhatsApp Tools', href: '/#whatsapp-tools' },
    { name: 'Marketing & Utilities', href: '/#marketing-and-utilities' },
]

export const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const router = useRouter()
    const pathname = usePathname()

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        const [path, hash] = href.split('#');
        if (pathname === path || (pathname === '/' && path === '')) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
                const headerOffset = 120;
                const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
                window.history.pushState(null, '', `${path}#${hash}`);
            }
        } else {
            // Let Next.js handle navigation to a different page
        }
    }, [pathname]);

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
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={item.href}
                                                            onClick={(e) => handleNavClick(e, item.href)}
                                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                            <span>{item.name}</span>
                                                        </Link>
                                                    </SheetClose>
                                                </li>
                                            ))}
                                        </ul>
                                         <SheetClose asChild>
                                            <Button asChild size="lg" className="w-full">
                                                <Link href="/offer">
                                                    Lifetime Website Offer
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                     </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                         <div className="hidden lg:flex items-center justify-center flex-1">
                            <ul className="flex items-center gap-x-2 xl:gap-x-4 text-sm">
                                {allMenuItems.map(item => (
                                    <li key={item.name}>
                                        <Button variant="ghost" asChild>
                                             <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                                                {item.name}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
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
