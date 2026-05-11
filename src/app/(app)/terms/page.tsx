import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the Whispers Within Terms of Service. Understand the rules, responsibilities, and agreements for using our anonymous messaging and confession platform.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'Terms and conditions for using the Whispers Within anonymous messaging platform.',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: April 10, 2026</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using Whispers Within (the &quot;Platform&quot;), available at whispers-within.in, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, you must not use the Platform. These Terms constitute a legally binding agreement between you and Whispers Within.
            </p>
            <p>
              We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically to stay informed of updates. The date of the most recent revision will always appear at the top of this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
            <p>
              Whispers Within is an anonymous messaging and community platform that allows users to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Receive Anonymous Messages:</strong> Create a personal profile link that you can share publicly. Anyone who visits your link can send you an anonymous message without needing to create an account or reveal their identity.</li>
              <li><strong className="text-foreground">Manage Messages:</strong> View, organize, and manage all received messages through a personal dashboard. You can accept or reject new messages, delete individual messages, or clear your entire inbox.</li>
              <li><strong className="text-foreground">Confession Wall:</strong> Participate in a public, community-driven space where users can post anonymous confessions, secrets, and thoughts. Confessions are categorized and can be liked and shared by other users.</li>
              <li><strong className="text-foreground">Hint Reveal:</strong> An optional feature where confession senders can leave a hidden clue about their identity, which other users can unlock through a paid reveal.</li>
            </ul>
            <p>
              The Platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the Platform will be uninterrupted, secure, or error-free at all times.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">3. User Accounts & Registration</h2>
            <p>
              To access certain features of the Platform, you must create a user account. When registering for an account, you agree to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 13 years of age to create an account and use the Platform.</li>
              <li>You must provide accurate, current, and complete information during the registration process.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials, including your password.</li>
              <li>You are solely responsible for all activities that occur under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account or any other breach of security.</li>
              <li>You may not create more than one account per person. Duplicate or fraudulent accounts may be terminated without notice.</li>
              <li>You may not use another person&apos;s account without their explicit permission.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate any account at our sole discretion, with or without cause, and with or without notice, particularly if we believe the account is being used in violation of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">4. User Conduct & Prohibited Activities</h2>
            <p>
              You agree that you will not use the Platform to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Harassment & Bullying:</strong> Sending messages that are threatening, intimidating, harassing, or intended to bully or demean another individual.</li>
              <li><strong className="text-foreground">Hate Speech:</strong> Posting content that promotes hatred, discrimination, or violence against individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or any other protected characteristic.</li>
              <li><strong className="text-foreground">Illegal Content:</strong> Sharing, distributing, or promoting any content that is illegal under applicable local, state, national, or international law.</li>
              <li><strong className="text-foreground">Doxxing & Privacy Violations:</strong> Sharing personal information about others (such as real names, addresses, phone numbers, or other identifying information) without their explicit consent.</li>
              <li><strong className="text-foreground">Spam & Abuse:</strong> Sending unsolicited bulk messages, advertisements, or promotional content. Using automated systems (bots) to send messages at scale.</li>
              <li><strong className="text-foreground">Impersonation:</strong> Pretending to be another person, organization, or entity, or falsely stating or misrepresenting your affiliation with any person or entity.</li>
              <li><strong className="text-foreground">Platform Manipulation:</strong> Attempting to hack, exploit, reverse-engineer, or otherwise interfere with the proper functioning of the Platform, its servers, or its infrastructure.</li>
              <li><strong className="text-foreground">Minors:</strong> Sending sexually explicit, suggestive, or otherwise inappropriate content involving or directed at minors.</li>
            </ul>
            <p>
              Violation of any of these rules may result in immediate suspension or permanent termination of your account, removal of your content, and potential reporting to law enforcement authorities where appropriate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
            <p>
              The Platform, including its original content, features, functionality, design, logos, and branding, is and will remain the exclusive property of Whispers Within and its licensors. The Platform is protected by copyright, trademark, and other intellectual property laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Whispers Within.
            </p>
            <p>
              The source code of Whispers Within is available under an open-source license. However, this does not grant you any rights to the Whispers Within name, logos, branding, or any other proprietary elements of the Platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">6. User-Generated Content</h2>
            <p>
              The Platform allows users to post, submit, and share content, including anonymous messages and confessions (&quot;User Content&quot;). By posting User Content on the Platform, you agree to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain ownership of your User Content, but you grant Whispers Within a non-exclusive, worldwide, royalty-free, transferable license to use, display, reproduce, modify, and distribute your User Content in connection with operating and providing the Platform.</li>
              <li>You represent and warrant that your User Content does not violate these Terms or any applicable law.</li>
              <li>You understand that User Content posted on public areas of the Platform (such as the Confession Wall) is visible to all users and may be shared by other users.</li>
              <li>We reserve the right to remove any User Content at our sole discretion, without prior notice, if we believe it violates these Terms or is otherwise objectionable.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">7. Payments & Refunds</h2>
            <p>
              Certain features of the Platform, such as the Confession Hint Reveal, require payment. All payments are processed securely through our payment partner, Cashfree Payments. By making a payment, you agree to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payments are final and non-refundable, except where required by applicable law.</li>
              <li>Prices are listed in Indian Rupees (INR) and include applicable taxes.</li>
              <li>We are not responsible for any fees charged by your bank or payment provider.</li>
              <li>In the event of a payment processing error, we will make reasonable efforts to resolve the issue promptly.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">8. Privacy</h2>
            <p>
              Your use of the Platform is also governed by our <a href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using the Platform, you consent to the data practices described in our Privacy Policy. We encourage you to read the Privacy Policy carefully to understand our practices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">9. Disclaimers & Warranty</h2>
            <p>
              THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
              <li>WARRANTIES THAT THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.</li>
              <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY INFORMATION PROVIDED THROUGH THE PLATFORM.</li>
            </ul>
            <p>
              We do not warrant, endorse, guarantee, or assume responsibility for any User Content posted on the Platform. Anonymous messages and confessions represent the views of their respective senders, not the views of Whispers Within.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">10. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WHISPERS WITHIN, ITS FOUNDERS, DEVELOPERS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to or use of (or inability to access or use) the Platform.</li>
              <li>Any conduct or content of any third party on the Platform, including any defamatory, offensive, or illegal conduct of other users or third parties.</li>
              <li>Any User Content obtained from the Platform.</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Whispers Within, its founders, developers, affiliates, and licensors from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Platform, your User Content, or your violation of these Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in India. You agree to submit to the personal jurisdiction of such courts for the purpose of litigating any such disputes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">13. Modifications to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify, update, or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 15 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Platform after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">14. Contact</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
