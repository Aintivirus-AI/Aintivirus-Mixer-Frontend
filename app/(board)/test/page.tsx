'use client';
import React from 'react';
import { Button } from '@heroui/button';
import { saveAs } from 'file-saver';

const Page = () => {
  const handleDownload = () => {
    const note = 'Hello, this is your downloaded note!';
    const blob = new Blob([note], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'note.txt');
  };

  return (
    <div className="p-4">
      <Button onClick={handleDownload}>Download</Button>
    </div>
  );
};

export default Page;
