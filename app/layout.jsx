import { Geist, Anton, Ubuntu } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";
import Footer from "./footer";
import Header from "./header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton-sans",
  weight: "400",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu-sans",
  weight: "500",
  subsets: ["latin"],
});

export const metadata = {
  title: "String",
  description: "El marketing que necesitas.",
  icons: {
    icon: "/ico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${anton.variable} ${ubuntu.variable}`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
