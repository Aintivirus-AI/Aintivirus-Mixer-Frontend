'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Textarea } from '@heroui/input';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { saveAs } from 'file-saver';

import { getFormattedDatetime } from '@/util';

function Page() {
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
        ? `eth-sol_${getFormattedDatetime()}.secret.txt`
        : mode === 'sol-eth'
          ? `sol-eth_${getFormattedDatetime()}.secret.txt`
          : null;

    if (!filename) {
      addToast({
        title: 'Oops!',
        description: 'Invalid mixing mode',
        color: 'warning',
      });
      return;
    }
    const blob = new Blob([note], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'note.txt');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center py-2">
      <Card className="flex h-[400px] w-full overflow-hidden sm:w-[400px]">
        <CardHeader className="flex items-center justify-center py-5">
          <h1 className="flex text-lg">BackUp your secret Note</h1>
        </CardHeader>
        <CardBody className="flex w-full flex-col gap-3 overflow-hidden">
          <div
            className="relative h-[200px] w-full"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Textarea
              value={showNote ? note : '•'.repeat(note.length)}
              disabled
              className="h-full w-full font-mono tracking-widest"
            />
            {hovering && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Button
                  color={showNote ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setShowNote(!showNote)}
                  className="pointer-events-auto"
                >
                  {showNote ? 'Hide Note' : 'Show Note'}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-2 flex w-full justify-center gap-2 sm:flex-row sm:justify-between">
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

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
