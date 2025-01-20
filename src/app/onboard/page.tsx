"use client";

import { useState } from "react";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { useCurrentUser } from "@/hooks/currentUser";
import { redirect } from "next/navigation";

export default function Onboard() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const { user } = useCurrentUser();

  if (user) {
    redirect("/game-settings");
  }

  return (
    <div className='p-16'>
      <div className='max-w-md mx-auto p-6 bg-white dark:bg-emerald-800/30 rounded-lg shadow-lg'>
        <div className='flex mb-6'>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "signin"
                ? "bg-zinc-500 dark:bg-emerald-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-emerald-700/50 dark:text-white"
            } rounded-l-lg transition-colors duration-200`}
            onClick={() => setActiveTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "signup"
                ? "bg-zinc-500 dark:bg-emerald-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-emerald-700/50 dark:text-white"
            } rounded-r-lg transition-colors duration-200`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>
        {activeTab === "signin" ? <SignInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
