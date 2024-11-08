import GNB from "@/components/gnb";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full pt-8 bg-blue-400">
        <GNB />
        {children}
      </body>
    </html>
  );
}
