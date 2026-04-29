import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Whispers Within',
  description: 'Read the Whispers Within Privacy Policy. Learn how we collect, use, protect, and handle your personal information and data when you use our anonymous messaging platform.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Whispers Within',
    description: 'How we handle your privacy and personal data at Whispers Within.',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 10, 2026</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Whispers Within (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or the &quot;Platform&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at whispers-within.in and use our anonymous messaging services.
            </p>
            <p>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Platform. By using Whispers Within, you consent to the data practices described in this policy. We reserve the right to make changes to this Privacy Policy at any time and for any reason, and we will notify you of any significant changes by updating the &quot;Last Updated&quot; date at the top of this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
            <p>We collect information in the following categories to provide, maintain, and improve our services:</p>

            <h3 className="text-xl font-semibold text-foreground mt-6">2.1 Personal Information You Provide</h3>
            <p>When you create an account on Whispers Within, we collect the following personal information that you voluntarily provide to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Account Registration Data:</strong> Your email address, username, and password (stored in hashed form). If you choose to complete your profile, we also store your display name and gender preference.</li>
              <li><strong className="text-foreground">User-Generated Content:</strong> Messages you receive through your anonymous link, confessions you post on the Confession Wall, and any optional &quot;hints&quot; or clues you provide with confessions.</li>
              <li><strong className="text-foreground">Communication Data:</strong> If you contact us for support, we collect the contents of your communication along with your email address.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Information Collected Automatically</h3>
            <p>When you access or use our Platform, we may automatically collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Device Information:</strong> We collect basic device type information (mobile, desktop, tablet) for the optional hint feature on confessions. This information is generalized and cannot be used to identify a specific device.</li>
              <li><strong className="text-foreground">Usage Data:</strong> We collect aggregated, anonymized data about how our Platform is used, including page views, session duration, and feature usage. This data is used solely for improving the Platform and does not identify individual users.</li>
              <li><strong className="text-foreground">Log Data:</strong> Our servers automatically record information when you access our Platform, including your browser type, operating system, the pages you visit, the time and date of your visit, and the time spent on those pages.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6">2.3 Information We Do NOT Collect About Anonymous Senders</h3>
            <p>
              This is critically important to understand: <strong className="text-foreground">we do not collect, store, or track any personally identifiable information about people who send anonymous messages through user profile links.</strong> Senders are not required to create an account, and we do not place tracking cookies, log IP addresses, or use any other mechanism to identify message senders. The only optional metadata collected is generalized device type (e.g., &quot;Mobile&quot;) and time period (e.g., &quot;Evening&quot;) for the hint feature.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Service Delivery:</strong> To create, maintain, and manage your user account; to facilitate anonymous messaging between users; and to provide the Confession Wall community feature.</li>
              <li><strong className="text-foreground">Safety & Moderation:</strong> To operate our AI-powered content moderation system that scans messages for harmful content including harassment, hate speech, threats, and abuse.</li>
              <li><strong className="text-foreground">Platform Improvement:</strong> To analyze aggregated usage patterns and improve the design, functionality, and performance of our Platform.</li>
              <li><strong className="text-foreground">Communication:</strong> To send you important account-related notifications such as verification emails, security alerts, and service updates.</li>
              <li><strong className="text-foreground">Legal Compliance:</strong> To comply with our legal obligations, resolve disputes, and enforce our Terms of Service.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. How We Share Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Payment Processors:</strong> When you make a payment to reveal confession hints, your payment information is processed directly by our payment partner (Cashfree Payments). We do not store your credit card or bank account details on our servers.</li>
              <li><strong className="text-foreground">Service Providers:</strong> We use trusted third-party services for hosting (Vercel), database management (MongoDB Atlas), authentication (NextAuth.js), and email services. These providers only access the minimum data necessary to perform their services and are contractually obligated to protect your information.</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend our rights or property, or protect the personal safety of users of the Platform or the public.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide you with our services. If you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal or regulatory purposes. Anonymous messages and confessions are retained as part of the platform&apos;s community content and cannot be traced back to any individual sender.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Data Security</h2>
            <p>
              We implement robust technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All data transmission is encrypted using HTTPS with TLS 1.3 encryption standards.</li>
              <li>Passwords are hashed using industry-standard bcrypt algorithms — we never store plaintext passwords.</li>
              <li>Database connections are encrypted and access is restricted through IP whitelisting and authentication credentials.</li>
              <li>Authentication sessions are managed securely through NextAuth.js with HTTP-only cookies and CSRF protection.</li>
              <li>We conduct regular security reviews and follow OWASP best practices for web application security.</li>
            </ul>
            <p>
              While we take reasonable precautions to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to maintaining the highest practical level of protection for your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
              <li><strong className="text-foreground">Right to Rectification:</strong> You can update or correct your personal information through your account settings.</li>
              <li><strong className="text-foreground">Right to Deletion:</strong> You can request that we delete your account and associated personal data by contacting us.</li>
              <li><strong className="text-foreground">Right to Data Portability:</strong> You can request a copy of your data in a machine-readable format.</li>
              <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Where we rely on your consent to process your data, you have the right to withdraw that consent at any time.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:shivasap27@gmail.com" className="text-violet-400 hover:underline">shivasap27@gmail.com</a>. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Children&apos;s Privacy</h2>
            <p>
              Whispers Within is not intended for children under the age of 13. We do not knowingly collect, use, or disclose personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without verification of parental consent, we will take steps to remove that information from our servers promptly. If you believe that we might have any information from or about a child under 13, please contact us at <a href="mailto:shivasap27@gmail.com" className="text-violet-400 hover:underline">shivasap27@gmail.com</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Cookies & Tracking Technologies</h2>
            <p>
              Whispers Within uses essential cookies to maintain your authentication session. These are strictly necessary cookies that allow you to stay logged in and use the Platform&apos;s features. We do not use advertising cookies, analytics tracking cookies, or third-party marketing cookies. Our approach to cookies is minimal — we only use what is technically necessary for the Platform to function properly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Third-Party Services</h2>
            <p>
              Our Platform may contain links to third-party websites, services, or content that are not operated by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of every third-party site you visit. The third-party services we integrate with include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Vercel</strong> — Hosting and deployment infrastructure</li>
              <li><strong className="text-foreground">MongoDB Atlas</strong> — Encrypted database hosting and management</li>
              <li><strong className="text-foreground">Cashfree Payments</strong> — Secure payment processing for the hint reveal feature</li>
              <li><strong className="text-foreground">Google</strong> — Ad serving through the Google AdSense network (non-personalized contextual ads)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the &quot;Last Updated&quot; date at the top of this page that is visible on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of the Platform after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">12. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="p-5 rounded-xl mt-2" style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
              <p className="font-semibold text-foreground">Whispers Within</p>
              <p>Email: <a href="mailto:shivasap27@gmail.com" className="text-violet-400 hover:underline">shivasap27@gmail.com</a></p>
              <p>Website: <a href="https://www.whispers-within.in" className="text-violet-400 hover:underline">www.whispers-within.in</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
