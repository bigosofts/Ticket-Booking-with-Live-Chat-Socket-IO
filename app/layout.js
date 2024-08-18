import "@/src/source/mdb.min.css";
import "../assets/css/font-awesome.min.css";
import { Inter } from "next/font/google";
import "animate.css";
import "./globals.css";
import "../assets/css/stylefront.css";
import "../Navigation/Nav.css";
import Providers from "./redux/provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Active Ascents",
  description: "We provide guide for your travel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
