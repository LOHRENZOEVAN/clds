'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CldsEvent } from '@/types';
import { getEvents } from '@/lib/data-service';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  Search, 
  Tag, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<CldsEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Upcoming' | 'Past'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.eventType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTiming =
      filterType === 'All'
        ? true
        : filterType === 'Upcoming'
        ? ev.isUpcoming
        : !ev.isUpcoming;

    return matchesSearch && matchesTiming;
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
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gatherings, Clinics &amp; Symposia</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Events &amp; Workshops
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Participate in language documentation clinics, FLEx annotation workshops, 
                community storytelling evenings, and international symposia held in Bamenda and across Cameroon.
              </p>
            </div>
          </div>
        </section>

        {/* Content & Filters */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter Bar */}
            <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/90 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events by title, topic, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                {(['All', 'Upcoming', 'Past'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilterType(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      filterType === tab
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {tab} Events
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            {filtered.length === 0 ? (
              <div className="p-16 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-300 space-y-3">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No events found matching your filter</h3>
                <p className="text-xs text-slate-500">
                  Try adjusting your search query or switching to All Events.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all group"
                  >
                    {ev.coverImage && (
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={ev.coverImage}
                          alt={ev.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-xs ${
                            ev.isUpcoming 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-slate-700 text-slate-200'
                          }`}>
                            {ev.isUpcoming ? 'Upcoming' : 'Past Event'}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                            {ev.eventType}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{ev.startDate} {ev.endDate ? `to ${ev.endDate}` : ''}</span>
                        </div>

                        <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                          <Link href={`/events/${ev.id}`}>
                            {ev.title}
                          </Link>
                        </h2>

                        <div className="flex items-start gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{ev.location}</span>
                        </div>

                        {ev.time && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{ev.time}</span>
                          </div>
                        )}

                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-1">
                          {ev.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 truncate max-w-[60%]">
                          {ev.organizer}
                        </span>

                        <Link
                          href={`/events/${ev.id}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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

