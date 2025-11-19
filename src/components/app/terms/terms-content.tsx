
'use client';

export function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto text-foreground">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>Welcome to 99foreversite.shop (“we”, “our”, “us”). These Terms of Use (“Terms”) govern your access to and use of our website, free tools, utilities, and paid services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">1. Services We Provide</h2>
        <h3 className="text-xl font-semibold text-foreground">1.1 Free Tools &amp; Utilities</h3>
        <p>We provide access to 74+ free online tools and utilities. These tools are offered free of charge for personal and business use unless otherwise specified.</p>

        <h3 className="text-xl font-semibold text-foreground">1.2 Paid One-Time Website Offer</h3>
        <p>We offer an optional paid service for small business owners, which includes:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>A custom lead-generation website (up to 5 pages)</li>
          <li>Lifetime hosting</li>
          <li>Mobile-responsive design</li>
          <li>SEO-optimized structure</li>
          <li>Contact form integration</li>
          <li>No monthly or yearly fees</li>
          <li>One-time payment as advertised on the website</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">2. Use of Free Tools</h2>
        <h3 className="text-xl font-semibold text-foreground">2.1 Personal &amp; Commercial Use</h3>
        <p>You may use our free tools for both personal and business purposes.</p>

        <h3 className="text-xl font-semibold text-foreground">2.2 Fair Usage Policy</h3>
        <p>We may limit or restrict access to users who engage in:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Automated scraping</li>
          <li>Abusive usage</li>
          <li>Excessive server load</li>
          <li>Illegal or harmful activities</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground">2.3 No Warranty</h3>
        <p>All free tools are provided “as-is” and we do not guarantee accuracy, reliability, or uninterrupted service.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">3. Paid Website Service</h2>
        <h3 className="text-xl font-semibold text-foreground">3.1 What You Receive</h3>
        <p>By purchasing our premium service, you receive:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>A professionally designed website (up to 5 pages)</li>
          <li>SEO-ready structure</li>
          <li>Mobile responsiveness</li>
          <li>Contact form setup</li>
          <li>Social media linking</li>
          <li>Lifetime hosting as defined in Section 5</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground">3.2 Payments</h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Payment is a one-time fee payable in full during checkout.</li>
          <li>No recurring hosting charges will apply.</li>
          <li>All payments are non-refundable, except where covered under the Satisfaction Guarantee.</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground">3.3 Customer Responsibilities</h3>
        <p>You agree to provide all necessary content (text, images, business details, etc.) for your website in a timely manner. Failure to do so may delay delivery.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">4. Satisfaction Guarantee</h2>
        <p>We offer a 100% Satisfaction Guarantee on the design phase.</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>We will revise the website until you are satisfied with its design and layout.</li>
          <li>Once the website is approved or goes live on your domain, the project is considered complete.</li>
          <li>This guarantee does not include refunds, unlimited revisions after completion, or new redesigns in the future.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">5. Lifetime Hosting Terms</h2>
        <p>“Lifetime Hosting” includes:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Hosting for the operational lifetime of our hosting infrastructure or business operations</li>
          <li>No monthly or yearly renewal fees</li>
          <li>Standard business website hosting</li>
          <li>Reasonable usage limits to ensure server stability</li>
        </ul>
        <p>The following are not allowed:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Spam websites</li>
          <li>Malware or harmful scripts</li>
          <li>Adult, illegal, or prohibited content</li>
          <li>Excessive resource consumption</li>
          <li>Hosting apps requiring high CPU/RAM</li>
        </ul>
        <p>We reserve the right to suspend hosting for misuse or violations.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">6. User Responsibilities</h2>
        <p>By using our website or services, you agree NOT to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Upload harmful, illegal, or abusive content</li>
          <li>Attempt to hack, disrupt, or overload our systems</li>
          <li>Use automated bots or scraping tools</li>
          <li>Impersonate any person or business</li>
          <li>Misuse hosting resources</li>
        </ul>
        <p>Violation may result in account suspension or permanent ban.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">7. Intellectual Property</h2>
        <p>All content on 99foreversite.shop, including text, graphics, branding, tool interfaces, code, and layout, is owned by us. You may not reproduce, resell, or redistribute any part of our platform without written permission.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">8. Disclaimer of Warranties</h2>
        <p>All services (free and paid) are provided “as-is” and “as available”. We do not guarantee:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Error-free tools</li>
          <li>Continuous uptime</li>
          <li>Accuracy of outputs</li>
          <li>Specific business results</li>
          <li>Hosting uptime beyond commercially reasonable standards</li>
        </ul>
        <p>You use the platform at your own risk.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">9. Limitation of Liability</h2>
        <p>To the maximum extent permitted under Indian law:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>We are not liable for indirect, incidental, or consequential damages</li>
          <li>We are not responsible for loss of data, revenue, or business opportunities</li>
          <li>Our maximum liability is limited to the amount paid by you (if any)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">10. Modifications to Service</h2>
        <p>We may update, modify, pause, or discontinue any tool or service at any time without notice.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">11. Privacy Policy</h2>
        <p>Your use of the website is also governed by our Privacy Policy, which describes how we collect, use, and protect your data.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">12. Governing Law &amp; Jurisdiction</h2>
        <p>These Terms are governed by the laws of India. Any disputes shall be subject exclusively to the jurisdiction of the courts in Delhi, India.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">13. Contact Information</h2>
        <p>If you have questions about these Terms, you may contact us at:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>📧 Email: info@foreversite.shop</li>
          <li>🌐 Website: https://99foreversite.shop</li>
        </ul>
      </div>
    </div>
  );
}
