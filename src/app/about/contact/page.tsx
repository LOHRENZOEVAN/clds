'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock, Globe } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    subject: '',
    message: '',
    inquiryType: 'General Inquiry',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful form dispatch
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="bg-slate-900 text-white py-16 lg:py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bamenda, Cameroon</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Contact Us
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Connect with the Centre for Language Documentation and Sustainability in Bamenda. 
                Whether you are a community member, university student, researcher, or international partner, we would love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Contact Details Column */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Get in Touch
                  </h2>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    Our central secretariat and digital archiving lab are situated in Bamenda, the chief city of Cameroon’s North West Region.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Physical Address */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Centre Headquarters</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Centre for Language Documentation and Sustainability (CLDS)<br />
                        Commercial Avenue / Station Hill Road<br />
                        Bamenda, North West Region<br />
                        Republic of Cameroon
                      </p>
                    </div>
                  </div>

                  {/* Email Contacts */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Email Addresses</h3>
                      <p className="text-xs text-slate-600 mt-1 space-y-1">
                        <span className="block">General inquiries: <strong className="text-slate-800">contact@clds-cameroon.org</strong></span>
                        <span className="block">Directorate: <strong className="text-slate-800">director@clds-cameroon.org</strong></span>
                        <span className="block">Archives and Fieldwork: <strong className="text-slate-800">archives@clds-cameroon.org</strong></span>
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Office and Laboratory Hours</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Monday &ndash; Friday: 8:30 AM &ndash; 5:00 PM (WAT)<br />
                        Saturday: Community Clinics and Youth Workshops by appointment<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Send a Message or Documentation Query
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill out the form below and a representative from our Bamenda team will respond promptly.
                  </p>

                  {submitted ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Thank you for reaching out to the Centre for Language Documentation and Sustainability. 
                        Our team will review your inquiry and follow up via email.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            affiliation: '',
                            subject: '',
                            message: '',
                            inquiryType: 'General Inquiry',
                          });
                        }}
                        className="mt-3 px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-xl hover:bg-emerald-800"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Your Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                            placeholder="e.g. Dr. Bih Florence"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                            placeholder="florence@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Affiliation / University / Community
                          </label>
                          <input
                            type="text"
                            value={formData.affiliation}
                            onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                            placeholder="e.g. University of Bamenda or Bafut Community"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Inquiry Type
                          </label>
                          <select
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                          >
                            <option>General Inquiry</option>
                            <option>Fieldwork Documentation Collaboration</option>
                            <option>Student and Youth Training Workshops</option>
                            <option>Archival Access and Audio Recordings</option>
                            <option>Partnership and Funding Proposal</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                          placeholder="Brief topic of your message"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Message *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 bg-white text-sm"
                          placeholder="Tell us about the language, documentation project, or question you would like to discuss..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

