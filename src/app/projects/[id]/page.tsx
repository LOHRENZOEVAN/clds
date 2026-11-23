import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/data-service';
import { 
  FolderGit2, 
  MapPin, 
  Mic, 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  ArrowLeft, 
  Database
} from 'lucide-react';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-700 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Language Projects</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
            {project.coverImage && (
              <div className="relative h-64 sm:h-80 w-full bg-slate-100">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-md ${
                    project.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 sm:p-10 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>{project.region}</span>
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Initiated in {project.startedYear}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {project.title}
                </h1>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-emerald-900">
                  <div>
                    <strong>Primary Language:</strong> {project.languageName}
                  </div>
                  {project.alternateNames && project.alternateNames.length > 0 && (
                    <div>
                      <strong>Alternate Names:</strong> {project.alternateNames.join(', ')}
                    </div>
                  )}
                  <div>
                    <strong>Genetic Classification:</strong> {project.geneticAffiliation}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Project Description and Objectives
                </h2>
                <p className="leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Media Statistics */}
              {project.mediaCount && (
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Documented Media Metrics
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                      <Mic className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-slate-900">{project.mediaCount.audioHours || 0} hrs</div>
                      <div className="text-[11px] text-slate-500 font-medium">Digital Audio</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                      <Video className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-slate-900">{project.mediaCount.videoHours || 0} hrs</div>
                      <div className="text-[11px] text-slate-500 font-medium">Video Footage</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                      <FileText className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-slate-900">{project.mediaCount.textPages || 0} pgs</div>
                      <div className="text-[11px] text-slate-500 font-medium">Annotations and Text</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Research Team and Consultants */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lead Fieldwork Researcher</span>
                  </h4>
                  <p className="text-sm font-semibold text-slate-900">
                    {project.leadResearcher}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Community Language Consultants</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {project.communityConsultants.map((c, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Archival Custodianship Statement */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Database className="w-4 h-4" />
                  <span>Archival Custodianship and Access</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Repository: <strong>{project.archiveRepository || 'CLDS Bamenda Local Archive'}</strong>. 
                  In accordance with the CLDS charter, all raw audio, processed ELAN annotations, and metadata dictionaries 
                  remain permanently accessible to native speakers and local schools in Cameroon.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

