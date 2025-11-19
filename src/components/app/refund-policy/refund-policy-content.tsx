
'use client';

export function RefundPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto text-foreground prose-styles">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">No-Refund Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>Thank you for choosing 99foreversite.shop for your website and hosting services. We strive to provide high-quality work and ensure customer satisfaction. Please read our No-Refund Policy carefully before making a purchase.</p>
        
        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">1. No Refunds After Website Delivery</h2>
        <p>Once your website has been designed, delivered, approved, or made live on your domain, the payment becomes 100% non-refundable.</p>
        <p>This includes circumstances where:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>You approved the website design</li>
          <li>The website has been delivered to you for final review</li>
          <li>The website is published or made live</li>
          <li>You provided content and we completed the project</li>
          <li>You no longer need the website</li>
          <li>You change your mind after delivery</li>
          <li>You stop using the hosting or website</li>
        </ul>
        <p>After delivery, no partial or full refunds will be issued.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">2. Why Refunds Are Not Provided After Delivery</h2>
        <p>Website development and hosting involve:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Time and resources</li>
          <li>Technical setup</li>
          <li>Custom design work</li>
          <li>Server allocation</li>
          <li>Integration and configuration</li>
        </ul>
        <p>Once these services are completed, they cannot be reversed or resold.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">3. Satisfaction Guarantee (Before Delivery)</h2>
        <p>Before delivery, we provide a 100% Satisfaction Guarantee, which includes:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Design revisions</li>
          <li>Layout adjustments</li>
          <li>Content adjustments</li>
          <li>Required changes to match your business</li>
        </ul>
        <p>We revise the website until you are satisfied. However, once the final website is delivered or approved, refunds are not possible.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">4. No Refunds on Lifetime Hosting</h2>
        <p>Lifetime hosting is a prepaid, long-term service allocated specifically for your website. Because the hosting is activated immediately after purchase, hosting fees are non-refundable, even if:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>You stop using the website</li>
          <li>You move to a different provider</li>
          <li>You change your business needs</li>
          <li>You fail to provide content</li>
          <li>You delay communication</li>
          <li>You request cancellation after activation</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">5. Client Responsibility</h2>
        <p>The client is responsible for:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Providing accurate content and information</li>
          <li>Responding promptly to revision requests</li>
          <li>Approving designs in a timely manner</li>
          <li>Reviewing the website before final approval</li>
        </ul>
        <p>Delays caused by incomplete content or lack of communication do not qualify for refunds.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">6. Technical Issues</h2>
        <p>If there is a technical issue resulting from our end, we will fix it promptly at no extra charge. However, technical issues are not eligible for refunds.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">7. Contact Us</h2>
        <p>For any questions regarding this policy, contact us at:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>📧 Email: info@foreversite.shop</li>
          <li>🌐 Website: https://99foreversite.shop</li>
          <li>📍 Delhi, India</li>
        </ul>
        <p>We’re here to help.</p>
      </div>
    </div>
  );
}
