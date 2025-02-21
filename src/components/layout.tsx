"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Sun, Moon, LogOut, X, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { toast } from "sonner";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { OfflineScreen } from "./offline-screen";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User | null;
}) {
  const { isOnline } = useNetworkStatus();
  const { theme, setTheme } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const xUsernameRef = useRef<HTMLInputElement | null>(null);
  const [updating, setUpdating] = useState(false);
  const pathname = usePathname();
  const hideOfflineScreenForPathname = ["/", "/leaderboard"].includes(pathname);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  const toggleDarkMode = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, [setTheme]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const supabase = createClient();
    const { status } = await supabase
      .from("users")
      .update({ xUsername: xUsernameRef.current?.value })
      .eq("id", currentUser?.id)
      .select("xUsername");

    if (status === 200) {
      toast("X username saved.");
      setUpdating(false);
    }
  };

  if (!hideOfflineScreenForPathname && !isOnline) {
    return <OfflineScreen />;
  }

  return (
    <div className='min-h-screen bg-white dark:bg-gradient-to-br dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-950 duration-300'>
      <header
        className={cn(
          "sticky max-w-5xl mx-auto top-0 left-0 right-0 z-50 bg-white dark:bg-emerald-900/50 backdrop-blur-sm border border-zinc-200 dark:border-emerald-700/50"
        )}
      >
        <div className='max-w-5xl mx-auto px-4 sm:px-6'>
          <nav className='flex justify-between h-16 items-center'>
            <div className='flex items-center'>
              <Link href='/' className='flex-shrink-0'>
                <span className='text-2xl font-bold italic text-emerald-700 dark:text-white'>
                  TypeNext⚡
                </span>
              </Link>
            </div>
            <div className='hidden md:flex items-center space-x-4'>
              <Link
                href='/'
                className='text-gray-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-white px-3 py-2 text-sm font-medium'
              >
                Home
              </Link>
              <Link
                href='/game-settings'
                className='text-gray-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-white px-3 py-2 text-sm font-medium'
              >
                Practice
              </Link>
              <Link
                href='/leaderboard'
                className='text-gray-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-white px-3 py-2 text-sm font-medium'
              >
                Leaderboard
              </Link>
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='relative rounded-full h-8 w-8 border border-zinc-200 overflow-hidden'>
                      <Image
                        fill
                        src='https://res.cloudinary.com/dm3qlqunj/image/upload/v1737195052/wnmgobose9fj53hnawvo.webp'
                        alt='avatar'
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href='/histories'>Histories</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>X (Twitter) Username</DropdownMenuLabel>
                    <form
                      onSubmit={handleUpdate}
                      className='flex gap-1 px-2 py-1.5'
                    >
                      <input
                        defaultValue={currentUser.xUsername ?? ""}
                        required
                        pattern='^[a-zA-Z0-9]+$'
                        ref={xUsernameRef}
                        className='border rounded p-0.5 text-sm'
                        placeholder='i.e unclebay143'
                      />
                      <button
                        type='submit'
                        disabled={updating}
                        className='disabled:opacity-70 text-xs bg-black text-zinc-200 p-0.5 px-1 rounded dark:bg-emerald-700 dark:text-zinc-200'
                      >
                        Save
                      </button>
                    </form>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogOut}>
                      <LogOut />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href='/onboard'
                  className='text-gray-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-white px-3 py-2 text-sm font-medium'
                >
                  Login
                </Link>
              )}
              <button
                onClick={toggleDarkMode}
                className='ml-4 p-2 rounded-full bg-emerald-50 dark:bg-emerald-700/50 text-emerald-600 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-600/50 transition-colors'
              >
                <Sun className='w-5 h-5 hidden dark:block' />
                <Moon className='w-5 h-5 dark:hidden' />
              </button>
            </div>
            <div className='md:hidden flex items-center'>
              <button
                onClick={toggleMobileMenu}
                className='p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500'
              >
                <span className='sr-only'>Open main menu</span>
                {mobileMenuOpen ? (
                  <X className='block h-6 w-6' aria-hidden='true' />
                ) : (
                  <Menu className='block h-6 w-6' aria-hidden='true' />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {[
              { href: "/", label: "Home" },
              { href: "/game-settings", label: "Practice" },
              {
                href: "/leaderboard",
                label: "Leaderboard",
              },
              {
                href: "/histories",
                label: "Histories",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-gray-600 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-800 hover:text-emerald-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            <form
              onSubmit={handleUpdate}
              className='flex flex-col gap-1 px-2 py-1.5 items-start'
            >
              <div className='flex flex-col gap-0.5'>
                <label>X (Twitter) Username</label>
                <input
                  required
                  pattern='^[a-zA-Z0-9]+$'
                  ref={xUsernameRef}
                  defaultValue={currentUser?.xUsername ?? ""}
                  className='border rounded p-0.5 text-sm'
                  placeholder='i.e unclebay143'
                />
              </div>
              <button
                type='submit'
                disabled={updating}
                className='disabled:opacity-70 text-xs bg-black text-zinc-200 p-0.5 px-1 rounded dark:bg-emerald-700 dark:text-zinc-200'
              >
                Save
              </button>
            </form>
            <button
              onClick={() => {
                toggleDarkMode();
                toggleMobileMenu();
              }}
              className='w-full text-left text-gray-600 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-800 hover:text-emerald-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium'
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </header>
      <main className='max-w-5xl mx-auto border-x dark:border-emerald-700/50 relative min-h-[calc(100vh-4rem)]'>
        {children}
      </main>
    </div>
  );
}
