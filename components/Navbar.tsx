import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Navbar = async () => {
  const session = await auth();

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
                <span className="hidden sm:inline">Create</span>
                <BadgePlus className="w-6 h-6 sm:hidden" />
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2"
              >
                <span className="hidden sm:inline">Logout</span>
                <LogOut className="w-6 h-6 text-red-500 sm:hidden" />
              </button>
              <Link href={`/user/${session?.user?.id}`}>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button onClick={() => signIn()}>Login</button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
