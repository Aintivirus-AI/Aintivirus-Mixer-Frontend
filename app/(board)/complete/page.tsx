'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { addToast } from '@heroui/toast';

import { getFormattedDatetime } from '@/util';
import CustomTextArea from '@/components/custom-textarea';
import Button from '@/components/button';
import { CopyIcon, DownloadIcon } from '@/components/icons';

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
    <>
      <div className="flex items-center justify-center">
        <h1 className="font-calSans text-xl lg:text-[25px]">Back up your secret note</h1>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="relative w-full" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <CustomTextArea
            disabled
            className="w-full font-mono tracking-widest"
            maxRows={10}
            minRows={10}
            value={showNote ? note : '*'.repeat(note.length)}
          />
          {hovering && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Button
                className="pointer-events-auto"
                variantColor={showNote ? 'blue' : 'primary'}
                onClick={() => setShowNote(!showNote)}
              >
                {showNote ? 'Hide Note' : 'Show Note'}
              </Button>
            </div>
          )}
        </div>

        <div className="mt-2 flex w-full flex-col justify-center gap-2 sm:justify-between lg:flex-row">
          <Button className="flex w-full" variantColor="blue" variants="outline" onClick={handleCopy}>
            Copy Note <CopyIcon />
          </Button>
          <Button className="flex w-full" variantColor="blue" onClick={handleDownload}>
            Download <DownloadIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
