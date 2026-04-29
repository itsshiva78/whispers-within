import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Whispers Within',
  description: 'Read the Whispers Within disclaimer. Understand the limitations of liability regarding user-generated anonymous content, third-party links, and the nature of the anonymous messaging service.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Whispers Within',
    description: 'Important disclaimers regarding user-generated content and the Whispers Within anonymous messaging platform.',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: April 20, 2026</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Overview</h2>
            <p>
              The information and services provided on Whispers Within (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or the &quot;Platform&quot;), available at whispers-within.in, are for general informational and entertainment purposes only. While we have taken reasonable steps to ensure the accuracy and reliability of the information we provide, we make no guarantees of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the Platform or the information, products, services, or related graphics contained on the Platform for any purpose.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. User-Generated Content Disclaimer</h2>
            <p>
              Whispers Within is a user-generated content (UGC) platform. All anonymous messages and confessions posted on the Platform represent the personal views and opinions of the individual senders — <strong className="text-foreground">not the views, opinions, or endorsements of Whispers Within, its founders, developers, or affiliates.</strong>
            </p>
            <p>
              We do not pre-screen, edit, or verify user-generated content before it appears on the Platform, though we do employ automated AI-powered moderation to detect and remove content that violates our community standards. We do not guarantee that all harmful, inaccurate, or misleading content will be filtered or removed, and we expressly disclaim all responsibility and liability for any such content.
            </p>
            <p>
              Any reliance you place on information from user-generated content is strictly at your own risk. If you receive a message or read a confession that you believe to be harmful, false, misleading, or in violation of our Terms of Service, please report it to us immediately through our <a href="/contact" className="text-violet-400 hover:underline">Contact page</a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. No Professional Advice</h2>
            <p>
              The anonymous messages, confessions, and any other content shared through the Whispers Within platform should never be construed as professional advice of any kind — including, but not limited to, medical, psychological, legal, financial, or relationship advice. Content on the Platform is shared anonymously by ordinary individuals and is not reviewed, verified, or endorsed by any qualified professional.
            </p>
            <p>
              If you are experiencing emotional distress, mental health challenges, or any situation that requires professional intervention, we strongly urge you to seek guidance from a qualified and licensed professional. In India, you can reach the iCall helpline at <strong className="text-foreground">9152987821</strong> or Vandrevala Foundation at <strong className="text-foreground">1860-2662-345</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. Anonymity and Identity Disclaimer</h2>
            <p>
              By its fundamental design, Whispers Within cannot and does not guarantee the true identity, credentials, or intentions of any message sender. All senders are anonymous, and while our platform provides tools for optional hints and partial identity disclosure (through the paid Reveal Hint feature), no information provided through this feature constitutes a verified or legally reliable identification of any individual.
            </p>
            <p>
              Users must exercise their own judgment and discretion when interpreting anonymous messages and confessions. Whispers Within cannot be held responsible for actions taken by users in response to anonymous messages received through the Platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Third-Party Links and Services</h2>
            <p>
              The Whispers Within Platform may contain links to external websites, third-party services, or social media platforms that are not maintained or controlled by us. These links are provided for convenience and informational purposes only. We have no control over, and assume no responsibility for, the content, privacy policies, practices, or availability of any third-party websites or services.
            </p>
            <p>
              The inclusion of any external link on our Platform does not imply our endorsement, recommendation, or approval of that website or its content. We encourage you to review the terms of service and privacy policies of any third-party websites you visit.
            </p>
            <p>
              Third-party integrations we utilize include Cashfree Payments (for payment processing), Vercel (for hosting), MongoDB Atlas (for database services), and Google (for advertising via Google AdSense). Each of these services operates under its own terms and privacy policies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. Advertising Disclaimer</h2>
            <p>
              Whispers Within participates in the Google AdSense advertising program. Advertisements displayed on this Platform are served by Google and its partners. The placement of these advertisements does not constitute an endorsement of the advertised products or services by Whispers Within.
            </p>
            <p>
              Google&apos;s advertising practices are governed by their own Privacy Policy and Terms of Service. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">Google&apos;s Ads Settings</a>. We serve only non-personalised, contextual advertisements to users who have not provided consent for personalised advertising.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Whispers Within and its founders, developers, affiliates, and licensors shall not be held liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising out of or related to your use of the Platform, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Emotional distress caused by receiving anonymous messages or reading Confession Wall content.</li>
              <li>Actions taken or decisions made based on information received through the Platform.</li>
              <li>Technical failures, service interruptions, or data loss.</li>
              <li>Unauthorised access to or use of our servers or any personal information stored therein.</li>
              <li>Any content posted by other users that you find objectionable or harmful.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Platform Availability</h2>
            <p>
              We strive to maintain 99.9% uptime for the Whispers Within Platform; however, we do not guarantee uninterrupted, error-free, or continuously available access to the Platform. We reserve the right to modify, suspend, or discontinue the Platform (or any part of it) at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to modify this Disclaimer at any time. Changes will take effect immediately upon posting to the Platform. Your continued use of the Platform after any changes to this Disclaimer constitutes your acceptance of the revised Disclaimer. We encourage you to review this Disclaimer periodically.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Disclaimer, or if you need to report content or a situation on the Platform, please contact us:
            </p>
            <div className="p-5 rounded-xl mt-2" style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
              <p className="font-semibold text-foreground">Whispers Within</p>
              <p>Email: <a href="mailto:shivasap27@gmail.com" className="text-violet-400 hover:underline">shivasap27@gmail.com</a></p>
              <p>Website: <a href="https://www.whispers-within.in" className="text-violet-400 hover:underline">www.whispers-within.in</a></p>
              <p className="mt-3 text-sm">For abuse or urgent reports, visit our <a href="/contact" className="text-violet-400 hover:underline">Contact & Support page</a>.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
