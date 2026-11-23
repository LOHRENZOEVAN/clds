'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DocumentationProject } from '@/types';
import { getProjects } from '@/lib/data-service';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { ArrowRight, FolderGit2, MapPin, Mic, Video, FileText } from 'lucide-react';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<DocumentationProject[]>(INITIAL_PROJECTS.slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProjects(data.slice(0, 3));
        }
      } catch (err) {
        console.warn('Error loading projects:', err);
      }
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Living Archives and Documentation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Language Projects
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Documenting grammatical structures, elder oral narratives, and botanical vocabularies in partnership with local speech communities.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all group"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
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

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{proj.region}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 mt-1">
                    Language: <span className="text-slate-800 font-semibold">{proj.languageName}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                {/* Media metadata tags */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    {proj.mediaCount?.audioHours && (
                      <span className="flex items-center gap-1" title="Audio hours">
                        <Mic className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{proj.mediaCount.audioHours}h</span>
                      </span>
                    )}
                    {proj.mediaCount?.videoHours && (
                      <span className="flex items-center gap-1" title="Video hours">
                        <Video className="w-3.5 h-3.5 text-blue-600" />
                        <span>{proj.mediaCount.videoHours}h</span>
                      </span>
                    )}
                    {proj.mediaCount?.textPages && (
                      <span className="flex items-center gap-1" title="Text pages">
                        <FileText className="w-3.5 h-3.5 text-amber-600" />
                        <span>{proj.mediaCount.textPages}p</span>
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/projects/${proj.id}`}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View Archive</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
