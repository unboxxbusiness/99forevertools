"use client";
import Image from 'next/image';

export function BenefitsSection() {
    return (
         <section className="py-16 md:py-32">
             <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                 <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">FREE Lifetime “Business-Class” Hosting</h2>
                 <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
                     <div className="relative mb-6 sm:mb-0">
                         <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                             <Image src="https://picsum.photos/seed/offer2/600/500" alt="Secure Hosting Graphic" className="rounded-[15px] shadow" data-ai-hint="server security" width={1207} height={929} />
                         </div>
                     </div>
                      <div className="relative space-y-4">
                         <p className="text-muted-foreground">
                            Say goodbye to monthly and yearly hosting bills — forever. <span className="text-accent-foreground font-bold">Your site stays fast, secure, and live</span> without you ever paying again.
                         </p>
                         <p className="text-muted-foreground">This isn't cheap hosting; it's a business-class service designed for reliability and speed, ensuring your lead-generation machine is always online.</p>
                          <div className="pt-6">
                             <blockquote className="border-l-4 pl-4">
                                 <p>I was skeptical about the 'lifetime' claim, but it's real. My website has been running flawlessly for months, and I haven't seen a single hosting bill. It's a total game-changer for my budget.</p>
                                  <div className="mt-6 space-y-3">
                                     <cite className="block font-medium">Priya Sharma, Small Business Owner</cite>
                                 </div>
                             </blockquote>
                         </div>
                     </div>
                 </div>
             </div>
         </section>
    );
}
