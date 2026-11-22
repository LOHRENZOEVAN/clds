import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Featured Language Projects */}
        <FeaturedProjects />

        {/* 3. Upcoming Events & Training Workshops */}
        <UpcomingEvents />
      </main>

      <Footer />
    </div>
  );
}
