import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Kesayangan Bunda",
  description: "E-Commerce Kesayangan Bunda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
