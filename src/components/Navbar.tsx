'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="shadow-md bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 h-16 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="font-bold text-xl md:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-600 drop-shadow-sm">
              Whispers Within
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden md:inline-block font-medium text-foreground text-sm">
                {user.username || user.email}
              </span>
              <Button onClick={() => signOut()} className="w-auto h-9" variant='ghost' size="sm">
                Log out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button className="w-auto h-9 px-6 bg-primary hover:bg-primary/90 text-white" size="sm">Log in</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="w-auto h-9 px-6" variant="outline" size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
