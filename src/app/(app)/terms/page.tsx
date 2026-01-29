'use client';

import React from 'react';

export default function TermsPage() {
    return (
        <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <div className="space-y-6 text-muted-foreground">
                    <p>Last updated: January 28, 2026</p>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Whispers Within, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
                        <p>
                            Whispers Within provides a platform for anonymous messaging. You understand and agree that the Service is provided &quot;AS-IS&quot;.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">3. User Conduct</h2>
                        <p>
                            You agree not to use the service to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Send abusive, harassing, or threatening messages.</li>
                            <li>Violate any local, state, national, or international law.</li>
                            <li>Impersonate any person or entity.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-foreground">4. Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
