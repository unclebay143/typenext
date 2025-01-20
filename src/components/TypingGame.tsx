import {
  useState,
  useEffect,
  useCallback,
  useRef,
  ClipboardEvent,
} from "react";
import { Profession, Level, GameResult } from "@/types";
import { gameTexts } from "../data/mockData";

interface TypingGameProps {
  profession: Profession;
  level: Level;
  timerEnabled: boolean;
  timerDuration: number;
  duration: "short" | "long";
  onComplete: (result: GameResult) => void;
}

export default function TypingGame({
  profession,
  level,
  timerEnabled,
  timerDuration,
  duration,
  onComplete,
}: TypingGameProps) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [errors, setErrors] = useState<number[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  function getRandomText(textArray: string[]) {
    const randomIndex = Math.floor(Math.random() * textArray.length);
    return textArray[randomIndex];
  }

  useEffect(() => {
    const gameText = gameTexts.find(
      (t) =>
        t.profession === profession &&
        t.level === level &&
        t.duration === duration
    );

    if (gameText) {
      const randomText = getRandomText(gameText.text);
      setText(randomText);
    }
  }, [profession, level, duration]);

  useEffect(() => {
    if (timerEnabled && startTime) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setEndTime(Date.now());
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timerEnabled, startTime]);

  const calculateSpeed = useCallback(() => {
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
      const wordsTyped = input.trim().split(/\s+/).length;
      return Math.round(wordsTyped / timeElapsed);
    }
    return 0;
  }, [input, startTime]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInput(value);

      if (!startTime) {
        setStartTime(Date.now());
      }

      const newErrors = [];
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== text[i]) {
          newErrors.push(i);
          if (audioRef.current) {
            audioRef.current.play();
          }
          inputRef.current?.classList.add("shake");
          setTimeout(() => {
            inputRef.current?.classList.remove("shake");
          }, 500);
        }
      }

      setErrors(newErrors);
      setCurrentSpeed(calculateSpeed());

      if (value === text || (timerEnabled && timeLeft === 0)) {
        setEndTime(Date.now());
      }
    },
    [startTime, calculateSpeed, text, timerEnabled, timeLeft]
  );

  useEffect(() => {
    if (endTime && startTime) {
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsTyped = input.split(" ").length;
      const wpm = Math.round(wordsTyped / timeInMinutes);
      const accuracy = Math.round(
        ((text.length - errors.length) / text.length) * 100
      );

      onComplete({
        profession,
        level,
        wpm,
        accuracy,
        character: text.length,
      });
    }
  }, [endTime, startTime, text, input, errors, profession, level, onComplete]);

  const renderText = () => {
    if (profession === "programmer") {
      return (
        <pre className='p-4 bg-gray-100 dark:bg-gray-800 rounded overflow-x-auto whitespace-pre-wrap'>
          {text.split("\n").map((line, lineIndex) => (
            <div key={lineIndex}>
              {line.split("").map((char, charIndex) => {
                const absoluteIndex =
                  text.split("\n").slice(0, lineIndex).join("\n").length +
                  charIndex +
                  lineIndex;
                return (
                  <span
                    key={absoluteIndex}
                    className={`${
                      absoluteIndex < input.length
                        ? input[absoluteIndex] === char
                          ? "text-green-500"
                          : "text-red-500"
                        : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </pre>
      );
    } else {
      return (
        <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded'>
          {text.split("").map((char, index) => (
            <span
              key={index}
              className={`${
                index < input.length
                  ? input[index] === char
                    ? "text-green-500"
                    : "text-red-500"
                  : ""
              }`}
            >
              {char}
            </span>
          ))}
        </div>
      );
    }
  };

  const preventCopyPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  return (
    <div className='space-y-4 p-6'>
      <div className=''>
        {timerEnabled && (
          <div
            className={`text-lg font-semibold text-right text-zinc-700 ${
              timeLeft <= 10 && "text-red-500"
            }`}
          >
            Time left: {timeLeft} seconds
          </div>
        )}
      </div>
      <div className='flex justify-between items-center'>
        {/* <h2 className='text-sm font-semibold'>Type the following text</h2> */}
        <h2 className='text-sm font-semibold capitalize text-zinc-600 dark:text-zinc-300'>
          {profession}
          <span className='mx-1'>&middot;</span>
          {level}
        </h2>
        <span className='text-xl font-semibold text-zinc-600 dark:text-zinc-300'>
          {currentSpeed} WPM
        </span>
      </div>
      {renderText()}
      <textarea
        onPaste={(e) => preventCopyPaste(e)}
        ref={inputRef}
        className='w-full p-2 border dark:border-emerald-800 rounded bg-white dark:bg-gray-600 text-black dark:text-white'
        value={input}
        onChange={handleInputChange}
        rows={5}
        disabled={endTime !== null}
      />
      {/* Todo: find error sound to add here */}
      {/* <audio ref={audioRef} src='/error.mp3' /> */}
    </div>
  );
}
