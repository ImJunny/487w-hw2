import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@supabase/supabase-js";

export const metadata: Metadata = {
  title: "487w Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <html lang="en">
      <body className="bg-stone-900">
        <div>{children}</div>
      </body>
    </html>
  );
}
