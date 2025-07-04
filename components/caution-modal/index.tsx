'use client';
import React from 'react';
import { Divider } from '@heroui/divider';

import Modal from '../custom-modal';
import Button from '../button';

interface ICautionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CautionModal({ isOpen, onClose }: ICautionModalProps) {
  return (
    <Modal isOpen={isOpen} title="" onClose={onClose}>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex rounded-full bg-[#027EF44D] bg-opacity-10 p-5">
          <div className="flex items-center justify-center rounded-full bg-[#027EF44D] bg-opacity-30 p-6">
            <img className="flex w-[50px]" src="/warning.png" alt="Warning" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="flex text-center text-2xl font-bold text-white">Do not leave or refresh the page</h1>
        </div>
        <div className="flex items-center justify-center">
          <h1 className="flex text-center text-medium text-white text-opacity-70">
            Your secret note is being generated. Avoid refreshing or closing the page.
          </h1>
        </div>
        <div className="flex w-full items-center justify-center">
          <Divider className="flex h-[1px] w-full bg-[#2B2E54]" />
        </div>
        <div className="flex items-center justify-center">
          <Button isLoading className="w-full" variantColor="blue" />
        </div>
      </div>
    </Modal>
  );
}
