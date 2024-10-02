import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./MyComponents/Navbar";
import Footer from "./MyComponents/Footer";
import { AlertDialogDemo } from "./MyComponents/AlertDialog";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwasthSeva",
  description: "Your Health, Our Digital Care ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertDialogDemo />
        <div>
          <Navbar />
        <main>{children}</main>
        <div className="mt-14">
          <Footer />
        </div>
        </div>
        </body>
    </html>
  );
}
