import NavBar from "./_components/NavBar";

import Error from "./error";
import "./globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Planner",
  description: "The Social Media Campaign mastering tool.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-orange-50 text-primary-50`}>
        <NavBar />
        <main className="mx-auto my-0 ">{children}</main>
      </body>
    </html>
  );
}
