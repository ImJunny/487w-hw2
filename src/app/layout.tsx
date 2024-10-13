import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "487w Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-stone-900">
        <div>{children}</div>
      </body>
    </html>
  );
}
