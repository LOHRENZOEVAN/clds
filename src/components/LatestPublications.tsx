'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Publication } from '@/types';
import { getPublications } from '@/lib/data-service';
import { FileText, Download, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';

export default function LatestPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getPublications();
      setPublications(data.slice(0, 3));
    }
    load();
  }, []);

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>Research and Archival Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Publications and Documents
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Grammar sketches, ethical fieldwork protocols, and policy papers prepared by Cameroonian researchers and partner institutions.
            </p>
          </div>

          <Link
            href="/publications"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline"
          >
            <span>Browse All Publications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                    {pub.type}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {pub.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                  {pub.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium line-clamp-1">
                  By {pub.authors.join(', ')}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {pub.abstract}
                </p>
              </div>

              {/* Download / Action Button */}
              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {pub.fileFormat || 'PDF'} {pub.fileSize ? `(${pub.fileSize})` : ''}
                </span>

                {pub.downloadUrl ? (
                  <a
                    href={pub.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                ) : pub.externalUrl ? (
                  <a
                    href={pub.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>View Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={`/publications#${pub.id}`}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Details &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

