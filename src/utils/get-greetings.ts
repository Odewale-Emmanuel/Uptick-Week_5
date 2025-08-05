function getGreeting(date: Date): string {
  // Convert the date to UTC to ignore the local timezone
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

export { getGreeting };
