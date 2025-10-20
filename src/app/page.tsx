// app/page.tsx (conceptual)
'use client'; // This component will need client-side interactivity

import React, { useState, useRef } from 'react';
import UploadArea from '@/app/components/UploadArea';
import ResumeDisplay from '@/app/components/ResumeDisplay';
import ResumeSummary from '@/app/components/ResumeSummary'; // Import ResumeSummary

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
    // ... other fields as needed
}

export default function HomePage() {
    const [parsedResumeData, setParsedResumeData] = useState<ResumeData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleResumeUpload = async (file: File) => {
        setIsLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('resume', file);

            const response = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to parse resume');
            }

            const data: ResumeData = await response.json();
            setParsedResumeData(data);
        } catch (err) {
            console.error('Resume parsing error:', err);
            setError('Could not process resume. Please try again.');
            setParsedResumeData(null); // Clear previous data on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCandidateClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <header className="flex items-center justify-between p-4 border-b bg-white">
                <h1 className="text-xl font-semibold text-gray-800">Candidates</h1>
                <button
                    onClick={handleAddCandidateClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Add Candidate
                </button>
            </header>
            <main className="flex flex-1 overflow-hidden">
                {/* Left Pane - Upload or Summary */}
                <div className="w-1/2 p-8 border-r border-gray-200 overflow-y-auto">
                    {parsedResumeData ? (
                        <ResumeSummary data={parsedResumeData} />
                    ) : (
                        <UploadArea
                            onFileUpload={handleResumeUpload}
                            isLoading={isLoading}
                            error={error}
                            onButtonClick={handleAddCandidateClick}
                        />
                    )}
                </div>

                {/* Right Pane - Real-time Rendered Fields */}
                <div className="w-1/2 p-8 overflow-y-auto">
                    <ResumeDisplay data={parsedResumeData} isLoading={isLoading} />
                </div>
            </main>
            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files && handleResumeUpload(e.target.files[0])}
                className="hidden"
                accept=".pdf,.doc,.docx"
            />
        </div>
    );
}