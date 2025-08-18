
"use client";

import type { ResumeData } from "@/lib/types";
import OneColumnTemplate from "./templates/one-column";
import TwoColumnTemplate from "./templates/two-column";
import ModernTemplate from "./templates/modern";
import CreativeTemplate from "./templates/creative";
import MinimalistTemplate from "./templates/minimalist";
import TechnicalTemplate from "./templates/technical";
import ExecutiveTemplate from "./templates/executive";

interface ResumePreviewProps {
  resumeData: ResumeData;
  isPrintMode?: boolean;
}

const templateComponents = {
  'one-column': OneColumnTemplate,
  'two-column': TwoColumnTemplate,
  'modern': ModernTemplate,
  'creative': CreativeTemplate,
  'minimalist': MinimalistTemplate,
  'technical': TechnicalTemplate,
  'executive': ExecutiveTemplate,
};

export default function ResumePreview({
  resumeData,
  isPrintMode = false,
}: ResumePreviewProps) {
  const TemplateComponent = templateComponents[resumeData.template] || OneColumnTemplate;

  // In the templates page, we don't want the scaling effect, so we check for isPrintMode
  // and also the context of how it's being used. A better way might be a specific prop.
  // For now, if not in print mode, it implies it's in the editor or template selection page.
  const containerClass = isPrintMode 
    ? 'print-container' 
    : 'transform scale-[0.25] xs:scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] origin-top';

  if (typeof window !== 'undefined' && window.location.pathname.includes('/templates')) {
    // We are on the templates page, render without scaling for a larger preview
    return (
        <div id="resume-preview" className="bg-white shadow-lg w-full aspect-[8.5/11]">
            <TemplateComponent resumeData={resumeData} />
        </div>
    );
  }
  
  return (
    <div
      id="resume-preview"
      className={`bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-[8.5in] aspect-[8.5/11] min-w-[320px] ${containerClass}`}
    >
      <TemplateComponent resumeData={resumeData} />
    </div>
  );
}
