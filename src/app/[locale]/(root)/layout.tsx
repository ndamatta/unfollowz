import { Header } from '@/src/components/Header';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className='min-h-screen bg-slate-500 text-white pt-10'>
      <Header />

      <main className='container mx-auto'>{children}</main>
    </div>
  );
}