import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand and Literature Summary */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 p-1 border border-emerald-500/30 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="CLDS Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white block">CLDS</span>
                <span className="text-xs text-emerald-400 font-medium block">
                  Centre for Language Documentation and Sustainability
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 italic font-serif">
              &ldquo;Documenting languages. Sustaining linguistic futures.&rdquo;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Cameroon is a linguistically diverse nation with over 280 indigenous languages.
              CLDS is dedicated to community-centred, grassroots documentation, preparing
              local youth and scholars to lead decisions regarding their ancestral tongues and cultural heritage.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Bamenda, North West Region, Republic of Cameroon</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>contact@clds-cameroon.org / director@clds-cameroon.org</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Main Menu
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about/what-we-do" className="hover:text-white transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Work and Programs */}
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Work and Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Language Projects
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Resources and Documents
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Partners and Links */}
          <div>
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4">
              Collaborations
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a
                  href="https://www.silcam.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>SIL Cameroon</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.eldp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>ELDP Programme</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.elararchive.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Endangered Languages Archive</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://dobes.mpi.nl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>DOBES Archive</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="block text-slate-500 pt-1">

                </span>
              </li>
              <li>
                <span className="block text-slate-500">

                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Centre for Language Documentation and Sustainability (CLDS). Bamenda, Cameroon.
          </p>
          <p className="text-slate-400">
            Sustaining mother tongues with community custodianship
          </p>
        </div>
      </div>
    </footer>
  );
}
