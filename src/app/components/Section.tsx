// app/components/Section.tsx
import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
    return (
        <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border-b pb-1">
                {title}
            </h2>
            <div className="text-sm">{children}</div>
        </div>
    );
}