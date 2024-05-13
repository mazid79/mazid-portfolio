import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";

const urbanist = Urbanist({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description,
    // openGraph: {
    //   images: [settings.data.og_image?.url || ""],
    // },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gradient-to-r from-stone-900 to-neutral-800 text-slate-100">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/terrain.webp')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
        <video
          autoPlay
          loop
          muted
          className="absolute pointer-events-none inset-0 -z-40 w-full overflow-hidden h-full object-cover opacity-25"
          
        >
          <source src="/ray.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
