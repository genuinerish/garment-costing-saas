import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Garment Costing Pro - Quotation & Tech Pack Suite",
  description: "Enterprise Textile Costing, Consumption & Multi-Currency Quotation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome Icons CDN: Required for table action buttons, plus/minus, and icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}