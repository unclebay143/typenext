import { useState } from "react";
import { Profession } from "@/types";

const professions: { type: Profession; description: string; emoji: string }[] =
  [
    {
      emoji: "💻👩‍💻",
      type: "programmer",
      description: "Code wizards who bring ideas to life through software.",
    },
    {
      emoji: "✍️📚",
      type: "technicalWriter",
      description: "Masters of clear and concise technical documentation.",
    },
    {
      emoji: "🎨🖌️",
      type: "designer",
      description: "Creative minds shaping visual and interactive experiences.",
    },
    {
      emoji: " 📊📈",
      type: "dataScientist",
      description: "Experts in analyzing and interpreting complex data sets.",
    },
    {
      emoji: "🔍🧠",
      type: "uxResearcher",
      description: "Investigators of user behavior and experience design.",
    },
    {
      emoji: "⚙️🖥️",
      type: "devOpsEngineer",
      description: "Bridging the gap between development and operations.",
    },
    {
      emoji: "🔒🛡️",
      type: "cybersecurityAnalyst",
      description: "Guardians of digital assets and network security.",
    },
    {
      emoji: "🌟🎯",
      type: "others",
      description: "",
    },
  ];

interface ProfessionSelectProps {
  onSelect: (profession: Profession) => void;
}

export default function ProfessionSelect({ onSelect }: ProfessionSelectProps) {
  const [selected, setSelected] = useState<Profession | null>(null);

  return (
    <div className='w-full'>
      <label
        htmlFor='profession'
        className='block text-sm font-medium text-gray-700 dark:text-emerald-100 mb-2'
      >
        Profession
      </label>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {professions.map(
          ({
            emoji,
            type,
            // , description
          }) => (
            <button
              key={type}
              className={`p-4 rounded-lg flex flex-col gap-1 ${
                selected === type
                  ? "bg-zinc-50/80 text-emerald-800"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-emerald-700 dark:hover:bg-emerald-700/70"
              }`}
              onClick={() => {
                setSelected(type);
                if (onSelect) {
                  onSelect(type);
                }
              }}
            >
              <span>{emoji}</span>
              <h3 className='font-semibold capitalize'>{type}</h3>
              {/* <span className='text-sm'>{description}</span> */}
            </button>
          )
        )}
      </div>
    </div>
  );
}
