import Image from "next/image";

export default function CTA() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* logo */}
      <div className="mb-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          priority
        />
      </div>

      {/* title */}
      <h1 className="text-3xl md:text-5xl text-zinc-950 font-bold mb-4">
        unfollow<span className="font-sketch text-rose-400 text-7xl">z</span>
      </h1>

      {/* sub */}
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-2">
        Find who doesn't follow you back on Instagram
      </p>
      <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
        Open source. No login. No external apps. 
      </p>

      {/* button */}
      <button className="px-4 py-2 rounded-2xl bg-rose-400 text-slate-100 hover:scale-105 hover:text-zinc-950 hover:border-zinc-950 transition">
        Comenzar
      </button>
    </section>
  );
}