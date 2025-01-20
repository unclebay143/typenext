import Link from "next/link";
import {
  Keyboard,
  Trophy,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Keyboard,
    title: "Professional Typing Scenarios",
    description: "Practice with real-world content tailored to your profession",
  },
  {
    icon: Trophy,
    title: "Track Your Progress",
    description: "Monitor your WPM and accuracy improvements over time",
  },
  {
    icon: Clock,
    title: "Flexible Practice Modes",
    description: "Choose between timed challenges or practice at your own pace",
  },
  {
    icon: Users,
    title: "Global Leaderboard",
    description: "Compete with other professionals worldwide",
  },
];

const faqs = [
  {
    question: "What makes TypeNext⚡ different?",
    answer:
      "TypeNext⚡ offers profession-specific typing practice with real-world content, making your practice sessions more relevant to your daily work.",
  },
  {
    question: "How does the scoring system work?",
    answer:
      "Your score is calculated based on both speed (WPM - Words Per Minute) and accuracy. The formula ensures a balanced evaluation of your typing skills.",
  },
  {
    question: "Can I practice without creating an account?",
    answer:
      "Yes! You can practice as a guest, but creating an account allows you to track your progress and compete on the leaderboard.",
  },
  {
    question: "Is TypeNext⚡ free to use?",
    answer:
      "Yes, TypeNext⚡ is completely free to use. Create an account to unlock all features and start improving your typing skills today.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className='py-20 px-4'>
        <div className='mx-auto text-center max-w-xl'>
          <h1 className='text-5xl leading-[1.2] font-bold mb-6 text-zinc-900 dark:text-white'>
            Master Your Professional Typing Skills
          </h1>
          <p className='text-xl mb-8 text-zinc-600 dark:text-emerald-100'>
            Improve your typing speed and accuracy with profession-specific
            practice texts. Built for modern professionals who want to enhance
            their productivity.
          </p>
          <div className='flex justify-center gap-4'>
            <Link
              href='/game-settings'
              className='flex items-center gap-1 px-6 py-3 bg-emerald-700 text-white dark:bg-white dark:text-emerald-900 rounded-lg font-semibold dark:hover:bg-white/90 transition-colors'
            >
              Start Practicing
              <Target />
            </Link>
            <Link
              href='/leaderboard'
              className='px-6 py-3 border dark:border-0 text-emerald-700 dark:bg-white/10 dark:text-white rounded-lg font-semibold hover:bg-white/20 transition-colors'
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-zinc-50 dark:bg-white/5'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12'>
            Features that Set Us Apart
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='p-6 rounded-lg bg-zinc-100 dark:bg-white/10 backdrop-blur-sm'
              >
                <feature.icon className='w-12 h-12 text-emerald-400 mb-4' />
                <h3 className='text-xl font-semibold text-zinc-900 dark:text-white mb-2'>
                  {feature.title}
                </h3>
                <p className='text-zinc-600 dark:text-white/80'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='pt-20 pb-24 px-4'>
        <div className='mx-auto max-w-[768px]'>
          <h2 className='text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <details
                key={index}
                className='group bg-white dark:bg-emerald-700/50 rounded-lg shadow-lg hover:shadow-xl transition-all'
              >
                <summary className='flex justify-between items-center cursor-pointer p-6'>
                  <h3 className='text-lg font-semibold text-zinc-900 dark:text-white'>
                    {faq.question}
                  </h3>
                  <ChevronDown className='w-5 h-5 text-emerald-600 dark:text-emerald-300 group-open:hidden' />
                  <ChevronUp className='w-5 h-5 text-emerald-600 dark:text-emerald-300 hidden group-open:block' />
                </summary>
                <div className='px-6 pb-6 text-zinc-600 dark:text-emerald-100'>
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
