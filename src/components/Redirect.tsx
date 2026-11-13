"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  useEffect(() => { window.location.replace(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${to}`); }, [to]);
  return (
    <main className="lab" style={{ display: "grid", placeItems: "center", padding: 24 }}>
      <p className="mono">→ <Link href={to}>{to}</Link></p>
    </main>
  );
}
