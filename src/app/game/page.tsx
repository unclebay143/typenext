"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TypingGame from "@/components/TypingGame";
import Results from "@/components/Results";
import {
  GameSettings,
  GameResult,
  Profession,
  Level,
  Duration,
} from "@/types/index";
import { createClient } from "@/lib/supabase/client";
import { useCurrentUser } from "@/hooks/currentUser";

export default function Game() {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user: currentUser, loading: isLoadingUser } = useCurrentUser();

  useEffect(() => {
    const profession = searchParams.get("profession") as Profession;
    const level = searchParams.get("level") as Level;
    const duration = searchParams.get("duration") as Duration;
    const timerEnabled = searchParams.get("timerEnabled") === "true";
    const timerDuration = parseInt(
      searchParams.get("timerDuration") || "60",
      10
    );

    if (profession && level && duration) {
      setGameSettings({
        profession,
        level,
        timerEnabled,
        timerDuration,
        duration,
      });
    } else {
      router.push("/game-settings");
    }
  }, [searchParams, router]);

  const handleGameComplete = async (result: GameResult) => {
    setGameResult(result);

    if (currentUser) {
      const supabase = createClient();
      const { data: newResult } = await supabase
        .from("results")
        .insert(result)
        .select()
        .single();

      const { data: currentUserLeaderboard } = await supabase
        .from("leaderboard")
        .select("id, top_result(*)")
        .eq("user", currentUser.id)
        .single();

      const currentTopResult = currentUserLeaderboard?.top_result;
      const firstTimer = !currentUserLeaderboard?.id;

      if (firstTimer) {
        console.log("first timer");
        await supabase.from("leaderboard").insert({
          top_result: newResult?.id,
        });
      }

      // @ts-expect-error wpm type
      if (result.wpm > currentTopResult?.wpm) {
        await supabase
          .from("leaderboard")
          .update({
            top_result: newResult?.id,
          })
          .eq("id", currentUserLeaderboard?.id)
          .select();
      }
    }
  };

  const resetGame = () => {
    setGameResult(null);
  };

  if (!gameSettings) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto relative'>
      {!isLoadingUser && !currentUser && (
        <div className='mt-8 text-center fixed right-0 bottom-4 w-full flex flex-col items-center gap-2'>
          <span className='text-red-500'>
            You are not logged in, so your results will not be saved.
          </span>
        </div>
      )}

      {!gameResult ? (
        <TypingGame
          profession={gameSettings.profession}
          level={gameSettings.level}
          timerEnabled={gameSettings.timerEnabled}
          timerDuration={gameSettings.timerDuration}
          duration={gameSettings.duration}
          onComplete={handleGameComplete}
        />
      ) : (
        <Results
          result={gameResult}
          onPlayAgain={resetGame}
          onShowLeaderboard={() => router.push("/leaderboard")}
        />
      )}
    </div>
  );
}
