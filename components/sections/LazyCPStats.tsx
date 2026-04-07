"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const CPStats = dynamic(
  () =>
    import("@/components/sections/CPStats").then((mod) => ({
      default: mod.CPStats,
    })),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: false,
  },
);

export function LazyCPStats() {
  return <CPStats />;
}
