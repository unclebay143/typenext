import { createClient } from "@/lib/supabase/server";
import { getRelativeTimeFromNow } from "@/utils/date";
import { handleRedirectUnAuthenticatedUser } from "@/utils/private";

const getUserResults = async () => {
  const supabase = createClient();
  const { data: userData } = await (await supabase).auth.getUser();

  const res = (await supabase)
    .from("results")
    .select()
    .eq("user", userData.user?.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data } = await res;
  return data;
};

export default async function UserResult() {
  const userResults = await getUserResults();
  await handleRedirectUnAuthenticatedUser();
  return (
    <div className='p-6 rounded-lg'>
      <h1 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
        Your results
      </h1>
      <div className='overflow-x-auto'>
        {!userResults ? (
          <div>
            Your game result histories will appear here when you start playing.
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='bg-emerald-100 dark:bg-emerald-700'>
                <th className='p-2 text-left text-gray-900 dark:text-emerald-100 rounded-tl'>
                  Profession
                </th>
                <th className='p-2 text-left text-gray-900 dark:text-emerald-100'>
                  Level
                </th>
                <th className='p-2 text-left text-gray-900 dark:text-emerald-100'>
                  WPM
                </th>
                <th className='p-2 text-left text-gray-900 dark:text-emerald-100'>
                  Accuracy
                </th>
                <th className='p-2 text-left text-gray-900 dark:text-emerald-100 rounded-tr'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {userResults?.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={
                    index % 2 === 0
                      ? "bg-emerald-50 dark:bg-emerald-800/50"
                      : ""
                  }
                >
                  <td className='p-2 text-gray-800 dark:text-emerald-100 capitalize'>
                    {entry.profession}
                  </td>
                  <td className='p-2 text-gray-800 dark:text-emerald-100'>
                    {entry.level}
                  </td>
                  <td className='p-2 text-gray-800 dark:text-emerald-100'>
                    {entry.wpm}
                  </td>
                  <td className='p-2 text-gray-800 dark:text-emerald-100'>
                    {entry.accuracy}%
                  </td>
                  <td className='p-2 text-gray-800 dark:text-emerald-100'>
                    {getRelativeTimeFromNow(entry.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(userResults?.length || 0) >= 20 && (
          <p className='text-center py-6 text-sm'>Showing 20 recent data.</p>
        )}
      </div>
    </div>
  );
}
