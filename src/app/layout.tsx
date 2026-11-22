import type { Metadata } from "next";
import "./compiled-tailwind.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centre for Language Documentation and Sustainability (CLDS) - Bamenda, Cameroon",
  description:
    "Documenting languages. Sustaining linguistic futures. Empowering Cameroonian communities to preserve, document, and archive indigenous languages and cultural heritage.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
