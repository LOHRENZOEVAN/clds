'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Publication } from '@/types';
import { getPublications } from '@/lib/data-service';
import { 
  FileText, 
  Download, 
  Search, 
  ExternalLink, 
  Filter, 
  BookOpen, 
  Calendar, 
  Users, 
  Sparkles,
  FileDown
} from 'lucide-react';

export default function ResourcesPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPublications();
      setPublications(data);
      setLoading(false);
    }
    load();
  }, []);

  const types = ['All', 'Research Paper', 'Grammar Sketch', 'Dictionary', 'Report', 'Policy Brief', 'Documentation Guide'];

  const filtered = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pub.languageCovered && pub.languageCovered.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pub.keywords && pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType = selectedType === 'All' || pub.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Resources &amp; Documents</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Resources &amp; Documents
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Access research papers, grammatical descriptions, fieldwork manuals, dictionaries, and language archive documents 
                produced by the Centre for Language Documentation and Sustainability. Free to download for researchers and communities.
              </p>
            </div>
          </div>
        </section>

        {/* Directory Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Search and Filters */}
            <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/90 mb-10 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by title, author, keyword, language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                  />
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  Showing <strong>{filtered.length}</strong> resource{filtered.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Type Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 pl-1 flex-shrink-0">
                  <Filter className="w-3 h-3" />
                  <span>Format:</span>
                </span>
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedType === t
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No resources found</h3>
                <p className="text-xs text-slate-500">
                  Try clearing your search keyword or switching the resource format filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All');
                  }}
                  className="mt-2 px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 rounded-xl hover:bg-amber-100"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filtered.map((pub) => (
                  <div
                    key={pub.id}
                    id={pub.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-amber-300 transition-all flex flex-col md:flex-row justify-between gap-6"
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                          {pub.type}
                        </span>
                        <span className="text-slate-400">&bull;</span>
                        <span className="flex items-center gap-1 text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{pub.year}</span>
                        </span>
                        {pub.languageCovered && (
                          <>
                            <span className="text-slate-400">&bull;</span>
                            <span className="text-emerald-700 font-medium">
                              {pub.languageCovered}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {pub.title}
                      </h2>

                      <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Authors: {pub.authors.join(', ')}</span>
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {pub.abstract}
                      </p>

                      {/* Keywords */}
                      {pub.keywords && pub.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {pub.keywords.map((kw, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-md"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Download / Action Panel */}
                    <div className="md:w-60 flex-shrink-0 flex flex-col justify-center items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 space-y-3">
                      <div className="text-xs text-slate-500">
                        Format: <span className="font-semibold text-slate-800">{pub.fileFormat || 'PDF'}</span>
                        {pub.fileSize && <span> ({pub.fileSize})</span>}
                      </div>

                      {pub.downloadUrl && (
                        <a
                          href={pub.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download PDF</span>
                        </a>
                      )}

                      {pub.externalUrl && (
                        <a
                          href={pub.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          <span>External Repository</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Admin Upload Prompt */}
            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="text-base font-bold text-slate-900">Are you a CLDS Administrator or Researcher?</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload new research PDFs, grammatical sketches, or links via the dedicated Admin Panel.
                </p>
              </div>
              <Link
                href="/admin/resources"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Upload New Resource
              </Link>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

