'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';

import Button from '../button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  buttonText,
  onButtonClick,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} role="button" tabIndex={0} />

      <div className={`relative flex max-h-[90vh] w-[477px] max-w-full flex-col rounded-[40px] bg-black-110`}>
        <div className="flex flex-shrink-0 items-center justify-between px-[34px] pt-[40px]">
          <h2 className="font-calSans text-[25px] text-white">{title}</h2>
          {showCloseButton && (
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black-140" onClick={onClose}>
              <IoClose color="white" />
            </button>
          )}
        </div>

        <div
          className={clsx(
            'scrollbar-thin scrollbar-thumb-black-80 scrollbar-track-black-120 flex-1 overflow-y-auto px-[34px] pb-6 text-base leading-relaxed text-white/80',
            !!title ? 'pt-6' : 'pt-0'
          )}
        >
          {children}
        </div>
        {!!buttonText && (
          <div className="flex-shrink-0">
            <div className="h-[1px] w-full bg-black-80" />
            <div className="px-[34px] pb-[34px] pt-[20px]">
              <Button className="w-full" variantColor="blue" onClick={onButtonClick || onClose}>
                {buttonText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
