import { useState } from "react";
import { Duration } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LevelSelectProps {
  onSelect: (type: Duration) => void;
}

export default function TypeSelect({ onSelect }: LevelSelectProps) {
  const [selectedType, setSelectedType] = useState<Duration>("short");

  return (
    <div>
      <label
        htmlFor='type'
        className='block text-sm font-medium text-gray-700 dark:text-emerald-100 mb-2'
      >
        Type
      </label>

      <Select
        defaultValue={selectedType}
        onValueChange={(level: Duration) => {
          setSelectedType(level);
          if (onSelect) {
            onSelect(level);
          }
        }}
      >
        <SelectTrigger className='w-full border-0 dark:bg-emerald-900 h-11'>
          <SelectValue placeholder='Select type' />
        </SelectTrigger>
        <SelectContent>
          {(["short", "long"] as Duration[]).map((level) => (
            <SelectItem value={level} key={level}>
              <span className='capitalize'>{level}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
