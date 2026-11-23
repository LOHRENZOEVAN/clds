'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { 
  FileDown, 
  FileText, 
  FolderGit2, 
  Link2, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  UploadCloud,
  Database,
  ExternalLink,
  BookOpen,
  CalendarDays
} from 'lucide-react';
import { 
  getPosts, 
  getPublications, 
  getProjects, 
  getEvents,
  getLinks, 
  getFirebaseStatus 
} from '@/lib/data-service';
import { Post, Publication, DocumentationProject, CldsEvent, ExternalLink as ExtLinkType, FirebaseConfigStatus } from '@/types';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [projects, setProjects] = useState<DocumentationProject[]>([]);
  const [events, setEvents] = useState<CldsEvent[]>([]);
  const [links, setLinks] = useState<ExtLinkType[]>([]);
  const [fbStatus, setFbStatus] = useState<FirebaseConfigStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [pData, pubData, projData, evData, lData] = await Promise.all([
        getPosts(),
        getPublications(),
        getProjects(),
        getEvents(),
        getLinks(),
      ]);
      setPosts(pData);
      setPublications(pubData);
      setProjects(projData);
      setEvents(evData);
      setLinks(lData);
      setFbStatus(getFirebaseStatus());
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Welcome and Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Administrative Control Center
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Welcome to CLDS Administration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              Manage research publications, upload PDFs and documents, publish events, 
              curate language projects, and configure Firebase Cloud Storage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/resources"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Resource Document</span>
            </Link>
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-all shadow-xs"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
            <Link
              href="/admin/documentation"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </Link>
          </div>
        </div>

        {/* Firebase Cloud Storage and Database Status Box */}
        <div className={`p-6 rounded-3xl border ${
          fbStatus?.isConfigured 
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
            : 'bg-amber-50/80 border-amber-200 text-amber-950'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                fbStatus?.isConfigured ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
              }`}>
                {fbStatus?.isConfigured ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                ) : (
                  <Database className="w-5 h-5 text-amber-800" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm">
                  {fbStatus?.isConfigured 
                    ? `Firebase Connected (Project ID: ${fbStatus.projectId})` 
                    : 'Storage Mode: Local Persistent Store Active'}
                </h3>
                <p className="text-xs opacity-90 leading-relaxed max-w-3xl">
                  {fbStatus?.isConfigured
                    ? 'Documents and PDFs are saved to Firebase Storage and metadata is synchronised with Cloud Firestore.'
                    : 'You can create, edit, upload, and test documents right now! All changes persist locally. To connect your live Firebase project (Firestore and Storage), navigate to Firebase and Settings or add your credentials to .env.local.'}
                </p>
              </div>
            </div>

            <Link
              href="/admin/settings"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 ${
                fbStatus?.isConfigured
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              Configure Firebase
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Resources and Documents */}
          <Link
            href="/admin/resources"
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <FileDown className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {publications.length}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Resources and Documents</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Research papers, grammars</p>
            </div>
          </Link>

          {/* Card 2: Language Projects */}
          <Link
            href="/admin/documentation"
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {projects.length}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Language Projects</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Grassfields and Cameroon</p>
            </div>
          </Link>

          {/* Card 3: Events and Clinics */}
          <Link
            href="/admin/events"
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <CalendarDays className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {events.length}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">Events</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Clinics, symposia, IDIL</p>
            </div>
          </Link>

          {/* Card 4: Links and Partners */}
          <Link
            href="/admin/links"
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Link2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                {links.length}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs">External Links</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">SIL, ELDP, ELAR, UBa</p>
            </div>
          </Link>

        </div>

        {/* Recent Items Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Publications */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm">Recent Resources and Documents</h3>
              </div>
              <Link href="/admin/resources" className="text-xs text-emerald-700 font-semibold hover:underline">
                Manage All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {publications.slice(0, 4).map((pub) => (
                <div key={pub.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="space-y-0.5 max-w-[75%]">
                    <p className="font-bold text-slate-900 truncate">{pub.title}</p>
                    <p className="text-[11px] text-slate-500">{pub.type} &bull; {pub.year}</p>
                  </div>
                  {pub.downloadUrl ? (
                    <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      PDF Ready
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Link</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">Upcoming Events</h3>
              </div>
              <Link href="/admin/events" className="text-xs text-emerald-700 font-semibold hover:underline">
                Manage All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {events.slice(0, 4).map((ev) => (
                <div key={ev.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <div className="space-y-0.5 max-w-[75%]">
                    <p className="font-bold text-slate-900 truncate">{ev.title}</p>
                    <p className="text-[11px] text-slate-500">{ev.eventType} &bull; {ev.startDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md font-semibold text-[10px] ${
                    ev.isUpcoming ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {ev.isUpcoming ? 'Upcoming' : 'Past'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
