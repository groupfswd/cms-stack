import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "E-Commerce Kesayangan Bunda",
   description: "E-Commerce Kesayangan Bunda",
   icons: {
      icon: ['/favicon.ico?v=4'],
      apple: ['/apple-touch-icon.png?v=4'],
      shorcut: ['/apple-touch-icon.png'],
   }
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <div className="flex flex-col h-screen justify-between" >
               <Navbar />
               <div>{children}</div>
               <Toaster />
               <Footer />
            </div>
         </body>
      </html>
   );
}
