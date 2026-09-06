import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Loader } from "@/components/Loader";

export const metadata: Metadata = {
  title: "PRO HOME | Qurilish va sotuv platformasi",
  description:
    "Qurilish kompaniyangiz uchun sotuvni to'liq nazorat qiladigan professional platforma: CRM, call center integratsiyasi va rahbar uchun real vaqt dashboardi.",
  applicationName: "PRO HOME",
  icons: {
    icon: "/images/Logo.jpg",
    shortcut: "/images/Logo.jpg",
    apple: "/images/Logo.jpg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}
