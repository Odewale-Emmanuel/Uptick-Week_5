function getGreeting(date: Date): string {
  const hours = date.getUTCHours();

  if (hours >= 5 && hours < 12) {
    return "Good morning";
  } else if (hours >= 12 && hours < 17) {
    return "Good afternoon";
  } else if (hours >= 17 && hours < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

function dateToISO(date: Date = new Date()): string {
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function dateToDayMonth(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
  };
  return date.toLocaleDateString("en-GB", options).toUpperCase();
}

function dateWithTime(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-GB", options);
}

function getTimestamp(date: Date | string | number): number {
  return new Date(date).getTime();
}

export { getGreeting, dateToISO, dateWithTime, dateToDayMonth, getTimestamp };
