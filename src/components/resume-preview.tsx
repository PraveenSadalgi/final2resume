"use client";

import type { ResumeData } from "@/lib/types";
import OneColumnTemplate from "./templates/one-column";
import TwoColumnTemplate from "./templates/two-column";

interface ResumePreviewProps {
  resumeData: ResumeData;
  isPrintMode?: boolean;
}

export default function ResumePreview({
  resumeData,
  isPrintMode = false,
}: ResumePreviewProps) {
  const TemplateComponent =
    resumeData.template === "one-column" ? OneColumnTemplate : TwoColumnTemplate;

  return (
    <div
      id="resume-preview"
      className={`bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-[8.5in] aspect-[8.5/11] min-w-[350px]
        ${isPrintMode ? 'print-container' : 'transform scale-[0.3] sm:scale-[0.4] md:scale-[0.5] lg:scale-[0.6] origin-top'}`}
    >
      <TemplateComponent resumeData={resumeData} />
    </div>
  );
}
