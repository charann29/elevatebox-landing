"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function OldLink() {
  const c = useSearchParams().get("c");
  const router = useRouter();
  useEffect(() => router.replace(c ? `/proposals/company/${encodeURIComponent(c)}` : "/proposals"), [c, router]);
  return null;
}
