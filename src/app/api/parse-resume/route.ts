// app/api/parse-resume/route.ts
import { NextResponse } from 'next/server';
import { initialResumeData } from '@/app/lib/data'; // Placeholder for default/mock data

// You'll need to configure your resume parsing service here.
// Examples: https://apilayer.com/marketplace/resume-parser-api, https://www.apexer.com/resume-parser-api, or open-source libraries (more complex to self-host).
// For a quick start, we'll use a mock.

export async function POST(request: Request) {
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File | null;

    if (!resumeFile) {
        return NextResponse.json({ error: 'No resume file uploaded' }, { status: 400 });
    }

    // In a real application, you would:
    // 1. Send `resumeFile` to an external resume parsing API.
    // 2. Process the response from that API.
    // 3. Return the structured data.

    // For demonstration, let's simulate a delay and return mock data.
    console.log(`Received file: ${resumeFile.name}, type: ${resumeFile.type}, size: ${resumeFile.size} bytes`);

    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

        // Placeholder: Replace this with actual resume parsing logic
        // This `initialResumeData` should be structured like Greg Brockman's resume data.
        const parsedData = {
            ...initialResumeData, // Your mock or default data
            contact: {
                name: 'Greg Brockman',
                title: 'President, Chairman, Co-founder of OpenAI',
                location: 'San Francisco, CA',
                email: 'greg@gregbrockman.com',
                website: 'gregbrockman.com',
                linkedin: 'linkedin.com/in/thegdb',
                twitter: 'x.com/gdb',
            },
            summary: `I love to build / sometimes also break things. My work includes:\n\n• Salto: Building fast OpenAI, our API, and training large-scale models such as GPT-4o.\n• I'm the former CTO of Stripe, helping it to grow from 4 to 200+ employees.\n• Rubbish: A macOS screenshot library showing up like syntax.\n• Rubbish: The language-dependent shared socket manager I use for my GitHub.\n• And 200 more vital projects.`,
            skills: ['Python', 'Golang', 'CUDA', 'FastAPI', 'React', 'JavaScript'],
            workExperience: [
                {
                    title: 'President, Chairman, Co-founder',
                    company: 'OpenAI',
                    dates: '2015 - Present',
                    description: 'Building artificial general intelligence to benefit all of humanity.',
                },
                {
                    title: 'Chief Technology Officer',
                    company: 'Stripe',
                    dates: '2010 - 2015',
                    description: 'Increasing the GDP of the internet.',
                },
            ],
            education: [
                {
                    degree: 'Computer Science',
                    institution: 'Massachusetts Institute of Technology',
                    dates: '2006 - 2010',
                    details: 'Cambridge, MA',
                },
                {
                    degree: 'Computer Science',
                    institution: 'Harvard University',
                    dates: '2006 - 2008',
                    details: 'Cambridge, MA',
                },
            ],
        };

        return NextResponse.json(parsedData, { status: 200 });
    } catch (error) {
        console.error('Error processing resume:', error);
        return NextResponse.json({ error: 'Failed to process resume file.' }, { status: 500 });
    }
}