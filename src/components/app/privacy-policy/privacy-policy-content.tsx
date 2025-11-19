
'use client';

export function PrivacyPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto text-foreground prose-styles">
      <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>Welcome to 99foreversite.shop (“we”, “our”, “us”). Your privacy is extremely important to us. This Privacy Policy explains how we collect, use, protect, and store your information when you use our website, tools, and services.</p>
        <p>By accessing or using our platform, you agree to the practices described in this Privacy Policy.</p>
        
        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">1. Information We Collect</h2>
        <p>We collect two types of information:</p>
        <h3 className="text-xl font-semibold text-foreground">1.1 Information You Provide</h3>
        <p>This includes data you voluntarily submit, such as:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Contact number (if provided)</li>
          <li>Business details (for website creation)</li>
          <li>Content or files submitted for building your website</li>
          <li>Payment information (processed securely through third-party payment gateways)</li>
        </ul>
        <p>We DO NOT store your card/banking details. All payments are handled securely by our payment partners.</p>

        <h3 className="text-xl font-semibold text-foreground">1.2 Information Automatically Collected</h3>
        <p>When you use our tools or website, we may collect information such as:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>IP address</li>
          <li>Device type (mobile/desktop/tablet)</li>
          <li>Browser type</li>
          <li>Usage data & interactions with tools</li>
          <li>Pages visited</li>
          <li>Time spent on the site</li>
          <li>Referral links</li>
          <li>Cookies and tracking technologies</li>
        </ul>
        <p>This helps us improve performance and user experience.</p>
        
        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">2. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
            <li>Provide and improve our tools and services</li>
            <li>Deliver purchased website services</li>
            <li>Communicate regarding support or project updates</li>
            <li>Enhance your user experience</li>
            <li>Maintain website security & performance</li>
            <li>Process payments for paid services</li>
            <li>Send updates, promotional messages, or newsletters (you can opt out anytime)</li>
            <li>Prevent fraud, abuse, or violations of our Terms</li>
        </ul>
        <p>We never sell your personal data to third parties.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">3. Cookies & Tracking Technologies</h2>
        <p>We use cookies to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Improve website functionality</li>
          <li>Remember settings/preferences</li>
          <li>Analyze user activity</li>
          <li>Personalize tool performance</li>
          <li>Enhance overall experience</li>
        </ul>
        <p>You may disable cookies in your browser settings, but some features may not work properly.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">4. Data Sharing & Disclosure</h2>
        <p>We only share your data with:</p>
        <h3 className="text-xl font-semibold text-foreground">4.1 Trusted Third Parties</h3>
        <p>Such as:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Payment gateways</li>
          <li>Hosting providers</li>
          <li>Email service providers</li>
          <li>Analytics tools</li>
          <li>Support tools</li>
        </ul>
        <p>These partners follow secure industry standards.</p>
        <h3 className="text-xl font-semibold text-foreground">4.2 Legal Requirements</h3>
        <p>We may disclose information if required by:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Law</li>
          <li>Court order</li>
          <li>Government authority</li>
          <li>Investigation into illegal activities</li>
        </ul>
        <p>We never share data for marketing without your consent.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">5. Data Security</h2>
        <p>We use strong industry-standard measures to protect your information, including:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>SSL encryption</li>
          <li>Secure hosting</li>
          <li>Firewall protection</li>
          <li>Restricted access</li>
          <li>Regular monitoring</li>
        </ul>
        <p>However, no digital system is 100% secure. Use the website at your own discretion.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">6. Data Retention</h2>
        <p>We keep your data only as long as necessary to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Provide services</li>
          <li>Comply with legal requirements</li>
          <li>Resolve disputes</li>
          <li>Maintain hosting accounts</li>
        </ul>
        <p>If you want your data deleted, contact us at info@foreversite.shop.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">7. Your Rights</h2>
        <p>As an India-based user, you have the right to:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Access your personal information</li>
          <li>Update or correct your details</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent</li>
          <li>Opt out of emails or marketing</li>
          <li>Ask how your data is used</li>
        </ul>
        <p>To exercise these rights, email us at info@foreversite.shop.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">8. Children’s Privacy</h2>
        <p>Our services are not intended for children under 13. We do not knowingly collect data from minors. If you believe a minor has submitted information, contact us and we will delete it.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">9. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites or tools. We are not responsible for their privacy practices or content.</p>
        <p>We encourage you to read their policies before providing information.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">10. International Users</h2>
        <p>Although our services are primarily intended for users in India, visitors from other countries agree that their information may be processed according to this policy.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">11. Updates to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date. Continued use of the site after changes means you accept the new terms.</p>

        <h2 className="text-2xl font-semibold text-foreground pt-4 border-t">12. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy, reach out to us:</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>📧 Email: info@foreversite.shop</li>
          <li>🌐 Website: https://99foreversite.shop</li>
          <li>📍 Jurisdiction: Delhi, India</li>
        </ul>
        <p>We’re happy to help.</p>
      </div>
    </div>
  );
}
