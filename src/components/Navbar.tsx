'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  FileText, 
  Users, 
  Sparkles, 
  Mail, 
  FolderGit2, 
  CalendarDays 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAboutDropdownOpen(false);
  }, [pathname]);

  const isAboutActive = pathname.startsWith('/about');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <Link 
            href="/" 
            className="flex items-center gap-3.5 group focus:outline-hidden focus:ring-2 focus:ring-emerald-600 rounded-lg p-1"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-emerald-50 border border-emerald-200 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image 
                src="/images/logo.png" 
                alt="CLDS Logo" 
                fill 
                sizes="48px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors">
                CLDS
              </span>
              <span className="text-xs font-medium text-emerald-700 hidden sm:inline-block leading-tight">
                Centre for Language Documentation &amp; Sustainability
              </span>
              <span className="text-[11px] text-slate-500 hidden md:inline-block">
                Cameroon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home */}
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname === '/' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* 2. About Dropdown (Overview, What we do, Our team, Contact us) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                aria-expanded={isAboutDropdownOpen}
                aria-haspopup="true"
                aria-controls="about-dropdown-menu"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  isAboutActive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                <span>About</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isAboutDropdownOpen ? 'rotate-180 text-emerald-700' : 'text-slate-400'
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isAboutDropdownOpen && (
                <div 
                  id="about-dropdown-menu"
                  className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150"
                >
                  <Link
                    href="/about/what-we-do"
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      pathname === '/about/what-we-do' 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="font-medium">What We Do</div>
                      <div className="text-xs text-slate-500">Fieldwork, training, archiving &amp; revitalisation</div>
                    </div>
                  </Link>

                  <Link
                    href="/about/team"
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      pathname === '/about/team' 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Our Team</div>
                      <div className="text-xs text-slate-500">Cameroonian linguists &amp; custodians</div>
                    </div>
                  </Link>

                  <Link
                    href="/about/contact"
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      pathname === '/about/contact' 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Contact Us</div>
                      <div className="text-xs text-slate-500">Bamenda office location &amp; inquiries</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Projects */}
            <Link
              href="/projects"
              aria-current={pathname.startsWith('/projects') || pathname.startsWith('/documentation') ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname.startsWith('/projects') || pathname.startsWith('/documentation')
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </Link>

            {/* 4. Resources */}
            <Link
              href="/resources"
              aria-current={pathname.startsWith('/resources') || pathname.startsWith('/publications') ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname.startsWith('/resources') || pathname.startsWith('/publications')
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Resources</span>
            </Link>

            {/* 5. Events */}
            <Link
              href="/events"
              aria-current={pathname.startsWith('/events') ? 'page' : undefined}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname.startsWith('/events')
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Events</span>
            </Link>
          </nav>

          {/* Mobile hamburger toggle (Admin link is completely private) */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden border-b border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-1.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
            
            {/* Home */}
            <Link
              href="/"
              className={`block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                pathname === '/' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* About Group */}
            <div className="pt-2 pb-1">
              <div className="px-3.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                About
              </div>
              <div className="mt-1 space-y-1 pl-2">
                <Link
                  href="/about/what-we-do"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === '/about/what-we-do' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  What We Do
                </Link>
                <Link
                  href="/about/team"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === '/about/team' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Our Team
                </Link>
                <Link
                  href="/about/contact"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === '/about/contact' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Projects */}
            <Link
              href="/projects"
              className={`block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                pathname.startsWith('/projects') || pathname.startsWith('/documentation') ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Language Projects &amp; Archives
            </Link>

            {/* Resources */}
            <Link
              href="/resources"
              className={`block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                pathname.startsWith('/resources') || pathname.startsWith('/publications') ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Resources &amp; Documents
            </Link>

            {/* Events */}
            <Link
              href="/events"
              className={`block px-3.5 py-2.5 rounded-xl text-base font-semibold ${
                pathname.startsWith('/events') ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Events &amp; Workshops
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
