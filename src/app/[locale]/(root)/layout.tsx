import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className='min-h-screen bg-slate-100 text-zinc-950'>
      <Header />
      <main className='container mx-auto'>{children}</main>
      <Footer />
    </div>
  );
}