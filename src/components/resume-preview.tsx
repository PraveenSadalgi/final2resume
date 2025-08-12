
"use client";

import type { ResumeData } from "@/lib/types";
import OneColumnTemplate from "./templates/one-column";
import TwoColumnTemplate from "./templates/two-column";
import ModernTemplate from "./templates/modern";
import CreativeTemplate from "./templates/creative";
import MinimalistTemplate from "./templates/minimalist";

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
};

export default function ResumePreview({
  resumeData,
  isPrintMode = false,
}: ResumePreviewProps) {
  const TemplateComponent = templateComponents[resumeData.template] || OneColumnTemplate;

  return (
    <div
      id="resume-preview"
      className={`bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-[8.5in] aspect-[8.5/11] min-w-[320px]
        ${isPrintMode ? 'print-container' : 'transform scale-[0.25] xs:scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] origin-top'}`}
    >
      <TemplateComponent resumeData={resumeData} />
    </div>
  );
}
