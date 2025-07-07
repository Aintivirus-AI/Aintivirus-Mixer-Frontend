"use client"
import React, { useState } from "react"
import { Divider } from "@heroui/divider"
import Modal from "../custom-modal"
import Button from "../button"

interface ICautionModalProps {
    isOpen: boolean
    onClose: () => void
}

const CautionModal: React.FC<ICautionModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" showCloseButton={false}>
            <div className="flex flex-col w-full items-center justify-center gap-3">
                <div className="flex p-5 bg-[#027EF44D] bg-opacity-10 rounded-full">
                    <div className="flex p-6 bg-[#027EF44D] bg-opacity-30 rounded-full justify-center items-center">
                        <img className="flex w-[50px]" src="/warning.png" />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="flex text-2xl text-white font-bold text-center">Do not leave or refresh the page</h1>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="flex text-medium text-white text-opacity-70 text-center">
                        Your secret note is being generated. Avoid refreshing or closing the page.
                    </h1>
                </div>
                <div className="flex justify-center items-center w-full">
                    <Divider className="flex w-full h-[1px] bg-[#2B2E54]" />
                </div>
                <div className="flex justify-center items-center">
                    <Button className="w-full" variantColor="blue" isLoading />
                </div>
            </div>
        </Modal>
    )
}

export default CautionModal