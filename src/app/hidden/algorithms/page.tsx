import type { Metadata } from "next";
import { AlgorithmsPage } from "@/components/lab/Pages";

export const metadata: Metadata = { title: "Sorting algorithms", robots: { index: false, follow: false } };

export default function Page() {
  return <AlgorithmsPage />;
}
