"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Profession,
  Level,
  GameSettings as GameSettingsType,
  Duration,
} from "@/types/index";
import ProfessionSelect from "@/components/ProfessionSelect";
import LevelSelect from "@/components/LevelSelect";
import TypeSelect from "@/components/TypeLength";
import { Switch } from "@/components/ui/switch";

export default function GameSettings() {
  const router = useRouter();
  const [gameSettings, setGameSettings] = useState<GameSettingsType>({
    profession: "others",
    duration: "short",
    level: "intermediate",
    timerDuration: 30,
    timerEnabled: false,
  });

  const handleStartGame = () => {
    router.push(
      `/game?profession=${gameSettings?.profession}&level=${gameSettings?.level}&timerEnabled=${gameSettings?.timerEnabled}&timerDuration=${gameSettings?.timerDuration}&duration=${gameSettings?.duration}`
    );
  };

  const handleProfessionSelect = (profession: Profession) => {
    setGameSettings((prev) => ({ ...prev, profession } as GameSettingsType));
  };

  const handleLevelSelect = (level: Level) => {
    setGameSettings((prev) => ({ ...prev, level } as GameSettingsType));
  };

  const handleTypeSelect = (duration: Duration) => {
    setGameSettings((prev) => ({ ...prev, duration } as GameSettingsType));
  };

  const handleEnableTimer = (timerEnabled: boolean) => {
    setGameSettings((prev) => ({ ...prev, timerEnabled } as GameSettingsType));
  };

  const handleTimerDuration = (timerDuration: number) => {
    setGameSettings((prev) => ({ ...prev, timerDuration } as GameSettingsType));
  };

  return (
    <div className='relative mx-auto p-6 bg-white dark:bg-emerald-800/30 shadow-lg rounded-lg min-h-screen pb-60'>
      <div>
        <h1 className='text-3xl font-bold text-center text-gray-900 dark:text-white mb-8'>
          Game Settings
        </h1>
        <div className='space-y-6'>
          <ProfessionSelect onSelect={handleProfessionSelect} />
          <LevelSelect onSelect={handleLevelSelect} />
          <TypeSelect onSelect={handleTypeSelect} />
          <div className='flex items-center space-x-4 h-[30px] justify-between flex-wrap'>
            <label className='cursor-pointer flex items-center space-x-2 text-gray-700 dark:text-emerald-100'>
              <Switch
                checked={gameSettings.timerEnabled}
                onCheckedChange={(checked) => handleEnableTimer(checked)}
              />
              <span>Enable Timer</span>
            </label>
            {gameSettings.timerEnabled && (
              <div className='flex items-center space-x-2 text-gray-700 dark:text-emerald-100'>
                <input
                  type='number'
                  value={gameSettings.timerDuration}
                  onChange={(e) => handleTimerDuration(Number(e.target.value))}
                  className='w-16 px-1 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-700/50 border border-emerald-200 dark:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  min='10'
                  max='300'
                />
                <span>secs</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='mt-8 text-center fixed right-0 bottom-4 w-full'>
        <button
          onClick={handleStartGame}
          className='px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors'
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
