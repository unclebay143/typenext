"use client";

import { useState, useEffect } from "react";
import { LeaderboardEntry } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_top_wpm_per_user_13");
      if (error) {
        console.error("Error fetching user WPM and accuracy:", error);
      }

      if (!error) setLeaderboard(data);
    };

    supabase
      .channel("leaderboard")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "results" },
        () => {
          console.log("Change received!");
          fetchData();
        }
      )
      .subscribe();

    fetchData();

    // return () => supabase.removeChannel("leaderboard"); // Todo: figure the type here out
  }, [supabase]);

  const TrEmptyState = ({ className }: { className: string }) => (
    <tr className={className}>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100 px-6 capitalize'>
        <div className='w-52 h-4 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>

      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100'>
        <div className='w-10 h-4 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100'>
        <div className='w-10 h-4 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
    </tr>
  );

  return (
    <div className='p-6 rounded-lg'>
      <h1 className='text-3xl font-bold mb-6 text-center text-zinc-900 dark:text-white'>
        Leaderboard
      </h1>
      <div className='overflow-x-auto'>
        <table className='w-full table-fixed'>
          <thead>
            <tr className='bg-zinc-100 dark:bg-emerald-700'>
              <th className='p-2 text-left text-zinc-900 dark:text-emerald-100 px-6 rounded-tl'>
                Name
              </th>
              <th className='p-2 text-left text-zinc-900 dark:text-emerald-100'>
                WPM
              </th>
              <th className='p-2 text-left text-zinc-900 dark:text-emerald-100 rounded-tr'>
                Accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <>
                {Array(10)
                  .fill(2)
                  .map((_, index) => (
                    <TrEmptyState
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-zinc-50 dark:bg-emerald-800/50"
                          : ""
                      }
                    />
                  ))}
              </>
            ) : (
              leaderboard.map((entry, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-zinc-50 dark:bg-emerald-800/50" : ""
                  }
                >
                  <td className='p-2 text-zinc-800 dark:text-emerald-100 px-6 capitalize'>
                    <div className='flex w-[200px] items-center justify-start gap-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={16}
                        height={16}
                        fill='currentColor'
                        className='h-3 w-h-3 fill-zinc-800 transition group-hover:fill-zinc-600 dark:fill-zinc-200 dark:group-hover:fill-zinc-300'
                        viewBox='0 0 16 16'
                      >
                        <path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' />
                      </svg>
                      <p className='truncate'>{entry.displayname}</p>
                    </div>
                  </td>

                  <td className='p-2 text-zinc-800 dark:text-emerald-100'>
                    {entry.wpm}
                  </td>
                  <td className='p-2 text-zinc-800 dark:text-emerald-100'>
                    {entry.accuracy}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
