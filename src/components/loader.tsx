import { LoaderIcon } from "lucide-react";
import type { JSX } from "react";
import { cn } from "@/utils/cn";

function Loading({
  message,
  className,
  iconSize,
}: {
  message?: string;
  className?: string;
  iconSize?: number;
}): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full text-gray-800",
        className
      )}
    >
      <span className="inline-flex flex-col items-center gap-1">
        <LoaderIcon
          size={iconSize || 30}
          className="animate-spin text-black dark:text-white"
        />
        {message && (
          <span className="text-gray-700 dark:text-gray-500 text-sm">
            {message}
          </span>
        )}
      </span>
    </div>
  );
}

export { Loading };
