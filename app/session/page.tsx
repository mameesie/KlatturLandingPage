import type { Metadata } from "next";
import { buildPageMetadata } from "../seo";
import SessionPageClient from "./SessionPageClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Klattur session",
  description:
    "Start a guided Klattur session and work through a stressful thought step by step.",
  pathname: "/session",
});
export default function SessionPage() {
  return <SessionPageClient />;
}
