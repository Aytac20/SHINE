export const dynamic = "force-dynamic";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative'>
      <header className='relative mb-14'>
        <Navbar />
      </header>
      <main className='mb-[2rem] pt-20 lg:pt-12'>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
