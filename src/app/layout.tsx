
import "./globals.css";
import { Providers } from "./provider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
