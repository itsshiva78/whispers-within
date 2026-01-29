'use client';

import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-muted-foreground">
                    <p>Last updated: January 28, 2026</p>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to Whispers Within (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
                        <p>
                            We collect minimal information necessary to provide our service. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Authentication information (email/username) when you sign up.</li>
                            <li>Messages sent and received through our platform.</li>
                            <li>Usage data to improve our services.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
                        <p>
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Facilitate anonymous messaging.</li>
                            <li>Maintain and improve our platform.</li>
                            <li>Detect and prevent efficient abuse using AI moderation.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational security measures to protect the security of your personal information.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
