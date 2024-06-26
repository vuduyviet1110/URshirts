import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import AuthContext from "@/context/AuthContext";
import getCurrentUser from "./(auth)/actions/getCurrentUser";
import ToastContext from "@/context/HotToastContext";
import CartContext from "@/context/CartContext";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const raleway = Raleway({ subsets: ["latin"], weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: "Urshirts",
  description: "E-commerce website for Urshirts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={raleway.className}>
      <AuthContext>
          <CartContext>
            <ToastContext />
            <div className="grainy-light">
              <Navbar user={user!} />
                <Providers>
                  {children}
                </Providers>
              <Footer />
            </div>
          </CartContext>
        </AuthContext>
        </body>
    </html>
  );
}
