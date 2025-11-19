'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { allTools } from '@/lib/tools'

export const Header = () => {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

    return (
        <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-sm" : "")}>
            <div className="container mx-auto flex h-16 items-center justify-between">
                <Link href="/" aria-label="home" className="flex items-center space-x-2">
                    <Logo />
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {allTools.slice(0, 4).map((category) => (
                        <Link key={category.category} href={`/#${slugify(category.category)}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            {category.category}
                        </Link>
                    ))}
                     <Button asChild>
                        <Link href="/offer">
                            Lifetime Website Offer
                        </Link>
                    </Button>
                </nav>
                
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className='w-full'>
                             <div className="p-6">
                                <Link href="/" className="mb-8 flex items-center space-x-2">
                                     <Logo />
                                </Link>
                                <nav className="flex flex-col gap-4">
                                     {allTools.map((category) => (
                                        <Link key={category.category} href={`/#${slugify(category.category)}`} className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
                                            {category.category}
                                        </Link>
                                    ))}
                                    <Button asChild className="mt-4">
                                        <Link href="/offer">
                                            Lifetime Website Offer
                                        </Link>
                                    </Button>
                                </nav>
                             </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
