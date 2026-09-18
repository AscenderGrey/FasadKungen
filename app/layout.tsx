import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FasadKungen Sverige AB | Fasad- och rivningsarbeten",
  description: "Fasadtvätt, blästring, sanering och grovarbeten i Stockholm, Uppsala och hela Sverige.",
  openGraph: {
    title: "FasadKungen Sverige AB",
    description: "Vi kör och ni blir nöjda. Rock n roll.",
    type: "website",
    locale: "sv_SE"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="sv"><body>{children}</body></html>;
}
