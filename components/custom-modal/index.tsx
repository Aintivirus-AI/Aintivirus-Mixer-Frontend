"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../button";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
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
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`relative bg-black-110 rounded-[40px] w-[477px] max-w-full max-h-[90vh] flex flex-col`}
            >
                <div className="flex items-center justify-between px-[34px] pt-[40px] flex-shrink-0">
                    <h2 className="text-white text-[25px] font-calSans">{title}</h2>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-10 h-10 bg-black-140 rounded-full"
                        >
                            <IoClose color="white" />
                        </button>
                    )}
                </div>

                <div
                    className={clsx(
                        "text-white/80 text-base leading-relaxed pb-6 px-[34px] flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black-80 scrollbar-track-black-120",
                        !!title ? "pt-6" : "pt-0"
                    )}
                >
                    {children}
                </div>
                {!!buttonText && (
                    <div className="flex-shrink-0">
                        <div className="w-full h-[1px] bg-black-80" />
                        <div className="px-[34px] pt-[20px] pb-[34px]">
                            <Button
                                variantColor="blue"
                                onClick={onButtonClick || onClose}
                                className="w-full"
                            >
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