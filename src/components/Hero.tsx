import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FolderGit2, CalendarDays } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-20 lg:py-28">
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Top Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Centre for Language Documentation and Sustainability
            </h1>

            {/* Second Mission directly after top heading */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Documenting languages. Sustaining linguistic futures.
            </p>

            {/* Mission statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              We undertake research, documentation, archiving, revitalisation, training, and community-led language initiatives with the aim of creating conditions for languages to remain viable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 transition-all cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Explore Language Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <CalendarDays className="w-4 h-4 text-teal-400" />
                <span>Upcoming Events</span>
              </Link>

              <Link
                href="/about/what-we-do"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
              >
                <span>About</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual Card / Logo Spotlight */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/20 shadow-2xl backdrop-blur-xl group hover:border-emerald-500/40 transition-colors">
              <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl bg-gradient-to-tr from-emerald-950/80 to-slate-800/80 p-4 border border-emerald-400/20 shadow-inner flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Centre for Language Documentation and Sustainability (CLDS)"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-contain p-2 filter drop-shadow-[0_10px_20px_rgba(16,185,129,0.25)]"
                  priority
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="font-bold text-lg text-white">
                  Centre for Language Documentation &amp; Sustainability
                </h3>
                <p className="text-xs text-emerald-400 font-medium mt-1">
                  Cameroon
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
