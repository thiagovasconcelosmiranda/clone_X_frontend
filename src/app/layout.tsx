import type { Metadata } from "next";
import "./globals.css";
import  {UserContextProvider}  from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Z",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
