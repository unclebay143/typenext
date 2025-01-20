import { useState } from "react";
import { Level } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LevelSelectProps {
  onSelect: (level: Level) => void;
}

export default function LevelSelect({ onSelect }: LevelSelectProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level>("intermediate");

  return (
    <div>
      <label
        htmlFor='level'
        className='block text-sm font-medium text-gray-700 dark:text-emerald-100 mb-2'
      >
        Level
      </label>
      <div>
        <Select
          defaultValue={selectedLevel}
          onValueChange={(level: Level) => {
            setSelectedLevel(level);
            if (onSelect) {
              onSelect(level);
            }
          }}
        >
          <SelectTrigger className='w-full border-0 dark:bg-emerald-900 h-11'>
            <SelectValue placeholder='Select level' />
          </SelectTrigger>
          <SelectContent>
            {(["beginner", "intermediate", "advanced"] as Level[]).map(
              (level) => (
                <SelectItem value={level} key={level}>
                  <span className='capitalize'>{level}</span>
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      {/* <div className='w-full hidden grid-cols-3 gap-4'>
        {(["beginner", "intermediate", "pro"] as Level[]).map((level) => (
          <button
            key={level}
            className={`p-4 rounded-lg ${
              selectedLevel === level
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-emerald-700 dark:hover:bg-emerald-700/70"
            }`}
            onClick={() => {
              setSelectedLevel(level);
              if (onSelect) {
                onSelect(level);
              }
            }}
          >
            <h3 className='font-semibold capitalize'>{level}</h3>
          </button>
        ))}
      </div> */}
    </div>
  );
}
