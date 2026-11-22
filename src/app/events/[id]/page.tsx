import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEvent } from '@/lib/data-service';
import { Calendar, MapPin, Clock, Users, ArrowLeft, Send, ExternalLink } from 'lucide-react';

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ev = await getEvent(id);

  if (!ev) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 py-12 lg:py-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:text-emerald-700 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Events</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
            {ev.coverImage && (
              <div className="relative h-72 sm:h-96 w-full bg-slate-100">
                <Image
                  src={ev.coverImage}
                  alt={ev.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-md ${
                    ev.isUpcoming ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                  }`}>
                    {ev.isUpcoming ? 'Upcoming Event' : 'Past Event'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-8 sm:p-12 space-y-6">
              
              <div className="space-y-3">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  {ev.eventType}
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {ev.title}
                </h1>

                {/* Event Schedule Info Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Date</span>
                      <span>{ev.startDate} {ev.endDate ? `to ${ev.endDate}` : ''}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Time</span>
                      <span>{ev.time || 'Refer to program schedule'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-slate-900">Location</span>
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed italic pt-2">
                  {ev.summary}
                </p>
              </div>

              {/* Full Description */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-slate-100 pt-6">
                {ev.description}
              </div>

              {/* Registration / Attendance info */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Organized by: <strong className="text-slate-800">{ev.organizer}</strong>
                </div>

                {ev.registrationUrl && ev.isUpcoming && (
                  <a
                    href={ev.registrationUrl}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <span>Register / Participate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
}

