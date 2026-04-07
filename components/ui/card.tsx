import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "card-surface rounded-2xl border text-foreground",
        className,
      )}
      {...props}
    />
  );
}
