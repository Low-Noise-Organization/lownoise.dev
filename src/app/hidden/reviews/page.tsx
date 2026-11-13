import type { Metadata } from "next";
import { ReviewsPage } from "@/components/lab/Pages";

export const metadata: Metadata = { title: "Reviews", robots: { index: false, follow: false } };

export default function Page() {
  return <ReviewsPage />;
}
