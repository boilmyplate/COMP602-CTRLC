import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./(contexts)/authContexts";
import Navbar from "./homepage/Components/navbar/Navbar";
import Footer from "./homepage/Components/footer/Footer";
import "@fortawesome/fontawesome-svg-core";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          <AuthProvider>{children}</AuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
