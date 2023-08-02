import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "Smart and simple way to connect to people",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className="bg-gray-100 relative">
        <NavBar session={session} />
        <div className="max-w-7xl mx-auto mt-24">{children}</div>
      </body>
    </html>
  );
}
