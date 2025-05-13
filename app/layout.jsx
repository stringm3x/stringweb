import { Geist, Anton } from "next/font/google";
import { Providers } from "./provider";
import "./globals.css";
import Nav from "./Navbar";
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Spring",
  description: "El marketing que necesitas.",
  icons: {
    icon: "/ico.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${anton.variable}`}>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
