import GNB from "@/components/gnb";
import "./globals.css";
import { GoogleSessionProvider } from "@/context/google-session-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full bg-blue-400">
        <GoogleSessionProvider>
          <GNB />
          <div className="mt-16">{children}</div>
        </GoogleSessionProvider>
      </body>
    </html>
  );
}
