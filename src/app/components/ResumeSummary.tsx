// components/ResumeSummary.tsx
import React from 'react';

interface ResumeData {
    contact: {
        name: string;
        title: string;
        location: string;
        email: string;
        website: string;
        linkedin: string;
        twitter: string;
    };
    summary: string;
    skills: string[];
    workExperience: Array<{
        title: string;
        company: string;
        dates: string;
        description: string;
    }>;
    education: Array<{
        degree: string;
        institution: string;
        dates: string;
        details: string;
    }>;
    // ... other fields
}

interface ResumeSummaryProps {
    data: ResumeData | null;
}

export default function ResumeSummary({ data }: ResumeSummaryProps) {
    if (!data) return null;

    return (
        <div className="font-sans text-gray-800">
            <div className="flex items-center mb-6">
                {/* Placeholder for profile picture if available in parsed data */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    {/* Or <img src={data.contact.profilePic} alt="Profile" className="rounded-full" /> */}
                    <span className="text-xl font-bold text-gray-600">GB</span> {/* Initials */}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{data.contact.name}</h1>
                    <p className="text-gray-600">{data.contact.title}</p>
                    <p className="text-gray-500 text-sm">{data.contact.location}</p>
                </div>
            </div>

            <Section title="CONTACT">
                <p>
                    <a href={`mailto:${data.contact.email}`} className="text-blue-600 hover:underline">
                        {data.contact.email}
                    </a>
                </p>
                {data.contact.website && (
                    <p>
                        <a href={data.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {data.contact.website}
                        </a>
                    </p>
                )}
                {data.contact.linkedin && (
                    <p>
                        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn
                        </a>
                    </p>
                )}
                {data.contact.twitter && (
                    <p>
                        <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Twitter
                        </a>
                    </p>
                )}
            </Section>

            <Section title="SUMMARY">
                <p className="whitespace-pre-wrap">{data.summary}</p>
            </Section>

            <Section title="SKILLS">
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
                    ))}
                </div>
            </Section>

            <Section title="WORK EXPERIENCE">
                {data.workExperience.map((job, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="text-sm text-gray-700">{job.company} - {job.dates}</p>
                        <p className="text-sm whitespace-pre-wrap">{job.description}</p>
                    </div>
                ))}
            </Section>

            <Section title="EDUCATION">
                {data.education.map((edu, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-gray-700">{edu.institution} - {edu.dates}</p>
                        {edu.details && <p className="text-sm whitespace-pre-wrap">{edu.details}</p>}
                    </div>
                ))}
            </Section>
            {/* ... Add other sections like Awards, Projects etc. */}
        </div>
    );
}

// Helper component for consistent section styling
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">
                {title}
            </h2>
            <div className="text-sm">{children}</div>
        </div>
    );
}