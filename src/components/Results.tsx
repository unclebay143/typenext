import { GameResult } from "@/types";

interface ResultsProps {
  result: GameResult;
  onPlayAgain: () => void;
  onShowLeaderboard: () => void;
}

export default function Results({
  result,
  onPlayAgain,
  onShowLeaderboard,
}: ResultsProps) {
  return (
    <div className='space-y-4 pt-6'>
      <h2 className='text-2xl font-semibold'>Your Result</h2>
      <div className='p-4 bg-gray-100 dark:bg-gray-700 rounded'>
        <p>Profession: {result.profession}</p>
        <p>Level: {result.level}</p>
        <p>Characters: {result.character}</p>
        <p>Words per minute: {result.wpm}</p>
        <p>Accuracy: {result.accuracy}%</p>
      </div>
      <div className='flex space-x-4'>
        <button
          onClick={onPlayAgain}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
        >
          Play Again
        </button>
        <button
          onClick={onShowLeaderboard}
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'
        >
          Show Leaderboard
        </button>
      </div>
    </div>
  );
}
