import React from "react";
import { WifiOff } from "lucide-react";

export const OfflineScreen = () => (
  <div className='flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gradient-to-br dark:from-emerald-900 dark:via-emerald-800 dark:to-emerald-950 duration-300 px-4 sm:px-6 lg:px-8'>
    <WifiOff className='h-24 w-24 text-zinc-400 mb-8 dark:text-zinc-300' />
    <h1 className='text-4xl font-bold text-zinc-900 mb-2 text-center dark:text-zinc-200'>
      You&apos;re Offline
    </h1>
    <p className='text-xl text-zinc-600 mb-8 text-center dark:text-zinc-300'>
      It seems you&apos;ve lost your internet connection.
    </p>
  </div>
);
