
'use client';

export function RefundPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto text-foreground prose-styles">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Refund Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>Thank you for choosing 99forevertools. Our goal is to provide valuable tools and services to help your business succeed. This policy outlines our position on refunds for our various offerings.</p>
        
        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">1. Free Online Tools</h2>
        <p>All 74+ tools and utilities available on our website are provided completely free of charge. As no payment is required to use these tools, there is nothing to refund. Your use of these tools is subject to our Terms of Use.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">2. Paid One-Time Website Offer</h2>
        <p>Our premium service, the "Lifetime Website Offer," is a one-time payment for a complete website design and lifetime hosting package. Our refund policy for this service is as follows:</p>
        
        <h3 className="text-xl font-semibold text-foreground">2.1 General Policy</h3>
        <p>Due to the nature of digital services and the significant resources allocated upon purchase, our one-time website offer is **non-refundable**. When you purchase this package, you are securing a slot for our design and development resources, as well as lifetime hosting resources.</p>
        
        <h3 className="text-xl font-semibold text-foreground">2.2 Satisfaction Guarantee</h3>
        <p>While we do not offer refunds, we are fully committed to your satisfaction. Our service is backed by a **100% Satisfaction Guarantee** on the design and development phase. This means:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>We will work with you closely to understand your vision.</li>
          <li>We will provide revisions to the website design until you are completely happy with the final look and feel.</li>
          <li>The project is only considered complete once you have given your final approval on the website design and functionality.</li>
        </ul>
        <p>Our commitment is to deliver a website that you love. We will continue to revise the work until we meet the agreed-upon requirements.</p>

        <h3 className="text-xl font-semibold text-foreground">2.3 When a Refund is Not Applicable</h3>
        <p>A refund will not be issued under any circumstances once:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>The project has commenced and initial design work has been shared.</li>
          <li>You have approved the final design and the website has been deployed.</li>
          <li>You fail to provide the necessary content (text, images, etc.) to complete the project after a reasonable period.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">3. How to Address Concerns</h2>
        <p>If you are not satisfied with the progress or direction of your website project, please contact us immediately. We encourage open communication to resolve any issues and get the project back on track to meet your expectations.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">4. Contact Us</h2>
        <p>If you have any questions about our Refund Policy, please contact us:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>📧 Email: info@foreversite.shop</li>
          <li>🌐 Website: https://99foreversite.shop</li>
        </ul>
      </div>
    </div>
  );
}
