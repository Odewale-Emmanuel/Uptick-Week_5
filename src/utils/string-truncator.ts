function truncateString(
  input: string,
  count: number,
  by: "characters" | "words" = "characters"
): string {
  if (by === "characters") {
    return input.length > count ? input.substring(0, count) + "..." : input;
  } else {
    const words = input.split(" ");
    return words.length > count
      ? words.slice(0, count).join(" ") + "..."
      : input;
  }
}

export { truncateString };
