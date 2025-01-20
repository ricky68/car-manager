import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import '../custom.css';

const MarkdownElement: React.FC = () => {
    const [markdownContent, setMarkdownContent] = useState<string>('');

    useEffect(() => {
        marked.setOptions({
            gfm: true,
            breaks: false,
            pedantic: false
        });

        const fetchReadme = async () => {
            try {
                const response = await fetch('/README.md'); // Adjust the path if necessary
                const text = await response.text(); // Await this to get the resolved string
                setMarkdownContent(text); // Set the raw Markdown text in the state
            } catch (error) {
                console.error('Error fetching README.md:', error);
            }
        };

        fetchReadme();
    }, []);

    return (
        <div className="prose prose-lg max-w-none p-8">
            <div
                className="markdown-content text-left"
                dangerouslySetInnerHTML={{ __html: marked.parse(markdownContent) }} // Convert to HTML directly in the render
            />
        </div>
    );
};

export default MarkdownElement;
