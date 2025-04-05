import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { auth,signIn,signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { redirect } from 'next/dist/server/api-utils';

const Navbar = async () => {
  const session = await auth()
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Header Image" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
            </>
          ) : (
            <form></form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar