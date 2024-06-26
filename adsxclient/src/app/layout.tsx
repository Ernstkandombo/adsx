import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import { AuthProvider } from "./context/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdsX",
  description: "Best Ad Network",
};

export default function RootLayout({
  children, paeProps 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
      <body className={inter.className}>
      {children}
      </body>
      <Toaster richColors />
    </html>
    </AuthProvider>
    
  );
}
