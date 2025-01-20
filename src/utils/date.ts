import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const getRelativeTimeFromNow = (
  date: Date
  //   options: { [key: string]: string }
) => {
  return dayjs().to(dayjs(date));
};
