import { format, isToday, isYesterday } from "date-fns";

export const lastSeen = (isoString: string): string => {
  const date = new Date(isoString); // Convert ISO string to Date object

  if (isToday(date)) {
    return `Today at ${format(date, "hh:mm a")}`; // Format as "Today at 03:30 pm"
  } else if (isYesterday(date)) {
    return `Yesterday at ${format(date, "hh:mm a")}`; // Format as "Yesterday at 03:30 pm"
  } else {
    return format(date, "dd/MM/yyyy"); // Format as "26/12/2024"
  }
};
