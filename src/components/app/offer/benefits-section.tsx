"use client";
import Image from 'next/image';

export function BenefitsSection() {
    return (
         <section className="py-16 md:py-32">
             <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                 <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">ITEM #2: FREE Lifetime “Business-Class” Hosting</h2>
                 <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                     <div className="relative mb-6 sm:mb-0">
                         <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                             <Image src="https://res.cloudinary.com/dhrigocvd/image/upload/v1763532962/Free_lifetime_hosting_dlirx1.webp" alt="Secure Hosting Graphic" className="rounded-[15px] shadow" data-ai-hint="server security" width={1207} height={929} />
                         </div>
                     </div>
                      <div className="relative space-y-4">
                         <p className="text-muted-foreground">
                            Say goodbye to monthly and yearly hosting bills — forever. Your site stays fast, secure, and live without you ever paying again.
                         </p>
                         <p className="text-xl font-semibold text-primary">
                            Real Value: ₹5,000 every year — for life
                         </p>
                     </div>
                 </div>
             </div>
         </section>
    );
}
