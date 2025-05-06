'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '@heroui/input';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';

import { getFormattedDatetime } from '@/util';

export default function Page() {
    const searchParams = useSearchParams();
    const note = searchParams.get('note') || '';
    const mode = searchParams.get('mode') || '';

    const [showNote, setShowNote] = useState(false);
    const [hovering, setHovering] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(note);
            addToast({
                title: 'Saved on clipboard',
                description: 'Note copied to clipboard. Paste and save it in your safe space.',
                color: 'success',
            });
        } catch (err) {
            console.error('Failed to copy note:', err);
        }
    };

    const handleDownload = () => {
        const filename =
            mode === 'eth-sol'
                ? `ethereum_deposit_${getFormattedDatetime()}.secret.txt`
                : mode === 'sol-eth'
                ? `solana_deposit_${getFormattedDatetime()}.secret.txt`
                : null;

        if (!filename) {
            addToast({
                title: 'Oops!',
                description: 'Invalid mixing mode',
                color: 'warning',
            });
            return;
        }

        const blob = new Blob([note], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex w-full flex-col items-center justify-center py-2">
            <Card className="flex h-[400px] w-full sm:w-[400px] overflow-hidden">
                <CardHeader className="flex justify-center items-center py-5">
                    <h1 className="flex text-lg">BackUp your secret Note</h1>
                </CardHeader>
                <CardBody className="flex w-full flex-col overflow-hidden gap-3">
                    <div
                        className="relative w-full h-[200px]"
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <Textarea
                            value={showNote ? note : '•'.repeat(note.length)}
                            disabled
                            className="w-full h-full font-mono tracking-widest"
                        />
                        {hovering && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <Button
                                    color={showNote ? "primary" : "secondary"}
                                    size="sm"
                                    onClick={() => setShowNote(!showNote)}
                                    className="pointer-events-auto"
                                >
                                    {showNote ? 'Hide Note' : 'Show Note'}
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex w-full justify-center sm:flex-row sm:justify-between gap-2 mt-2">
                        <Button color="primary" className="flex w-full" onPress={handleCopy}>
                            Copy Note
                        </Button>
                        <Button color="primary" className="flex w-full" onPress={handleDownload}>
                            Download
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}