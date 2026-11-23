'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { getTeam } from '@/lib/data-service';
import { INITIAL_TEAM } from '@/lib/mock-data';
import { Users, Mail, MapPin, Sparkles, Building2 } from 'lucide-react';

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTeam();
        if (data && data.length > 0) {
          setTeam(data);
        }
      } catch (err) {
        console.warn('Error fetching team updates:', err);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Leadership and Researchers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Our Team
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Meet the Cameroonian team that runs this organization.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col group"
                >
                  <div className="relative h-64 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                    {member.avatarUrl ? (
                      <Image
                        src={member.avatarUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-emerald-950 text-white p-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/30 flex items-center justify-center text-2xl font-bold tracking-wider text-emerald-300 shadow-inner">
                          {member.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mt-3">
                          {member.role}
                        </span>
                        {member.affiliation && (
                          <span className="text-[11px] text-slate-400 mt-1">
                            {member.affiliation}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {member.name}
                      </h3>

                      <p className="text-xs font-semibold text-emerald-700 mt-1">
                        {member.role}
                      </p>

                      {member.affiliation && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                          <span>{member.affiliation}</span>
                        </div>
                      )}

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {member.email && (
                      <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate">{member.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Advisory and Community Elders Note */}
            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 max-w-4xl mx-auto space-y-3 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900">
                Community Language Elders and Village Custodians
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In addition to our resident linguistic researchers, CLDS works in close consultation with traditional village councils,
                arbiters of indigenous cultural knowledge.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

