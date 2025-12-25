import SmoothScroll from "@/components/b/SmoothScroll";
import EditionSelector from "@/components/EditionSelector";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} font-sans antialiased`}
    >
      <EditionSelector />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </div>
  );
}

