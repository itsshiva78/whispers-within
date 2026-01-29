'use client';

import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                    Have questions, suggestions, or need support? We&apos;re here to help.
                </p>

                <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
                    <Card className="bg-card border shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="flex flex-col items-center p-8 space-y-4">
                            <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                                <Mail className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-bold">Email Us</h2>
                            <p className="text-muted-foreground">
                                For general inquiries and support
                            </p>
                            <a
                                href="mailto:shivasap27@gmail.com"
                                className="text-lg font-medium text-primary hover:underline mt-2"
                            >
                                shivasap27@gmail.com
                            </a>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 p-6 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground">
                        Response times may vary. We usually reply within 24-48 hours.
                    </p>
                </div>
            </div>
        </div>
    );
}
