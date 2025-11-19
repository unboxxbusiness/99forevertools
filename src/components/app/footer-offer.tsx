
'use client';

export function FooterOffer() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold lg:text-5xl">99forevertools in numbers</h2>
          <p className="text-muted-foreground">
            A growing collection of powerful, simple tools to supercharge your business.
          </p>
        </div>
        <div className="grid gap-4 *:text-center md:grid-cols-3">
          <div className="bg-muted/50 rounded-lg space-y-4 py-12">
            <div className="text-5xl font-bold text-primary">+70</div>
            <p className="text-muted-foreground">Free Tools Available</p>
          </div>
          <div className="bg-muted/50 rounded-lg space-y-4 py-12">
            <div className="text-5xl font-bold text-primary">100%</div>
            <p className="text-muted-foreground">Free to Use</p>
          </div>
          <div className="bg-muted/50 rounded-lg space-y-4 py-12">
            <div className="text-5xl font-bold text-primary">+1000s</div>
            <p className="text-muted-foreground">Of Happy Users</p>
          </div>
        </div>
      </div>
    </section>
  );
}
