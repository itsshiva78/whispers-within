'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { LogOut, MessageCircle, Flame } from 'lucide-react';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-border/30"
      style={{
        background: 'rgba(13, 11, 20, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 h-16 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-110">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
            Whispers Within
          </span>
        </Link>
        <Link href="/confessions" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-violet-400 transition-colors ml-6">
          <Flame className="h-4 w-4" />
          <span className="hidden md:inline">Confessions</span>
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden md:inline-block font-medium text-sm text-muted-foreground">
                {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="h-9 px-4 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground border border-border/30 text-sm font-medium transition-all"
                variant="ghost"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button className="h-9 px-5 rounded-lg text-sm font-medium bg-secondary/80 hover:bg-secondary text-foreground border border-border/30" variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="h-9 px-5 rounded-lg text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/15" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
