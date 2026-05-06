import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-slate-100 text-zinc-950'>
      <Header />
      <main className="flex flex-col items-center">{children}</main>
      <Footer />
    </div>
  );
}