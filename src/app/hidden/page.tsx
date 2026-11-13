import type { Metadata } from "next";
import { IndexPage } from "@/components/lab/Pages";

export const metadata: Metadata = { title: "Hidden pages", robots: { index: false, follow: false } };

export default function Page() {
  return <IndexPage />;
}
