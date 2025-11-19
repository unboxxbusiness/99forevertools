'use client';

export function TermsContent() {
  return (
    <div className="prose prose-invert max-w-4xl mx-auto">
      <h1>Terms of Use</h1>
      <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <p>Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the 99forevertools website (the "Service") operated by 99forevertools ("us", "we", or "our").</p>

      <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

      <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

      <h2>1. Use of Tools</h2>
      <p>Our website provides a variety of free online tools for business and marketing purposes. You are free to use these tools for personal or commercial projects. You agree not to use the tools for any illegal or unauthorized purpose.</p>
      
      <h2>2. Intellectual Property</h2>
      <p>The Service and its original content, features, and functionality are and will remain the exclusive property of 99forevertools and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.</p>

      <h2>3. Links To Other Web Sites</h2>
      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by 99forevertools.</p>
      <p>99forevertools has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that 99forevertools shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

      <h2>4. Disclaimer</h2>
      <p>The tools and services on this website are provided "as is" without any warranties of any kind. We do not warrant that the tools will be error-free or that the results obtained from the use of the tools will be accurate or reliable.</p>
      
      <h2>5. Limitation Of Liability</h2>
      <p>In no event shall 99forevertools, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

      <h2>6. Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

      <h2>7. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us.</p>
    </div>
  );
}
