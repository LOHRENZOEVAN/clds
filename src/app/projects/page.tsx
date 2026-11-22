'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { DocumentationProject } from '@/types';
import { getProjects } from '@/lib/data-service';
import { 
  FolderGit2, 
  Search, 
  MapPin, 
  Mic, 
  Video, 
  FileText, 
  Filter, 
  ArrowRight,
  Globe2
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<DocumentationProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.languageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.alternateNames && p.alternateNames.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fieldwork Collections &amp; Research</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Language Documentation Projects
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Explore our ongoing and completed documentation projects across the North West Region and other linguistic zones of Cameroon. 
                All recordings and manuscripts are preserved with community-centered custodianship.
              </p>
            </div>
          </div>
        </section>

        {/* Directory & Filters */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Search and Filter Controls */}
            <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/90 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by language, region, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 pl-1">
                  <Filter className="w-3 h-3" />
                  <span>Status:</span>
                </span>
                {['All', 'Active', 'Community In-Progress', 'Completed'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedStatus === status
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

            </div>

            {/* Results Grid */}
            {filtered.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                <FolderGit2 className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No language projects match your criteria</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search terms or clearing the status filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('All');
                  }}
                  className="mt-2 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((proj) => (
                  <div
                    key={proj.id}
                    className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all group"
                  >
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={proj.coverImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'}
                        alt={proj.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-xs ${
                          proj.status === 'Active'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}>
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-1">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{proj.region}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                          {proj.title}
                        </h3>

                        <div className="mt-1 text-xs text-slate-600">
                          Language: <strong className="text-slate-900">{proj.languageName}</strong>
                          {proj.alternateNames && proj.alternateNames.length > 0 && (
                            <span className="text-slate-400 italic"> ({proj.alternateNames.join(', ')})</span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                          {proj.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="text-[11px] text-slate-500">
                            Affiliation: <span className="font-medium text-slate-700">{proj.geneticAffiliation.split(',').pop()?.trim()}</span>
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-700">
                            Est. {proj.startedYear}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2.5 text-xs text-slate-500">
                            {proj.mediaCount?.audioHours && (
                              <span className="flex items-center gap-1" title="Recorded Audio">
                                <Mic className="w-3 h-3 text-emerald-600" />
                                <span>{proj.mediaCount.audioHours}h</span>
                              </span>
                            )}
                            {proj.mediaCount?.videoHours && (
                              <span className="flex items-center gap-1" title="Recorded Video">
                                <Video className="w-3 h-3 text-blue-600" />
                                <span>{proj.mediaCount.videoHours}h</span>
                              </span>
                            )}
                            {proj.mediaCount?.textPages && (
                              <span className="flex items-center gap-1" title="Transcribed Pages">
                                <FileText className="w-3 h-3 text-amber-600" />
                                <span>{proj.mediaCount.textPages}p</span>
                              </span>
                            )}
                          </div>

                          <Link
                            href={`/projects/${proj.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                          >
                            <span>Archive Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

