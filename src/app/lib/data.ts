// app/lib/data.ts

/**
 * Defines the TypeScript structure for our parsed resume data.
 * This ensures type safety across all components and the API.
 */
export interface ResumeData {
    contact: {
        name: string;
        title: string;
        location: string;
        email: string;
        website: string;
        linkedin: string;
        twitter: string;
        profilePicUrl?: string; // Optional field
    };
    summary: string;
    skills: string[];
    workExperience: Array<{
        id: string; // Add a unique ID for React keys
        title: string;
        company: string;
        dates: string;
        description: string;
    }>;
    education: Array<{
        id: string; // Add a unique ID for React keys
        degree: string;
        institution: string;
        dates: string;
        details?: string; // Optional field
    }>;
    // You can add other sections as needed, e.g.:
    // projects: Array<...>;
    // awards: Array<...>;
}

/**
 * Provides a default, empty state for our resume data.
 * This is useful for initializing the state in page.tsx
 * to avoid "cannot read property 'name' of null" errors.
 */
export const initialResumeData: ResumeData = {
    contact: {
        name: '',
        title: '',
        location: '',
        email: '',
        website: '',
        linkedin: '',
        twitter: '',
    },
    summary: '',
    skills: [],
    workExperience: [],
    education: [],
};