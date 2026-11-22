'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  FolderGit2, 
  FileDown, 
  Link2, 
  Users, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ShieldCheck, 
  Database,
  Menu,
  X,
  UploadCloud,
  CheckCircle2,
  CalendarDays,
  Lock,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { getFirebaseStatus, checkAdminSession, setAdminSession } from '@/lib/data-service';
import { FirebaseConfigStatus } from '@/types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fbStatus, setFbStatus] = useState<FirebaseConfigStatus | null>(null);

  useEffect(() => {
    setIsAuthenticated(checkAdminSession());
    setFbStatus(getFirebaseStatus());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin passcode: clds-bamenda-2026 or username 'admin'
    const valid = 
      (usernameInput.toLowerCase() === 'admin' && passwordInput === 'clds-bamenda-2026') ||
      passwordInput === 'clds-bamenda-2026';

    if (valid) {
      setAdminSession(true);
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials. Please check your username and password.');
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
  };

  // Loading check state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-emerald-400 font-semibold text-sm animate-pulse flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span>Verifying administrator credentials...</span>
        </div>
      </div>
    );
  }

  // If NOT authenticated: show private login gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="relative w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-emerald-50 border border-emerald-200 p-2 shadow-xs">
              <Image src="/images/logo.png" alt="CLDS Logo" fill sizes="64px" className="object-contain" priority />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              CLDS Administration Gate
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Centre for Language Documentation &amp; Sustainability &bull; Bamenda
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                placeholder="admin"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password / Master Passcode
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                placeholder="••••••••••••"
                autoComplete="current-password"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Default key: <code>clds-bamenda-2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Sign In to Admin Panel</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-emerald-700 transition-colors">
              &larr; Return to Public Website
            </Link>
          </div>

        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Resources & Documents', href: '/admin/resources', icon: FileDown },
    { name: 'Language Projects', href: '/admin/documentation', icon: FolderGit2 },
    { name: 'Events & Workshops', href: '/admin/events', icon: CalendarDays },
    { name: 'External Links & Archives', href: '/admin/links', icon: Link2 },
    { name: 'Team Members', href: '/admin/team', icon: Users },
    { name: 'Firebase & Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      
      {/* Mobile Header */}
      <div className="lg:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-1">
            <Image src="/images/logo.png" alt="CLDS" fill sizes="32px" className="object-contain" />
          </div>
          <span className="font-bold text-sm">CLDS Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white/10 p-1 border border-emerald-500/30 flex-shrink-0">
              <Image src="/images/logo.png" alt="CLDS" fill sizes="44px" className="object-contain" priority />
            </div>
            <div>
              <span className="font-extrabold text-white text-base block leading-tight">
                CLDS Admin
              </span>
              <span className="text-[11px] text-emerald-400 font-medium block">
                Centre Management
              </span>
              <span className="text-[10px] text-slate-500">
                Bamenda &bull; Cameroon
              </span>
            </div>
          </div>

          {/* Firebase Connection Status Indicator */}
          <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-900/60">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Storage Engine:</span>
              {fbStatus?.isConfigured ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Firebase Live</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400" title="Running in persistent local mode until Firebase keys are entered">
                  <Database className="w-3 h-3" />
                  <span>Local Dev Mode</span>
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <span>Sign Out Admin</span>
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200/90 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              CLDS Management Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Centre for Language Documentation and Sustainability &bull; Bamenda, Cameroon
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Public Website</span>
            </Link>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
