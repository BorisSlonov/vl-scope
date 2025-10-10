import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Jost, Unbounded } from "next/font/google";
import { COLORS_ROOT_STYLE } from "@/shared/config/colors";
import { ModalProvider } from "./context/ModalContext";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import ViewportUnitsFix from "@/components/ViewportUnitsFix";

const jost = Jost({ subsets: ["latin", "cyrillic"], display: "swap" });
const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-unbounded",
});
export const metadata: Metadata = {
  title: "VIBRO-LASER INDICATOR — базовый комплект для центровки валов",
  description:
    "VIBRO-LASER INDICATOR — удобный и точный комплект для центровки валов с электронными индикаторами и встроенным инклинометром. В комплекте надёжный крепёж, датчики и приложение. Обучение, консультации и сервис.",
  openGraph: {
    title: "VIBRO-LASER INDICATOR — базовый комплект для центровки валов",
    description:
      "Комплект VIBRO-LASER INDICATOR — современное решение для центровки валов: электронные индикаторы, встроенный инклинометр, удобное приложение и всё для работы в одном кейсе. Обучение и поддержка инженеров.",
    type: "website",
    url: "https://vibro-laser.ru/",
    images: [
      {
        url: "https://vibro-laser.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VIBRO-LASER INDICATOR — комплект для центровки валов",
      },
    ],
  },
};

// Ensure mobile keyboards and browser UI resize the visual viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
  themeColor: "#040404",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style dangerouslySetInnerHTML={{ __html: COLORS_ROOT_STYLE }} />
      </head>
      <body
        className={`${jost.className} ${unbounded.variable}`}
        style={{
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          // Force light color-scheme to avoid iOS auto-dark adjustments
          colorScheme: "light",
        }}
      >
        {/* Global helpers: fixed viewport height + Lenis */}
        <ViewportUnitsFix />
        <SmoothScroll />
        <ModalProvider>
          <Header />
          {children}
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
