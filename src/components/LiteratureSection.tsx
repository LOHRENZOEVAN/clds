import React from 'react';
import {
  Globe2,
  ShieldAlert,
  BookCheck,
  Quote,
  Sparkles
} from 'lucide-react';

export default function LiteratureSection() {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Why CLDS Was Established in Bamenda
          </h2>
          <p className="text-base sm:text-lg text-emerald-800 font-serif italic">
            &ldquo;Documenting languages. Sustaining linguistic futures.&rdquo;
          </p>
        </div>

        {/* Narrative Flow: 3 In-Depth Pillars with Exact Literature */}
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Paragraph 1 Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Linguistic Diversity and Indigenous Languages at Risk
                </h3>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Cameroon is a linguistically diverse country with more than 280 indigenous languages. As in many parts of the world, most of the Cameroonian languages are at risk of being silenced as younger generations shift towards more dominant languages like English and French, which are the official languages of Cameroon, and Fulfulde, Cameroon Pidgin, and Camfranglais, which are languages of wider communication in the country. There are nonetheless efforts to document and preserve some of the languages, some of which are grassroots, community-centred.
            </p>
          </div>

          {/* Paragraph 2 Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Outside-Led Archiving and The Accessibility Gap
                </h3>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Until now, the documentation and archiving of Cameroonian languages has mostly been led by outside linguists. Since 2006, the Endangered Languages Documentation Programme (ELDP) has funded 19 projects in Cameroon, and only half of these have been led by six Cameroonians. Also, the DOBES program, Documentation of Endangered Languages, funded three projects on Cameroonian languages led by European linguists and supported by Cameroonian counterparts. In both cases, the documented materials have been archived in Europe and, practically, are inaccessible to the Cameroonian communities whose languages have been documented. This has also been the case with projects funded by the US National Science Foundation to document Cameroonian languages.
            </p>
          </div>

          {/* Paragraph 3 Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                <BookCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Local Leadership, Equal Partnerships and Sustainable Programs
                </h3>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Over the years, departments of linguistics have been set up in Cameroonian universities, and many more Cameroonian youth have received fundamental training in linguistics. It is now possible to prepare them to do language documentation mainly by familiarizing them with documentation methods, techniques, and tools. For a country with so many languages and human resources, it seems reasonable to set up a centre that can equip Cameroonians with the ability to participate in decisions about the future of their languages and cultures. It is certainly the case that Cameroonians are better placed to make decisions about the documentation, description, and archiving of their languages and cultures. This way, it will become possible to build or forge equal partnerships with outside linguists and develop a sustainable program for the documentation of the languages and cultures of Cameroon. This model of documentation spearheaded by citizens of the target countries can eventually be expanded to other parts of Africa and even globally.
            </p>
          </div>

          {/* Prominent Editorial Quote Box */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <Quote className="w-8 h-8 opacity-80" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                Core Declaration of Sovereignty
              </span>
            </div>
            <blockquote className="text-lg sm:text-2xl font-serif italic text-slate-100 leading-relaxed">
              &ldquo;It is certainly the case that Cameroonians are better placed to make decisions about the documentation, description, and archiving of their languages and cultures. This model of documentation spearheaded by citizens of the target countries can eventually be expanded to other parts of Africa and even globally.&rdquo;
            </blockquote>
          </div>

        </div>

      </div>
    </section>
  );
}
