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
  const { user: currentUser } = useCurrentUser();

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

      const { data: currentTopResult } = await supabase
        .from("leaderboard")
        .select("top_result")
        .eq("user", currentUser.id);

      const firstTimer = currentTopResult?.length === 0;
      if (firstTimer) {
        await supabase.from("leaderboard").insert({
          top_result: newResult?.id,
        });
      }

      console.log(currentTopResult);
    }
  };

  const resetGame = () => {
    router.push("/game-settings");
  };

  if (!gameSettings) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto'>
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
