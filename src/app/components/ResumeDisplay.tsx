// components/ResumeDisplay.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Section from "@/app/components/Section";

// Use the same ResumeData interface as in page.tsx
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

interface ResumeDisplayProps {
    data: ResumeData | null;
    isLoading: boolean;
}

export default function ResumeDisplay({ data, isLoading }: ResumeDisplayProps) {
    // We'll use local state to manage editable fields,
    // potentially syncing back to parent or backend later.
    const [editableData, setEditableData] = useState<ResumeData | null>(null);

    useEffect(() => {
        setEditableData(data); // Initialize editable data when prop changes
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full text-lg text-gray-600">
                Loading resume fields...
            </div>
        );
    }

    if (!editableData) {
        return (
            <div className="text-gray-500 text-center pt-20">
                <p>Upload a resume to see parsed fields here.</p>
                <p className="mt-2 text-sm">Fields will render in real-time after upload.</p>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // This is a simplified handler. For nested objects/arrays,
        // you'd need more complex logic to update state immutably.
        // Example for top-level contact fields:
        if (name.startsWith('contact.')) {
            setEditableData(prev => ({
                ...prev!,
                contact: {
                    ...prev!.contact,
                    [name.split('.')[1]]: value,
                },
            }));
        } else if (name === 'summary') {
            setEditableData(prev => ({ ...prev!, summary: value }));
        }
        // ... extend for other fields, especially arrays
    };

    return (
        <div className="font-sans text-gray-800">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">{editableData.contact.name}</h1>
                <p className="text-gray-600">{editableData.contact.title}</p>
                <p className="text-gray-500 text-sm">{editableData.contact.location}</p>
            </div>

            <Section title="Contact">
                <InputField label="Email" name="contact.email" value={editableData.contact.email} onChange={handleChange} />
                <InputField label="Website" name="contact.website" value={editableData.contact.website} onChange={handleChange} />
                <InputField label="LinkedIn" name="contact.linkedin" value={editableData.contact.linkedin} onChange={handleChange} />
                <InputField label="Twitter" name="contact.twitter" value={editableData.contact.twitter} onChange={handleChange} />
            </Section>

            <Section title="Summary">
                <TextareaField label="Summary" name="summary" value={editableData.summary} onChange={handleChange} rows={5} />
            </Section>

            <Section title="Skills">
                {/* For skills, you might need a more complex component, e.g., tag input */}
                <TextareaField
                    label="Skills (comma-separated)"
                    name="skills"
                    value={editableData.skills.join(', ')}
                    onChange={handleChange}
                    rows={2}
                />
            </Section>

            {/* For Work Experience and Education, you'd create sub-components that manage
          arrays of objects, with add/edit/delete functionality for each entry.
          For brevity, I'll just show placeholders here, but the principle is similar. */}
            <Section title="Work Experience">
                {editableData.workExperience.length > 0 ? (
                    editableData.workExperience.map((job, index) => (
                        <div key={index} className="mb-4 p-3 border rounded-md bg-gray-50">
                            <InputField label="Title" name={`workExperience.${index}.title`} value={job.title} onChange={handleChange} />
                            <InputField label="Company" name={`workExperience.${index}.company`} value={job.company} onChange={handleChange} />
                            <InputField label="Dates" name={`workExperience.${index}.dates`} value={job.dates} onChange={handleChange} />
                            <TextareaField label="Description" name={`workExperience.${index}.description`} value={job.description} onChange={handleChange} rows={3} />
                        </div>
                    ))
                ) : <p className="text-gray-500 italic">No work experience found.</p>}
            </Section>

            <Section title="Education">
                {editableData.education.length > 0 ? (
                    editableData.education.map((edu, index) => (
                        <div key={index} className="mb-4 p-3 border rounded-md bg-gray-50">
                            <InputField label="Degree" name={`education.${index}.degree`} value={edu.degree} onChange={handleChange} />
                            <InputField label="Institution" name={`education.${index}.institution`} value={edu.institution} onChange={handleChange} />
                            <InputField label="Dates" name={`education.${index}.dates`} value={edu.dates} onChange={handleChange} />
                            <TextareaField label="Details" name={`education.${index}.details`} value={edu.details} onChange={handleChange} rows={2} />
                        </div>
                    ))
                ) : <p className="text-gray-500 italic">No education found.</p>}
            </Section>

            {/* ... Add other editable sections */}
        </div>
    );
}

// Helper for consistent input field styling
interface FieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function InputField({ label, name, value, onChange }: FieldProps) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                {label}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

function TextareaField({ label, name, value, onChange, rows }: FieldProps & { rows?: number }) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                rows={rows || 3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />
        </div>
    );
}