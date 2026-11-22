'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CldsEvent } from '@/types';
import { getEvents } from '@/lib/data-service';
import { Calendar, MapPin, ArrowRight, Clock, Sparkles } from 'lucide-react';

export default function UpcomingEvents() {
  const [events, setEvents] = useState<CldsEvent[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getEvents();
      setEvents(data.filter(e => e.isUpcoming).slice(0, 3));
    }
    load();
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Training Clinics &amp; Gatherings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Events &amp; Workshops
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Capacity-building clinics, linguistic forums, and community archiving events hosted in Bamenda and regional centers.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-700 hover:underline"
          >
            <span>All Events &amp; Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all p-6 sm:p-7 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold uppercase tracking-wider text-[11px]">
                    {ev.eventType}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500 font-medium text-xs">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{ev.startDate}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/events/${ev.id}`}>
                    {ev.title}
                  </Link>
                </h3>

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

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[60%]">
                  {ev.organizer}
                </span>

                <Link
                  href={`/events/${ev.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

