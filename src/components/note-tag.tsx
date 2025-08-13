import type { JSX } from "react";
import { cn } from "@/utils/cn";

export function Tag({
  name,
  className,
}: {
  name: string;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={cn(
        "inline-block px-2 py-1 bg-[#fafafa] border dark:bg-white/5 text-gray-600 dark:text-amber-50 rounded-sm",
        className
      )}
    >
      {name}
    </span>
  );
}
