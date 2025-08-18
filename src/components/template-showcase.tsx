
"use client";

import React from 'react';

export const TemplateShowcase: React.FC = () => {
  const templates = [
    "https://i.ibb.co/5vYyR6y/resume1.png",
    "https://i.ibb.co/gR8y9cF/resume2.png",
    "https://i.ibb.co/sJ7QW5W/resume3.png",
    "https://i.ibb.co/tc6S8cd/resume4.png",
  ];

  // Duplicate the templates for a seamless loop
  const duplicatedTemplates = [...templates, ...templates];

  return (
    <section id="templates" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Templates That Pass ATS</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Professionally designed, recruiter-approved resume templates built to pass Applicant Tracking Systems and land interviews.
        </p>

        {/* Infinite Resume Carousel */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll gap-8 w-max">
            {duplicatedTemplates.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Resume Template ${index + 1}`}
                className="w-[280px] h-[360px] object-cover rounded-2xl shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
