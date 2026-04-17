import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — YUKO",
  description:
    "Apply now to get matched with your Korean friend. Your Seoul starts here.",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
