// components/UploadArea.tsx
'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // npm install react-dropzone
import { UploadCloudIcon } from 'lucide-react'; // npm install lucide-react

interface UploadAreaProps {
    onFileUpload: (file: File) => void;
    isLoading: boolean;
    error: string | null;
    onButtonClick: () => void;
}

export default function UploadArea({ onFileUpload, isLoading, error, onButtonClick }: UploadAreaProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                onFileUpload(acceptedFiles[0]);
            }
        },
        [onFileUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc', '.docx'],
        },
        maxFiles: 1,
        noClick: true, // Disable click to open file dialog, as we trigger it from the button
    });

    return (
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-gray-600 cursor-pointer transition-colors h-full
      ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-100'}
      ${error ? 'border-red-500 bg-red-50' : ''}`}
        >
            <input {...getInputProps()} />
            <UploadCloudIcon className="w-16 h-16 text-gray-400 mb-4" />
            {isDragActive ? (
                <p className="font-semibold">Drop the resume here ...</p>
            ) : (
                <p className="font-semibold text-lg">Drag and drop a resume or click 'Add Candidate'</p>
            )}
            <p className="text-sm mt-2">Supports PDF, DOC, DOCX</p>
            {isLoading && <p className="mt-4 text-blue-600">Processing resume...</p>}
            {error && <p className="mt-4 text-red-600 font-bold">{error}</p>}
        </div>
    );
}