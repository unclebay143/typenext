"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { LeaderboardEntry } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/hooks/currentUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getRelativeTimeFromNow } from "@/utils/date";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const supabase = createClient();
  const { user: currentUser } = useCurrentUser();
  const [displayName, setDisplayName] = useState("");
  const [updating, setUpdating] = useState(false);
  const displayNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc("get_leaderboard_v0");
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

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const supabase = createClient();
    const { status } = await supabase
      .from("users")
      .update({ displayname: displayNameRef.current?.value })
      .eq("id", currentUser?.id)
      .select("displayname");

    if (status === 200) {
      toast("Display name saved.");
      setUpdating(false);
      window.location.reload();
    }

    if (status === 409) {
      if (displayNameRef.current) {
        displayNameRef.current.style.border = "1px solid red";
      }
      toast("Display name already exist.");
    }
    setUpdating(false);
  };

  const TrEmptyState = ({ className }: { className: string }) => (
    <tr className={className}>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100 px-6 capitalize'>
        <div className='w-52 h-6 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>

      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100'>
        <div className='w-10 h-6 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100'>
        <div className='w-10 h-6 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100'>
        <div className='w-5 mx-auto h-6 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
      <td className='p-2 text-zinc-800 animate-pulse dark:text-emerald-100 flex justify-end'>
        <div className='w-24 h-6 bg-zinc-200 dark:bg-emerald-700 rounded-sm' />
      </td>
    </tr>
  );

  const mapRankIndexToRenderValue: { [key: number]: string } = {
    0: "🏆",
    1: "🥈",
    2: "🥉",
  };

  const getOrdinalSuffix = (rank: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const mod100 = rank % 100;
    const mod10 = rank % 10;

    if (mod100 >= 11 && mod100 <= 13) {
      return `${rank}th`; // Special case for 11th, 12th, 13th
    }

    return `${rank}${suffixes[mod10] || suffixes[0]}`; // Default to "th"
  };

  return (
    <>
      <div className='p-6 rounded-lg'>
        <h1 className='text-3xl font-bold mb-6 text-center text-zinc-900 dark:text-white'>
          Leaderboard
        </h1>
        <div className='overflow-x-auto'>
          <table className='w-[720px] md:w-full'>
            <thead>
              <tr className='bg-zinc-100 dark:bg-emerald-700'>
                <th className='w-[390px] truncate p-2 text-left text-zinc-900 dark:text-emerald-100 px-6 rounded-tl'>
                  Name
                </th>
                <th className='p-2 text-left text-zinc-900 dark:text-emerald-100'>
                  WPM
                </th>
                <th className='p-2 text-left text-zinc-900 dark:text-emerald-100'>
                  Accuracy
                </th>
                <th className='w-[0px] text-zinc-900 dark:text-emerald-100'></th>
                <th className='w-[150px] text-zinc-900 dark:text-emerald-100 rounded-tr'></th>
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
                      <div className='flex items-center justify-start gap-2'>
                        <div className='flex items-center gap-1 whitespace-nowrap'>
                          {entry.xUsername && (
                            <a
                              href={`https://x.com/${entry.xUsername}`}
                              target='_blank'
                              rel='noopener'
                            >
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
                            </a>
                          )}
                          <p className='truncate w-[200px]'>
                            {entry.displayname ?? "--"}
                          </p>
                          {entry.displayname === currentUser?.displayname && (
                            <p>
                              {entry.displayname === currentUser?.displayname &&
                                `(you)`}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className='p-2 text-zinc-800 dark:text-emerald-100'>
                      {entry.wpm}
                    </td>
                    <td className='p-2 text-zinc-800 dark:text-emerald-100'>
                      {entry.accuracy}%
                    </td>
                    <td className='text-right p-2 text-zinc-800 dark:text-emerald-100 px-6 capitalize'>
                      {mapRankIndexToRenderValue[index] ||
                        getOrdinalSuffix(index + 1)}
                    </td>
                    <td className='p-2 text-zinc-800 dark:text-emerald-100 text-right text-xs'>
                      {getRelativeTimeFromNow(entry.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {leaderboard.length > 0 && currentUser && !currentUser?.displayname ? (
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Display Name</DialogTitle>
              <DialogDescription>
                Choose a distinctive username that will appear on the
                leaderboard.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpdate} className='flex flex-col gap-2'>
              <input
                ref={displayNameRef}
                type='text'
                id='displayName'
                name='displayName'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className='mt-1 block w-full px-3 py-2 bg-white dark:bg-transparent border border-gray-300 dark:border-zinc-800 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                required
              />
              <button
                type='submit'
                disabled={updating}
                className='p-2 px-2.5 disabled:opacity-70 text-xs bg-black text-zinc-200 rounded dark:bg-emerald-700 dark:text-zinc-200'
              >
                Save
              </button>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
}
