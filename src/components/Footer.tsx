import Link from 'next/link';
import React from 'react';
import { MessageCircle } from 'lucide-react';

function Footer() {
    return (
        <footer className="w-full bg-black text-gray-500 border-t border-gray-900 z-10 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                <MessageCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-lg text-white">Whispers Within</span>
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                            The honest anonymous feedback platform. Get a free link, share it on social media, and discover what people really think about you — safely and privately.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/sign-up" className="hover:text-white transition-colors">Get Started</Link></li>
                            <li><Link href="/confessions" className="hover:text-white transition-colors">Confession Wall</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Guides</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/blog/how-to-use-instagram-stories" className="hover:text-white transition-colors">Instagram Guide</Link></li>
                            <li><Link href="/blog/staying-safe-online" className="hover:text-white transition-colors">Safety Guide</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>

                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 mt-8">Social</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>© 2026 Whispers Within. All rights reserved.</p>
                    <p>Built with ❤️ in India. Powered by Next.js & MongoDB.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
