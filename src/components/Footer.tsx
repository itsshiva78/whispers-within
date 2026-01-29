import Link from 'next/link';
import React from 'react';

function Footer() {
    return (
        <footer className="w-full py-8 text-center bg-black text-gray-500 text-sm border-t border-gray-900 z-10 relative">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
                <Link href="/privacy" className="hover:underline hover:text-white">
                    Privacy
                </Link>
                <Link href="/terms" className="hover:underline hover:text-white">
                    Terms
                </Link>
                <Link href="/contact" className="hover:underline hover:text-white">
                    Contact
                </Link>
            </div>
            <p>© 2026 Whispers Within. Made by Shiva Srivastava ❤️</p>
        </footer>
    );
}

export default Footer;
