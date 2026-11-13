import type { Metadata } from "next";
import Redirect from "@/components/Redirect";

export const metadata: Metadata = { title: "Redirecting…", robots: { index: false, follow: false } };

// Old address of a hidden page: static export has no server redirects, so this page forwards the visitor.
export default function Page() {
  return <Redirect to="/hidden/" />;
}
