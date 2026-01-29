'use client';

import React from 'react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        About Whispers Within
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Where honesty meets anonymity. Discover the power of truth without the mask.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="p-6 rounded-2xl bg-card border shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">🛡️</span> Secure & Anonymous
                        </h2>
                        <p className="text-muted-foreground">
                            Your identity is our top priority. We use advanced encryption to ensure that your messages remain completely anonymous. Speak your mind freely without fear of judgment.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">🤖</span> AI-Powered Safety
                        </h2>
                        <p className="text-muted-foreground">
                            While we encourage free speech, we don&apos;t tolerate abuse. Our integrated AI moderation system filters out harmful content, ensuring a safe environment for everyone.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">🌐</span> Open Source
                        </h2>
                        <p className="text-muted-foreground">
                            Whispers Within is built with transparency in mind. Our code is open for the community to review, ensuring that we live up to our promises of privacy and security.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-card border shadow-sm">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="text-primary">💡</span> The Mission
                        </h2>
                        <p className="text-muted-foreground">
                            We believe that sometimes, the most important things are said when no one is watching. Our mission is to facilitate these honest conversations and help people connect on a deeper level.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
