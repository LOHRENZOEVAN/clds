import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LiteratureSection from '@/components/LiteratureSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Founding Purpose and Context Literature */}
        <LiteratureSection />
      </main>

      <Footer />
    </div>
  );
}
