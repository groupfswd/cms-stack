import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baby Wonder",
  description: "Baby Wonder",
  icons: {
    icon: ['/icon.svg?v=4'],
    apple: ['/icon.svg?v=4'],
    shorcut: ['/icon.svg'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className = "flex flex-col h-screen justify-between" >
          <Navbar />
          <div>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
