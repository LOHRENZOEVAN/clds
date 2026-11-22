'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { TeamMember } from '@/types';
import { getTeam } from '@/lib/data-service';
import { Users, Mail, MapPin, Sparkles, Building2 } from 'lucide-react';

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getTeam();
      setTeam(data);
      setLoading(false);
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
                <span>Leadership &amp; Researchers</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Our Team &amp; Collaborators
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Meet the Cameroonian linguists, community elders, digital archivists, and student researchers 
                driving sustainable language preservation in Bamenda and across the country.
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
                  <div className="relative h-64 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={member.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
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

            {/* Advisory & Community Elders Note */}
            <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200/80 max-w-4xl mx-auto space-y-3 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900">
                Community Language Elders &amp; Village Custodians
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In addition to our resident linguistic researchers, CLDS works in close consultation with traditional village councils, 
                women artisan collectives, and elder storytellers across Mezam, Boyo, Donga-Mantung, Menchum, and surrounding divisions. 
                They are the principal custodians and arbiters of indigenous cultural knowledge.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

