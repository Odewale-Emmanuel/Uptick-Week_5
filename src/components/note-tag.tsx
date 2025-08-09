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
    <span className={cn("inline-block px-2.5 py-2 rounded-md", className)}>
      {name}
    </span>
  );
}
