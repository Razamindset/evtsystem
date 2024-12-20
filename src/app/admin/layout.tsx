import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | APS&Cs EVTS",
  description: "E voting system for APS&CS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
