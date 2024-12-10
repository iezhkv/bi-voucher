'use client';

import { useState } from 'react';

export default function DownloadButton({ id }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/capturepdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }), // Send the ID in the request body
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `voucher-${id}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error(`Failed to download PDF: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error during download:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            className="btn-primary"
            onClick={handleDownload}
            disabled={isLoading}
        >
            {isLoading ? <span>Loading...</span> : <span>Download</span>}
        </button>
    );
}
