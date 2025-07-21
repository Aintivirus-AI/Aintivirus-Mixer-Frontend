'use client';
// ** import external libraries
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Tab } from '@heroui/tabs';
import { SelectItem } from '@heroui/select';
import { useAccount } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import { addToast } from '@heroui/toast';
import { useWallet } from '@solana/wallet-adapter-react';

//** import custom components
import { CustomConnectButton } from '@/components/custom-connectbutton';
import SolanaWalletButton from '@/components/solana-wallet-button';
import CautionModal from '@/components/caution-modal';

// ** import api action
import MixAction from '@/actions/MixAction';

// ** import local constants
import { config as wagmiConfig } from '@/config/wagmi';

// ** import util
import { ENV } from '@/config/env';
import Tabs from '@/components/tabs';
import CustomSelect from '@/components/custom-select';
import Button from '@/components/button';
import CustomTextArea from '@/components/custom-textarea';
import CustomInput from '@/components/custom-input';
import { validateSolanaWalletAddress } from '@/util';
import { notePreffix, noteSuffix } from '@/config/data';
const currencies = [
    { key: 'eth', label: 'ETH' },
    { key: 'ainti', label: 'AINTI' },
];

const amountsEth = [
    { key: '0.01', label: '0.01' },
    { key: '0.05', label: '0.05' },
    { key: '0.1', label: '0.1' },
    { key: '0.5', label: '0.5' },
    { key: '1', label: '1' },
];

const amountsToken = [
    { key: '500', label: '500' },
    { key: '1000', label: '1000' },
    { key: '2000', label: '2000' },
    { key: '5000', label: '5000' },
    { key: '10000', label: '10000' },
];

export default function Page() {
    const router = useRouter();
    const { isConnected, address } = useAccount();
    const { publicKey, connected } = useWallet();
    const [loading, setLoading] = useState(false);
    const [cautionModalOpen, setCautionModalOpen] = useState(false);
    const [selected, setSelected] = React.useState('deposit');

    const [selectedCurrency, setSelectedCurrency] = useState('eth');
    const [amount, setAmount] = useState(selectedCurrency === 'eth' ? amountsEth[0].key : amountsToken[0].key);

    const [note, setNote] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

    const handleClickToSelect = () => {
        if (!isConnected) {
            addToast({
                title: 'Connect Wallet',
                description: 'Please connect wallet before you do anything',
                color: 'warning',
            });

            return;
        }
    };

    const handleSelectCurrency = (key: string) => {
        setSelectedCurrency(key);
        setAmount(key === 'eth' ? amountsEth[0].key : amountsToken[0].key);
    };

    const handleSelectAmount = (key: string) => {
        setAmount(key);
    };

    const handleConfirmDeposit = async () => {
        if (ENV.PROJECT_DISABLE) return;
        if (!address) {
            addToast({
                title: 'Connect Wallet',
                description: 'Please connect wallet before you do anything',
                color: 'warning',
            });

            return;
        }

        if (Number(amount) <= 0) {
            addToast({
                title: 'Oops!',
                description: 'Please enter a valid amount',
                color: 'danger',
            });

            return;
        }

        try {
            setLoading(true);
            // Fetch session ID & transaction Data
            const res_1 = await MixAction.depositOnEthereum(Number(amount), selectedCurrency === 'eth' ? 3 : 4, address);

            if (!res_1.success) {
                addToast({
                    title: 'Oops',
                    description: res_1.message,
                    color: 'danger',
                });

                return;
            }
            const walletClient = await getWalletClient(wagmiConfig);

            if (!walletClient) throw new Error('No wallet client found');

            const provider = new ethers.BrowserProvider(walletClient.transport, 'any');
            const signer = await provider.getSigner();

            // Sign & send transactions
            let txHash = '';

            for (const txData of JSON.parse(res_1.data.transactions)) {
                const tx = await signer.sendTransaction(txData);

                setCautionModalOpen(true);

                const receipt = await tx.wait();

                txHash = receipt?.hash || '';
            }

            // Set session ID
            localStorage.setItem('sessionId', res_1.data.sessionId);

            const res_2 = await MixAction.validateETHDeposit(res_1.data.sessionId, txHash);

            if (!res_2.success) {
                addToast({
                    title: 'Oops',
                    description: res_2.message,
                    color: 'danger',
                });

                return;
            }
            // handleAutoDownload(res_2.data.note);

            addToast({
                title: 'Success!',
                description: 'Deposit completed. Keep your note.secret file SAFE!',
                color: 'success',
            });

            setCautionModalOpen(false);
            router.push(`/complete?note=${res_2.data.note}&mode=eth-sol`);
        } catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                if (error.reason == 'Unknown commitment') {
                    addToast({
                        title: 'Oops!',
                        description: 'Unknown commitment. Please try again few mins later.',
                        color: 'danger',
                    });
                } else {
                    addToast({
                        title: 'Oops!',
                        description: error.reason,
                        color: 'danger',
                    });
                }
            } else if (error.message) {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
            } else {
                console.error(error);
            }
            console.error(error);
        } finally {
            localStorage.clear();
            setLoading(false);
        }
    };

    const handleConfirmWithdraw = async () => {
        // if (ENV.PROJECT_DISABLE) return;
        if (!publicKey) {
            addToast({
                title: 'Connect Wallet',
                description: 'Please connect wallet before you do anything',
                color: 'warning',
            });

            return;
        }

        if (!validateSolanaWalletAddress(recipientAddress)) {
            addToast({
                title: "Invalid recipient",
                description: "Please input valid Solana wallet address as recipient",
                color: "warning"
            })

            return
        }

        if (!note) {
            addToast({
                title: 'Oops!',
                description: 'Please enter a valid note',
                color: 'danger',
            });

            return;
        }

        if (!!!recipientAddress) {
            addToast({
                title: 'Oops!',
                description: 'Please enter a valid recipient address',
                color: 'danger',
            });

            return;
        }

        try {
            setLoading(true);
            const noteBody = note.replaceAll(notePreffix, '').replaceAll(noteSuffix, '')
            const res = await MixAction.withdrawSOL(noteBody, recipientAddress);

            if (!res.success) {
                addToast({
                    title: 'Oops',
                    description: res.message,
                    color: 'danger',
                });

                return;
            }

            addToast({
                title: 'Success!',
                description: 'Withdraw completed.',
                color: 'success',
            });
        } catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.reason,
                    color: 'danger',
                });
            } else if (error.message) {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
            } else {
                console.error(error);
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-calSans text-xl lg:text-[25px]">Ethereum to Solana</h1>
            </div>
            <div className="h-full">
                <Tabs
                    fullWidth
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={(key) => setSelected(key.toString())}
                >
                    <Tab key="deposit" title="Deposit">
                        <div className="flex flex-col gap-4">
                            <div role="button" tabIndex={0} onClick={handleClickToSelect}>
                                <CustomSelect
                                    className="w-full"
                                    isDisabled={!isConnected}
                                    label="Currency"
                                    placeholder="Select a currency"
                                    selectedKeys={[selectedCurrency]}
                                >
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.key} onPress={() => handleSelectCurrency(currency.key)}>
                                            {currency.label}
                                        </SelectItem>
                                    ))}
                                </CustomSelect>
                            </div>
                            <div role="button" tabIndex={0} onClick={handleClickToSelect}>
                                <CustomSelect
                                    className="w-full"
                                    isDisabled={!isConnected}
                                    label="Amount"
                                    placeholder="Select an amount"
                                    selectedKeys={[amount]}
                                >
                                    {(selectedCurrency === 'eth' ? amountsEth : amountsToken).map((amount) => (
                                        <SelectItem key={amount.key} onPress={() => handleSelectAmount(amount.key)}>
                                            {amount.label}
                                        </SelectItem>
                                    ))}
                                </CustomSelect>
                            </div>
                            {/* <Input
                                    label="Amount"
                                    placeholder="Enter amount"
                                    step={0.0001}
                                    value={amount.toString()}
                                    type="number"
                                    onChange={(e) => setAmount(e.target.value)}
                                    min={0}
                                /> */}
                            <CustomConnectButton />
                            <div className="flex justify-end gap-2">
                                {isConnected ? (
                                    <Button className="w-full" isLoading={loading} variantColor="blue" onClick={handleConfirmDeposit}>
                                        Confirm Deposit
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </Tab>
                    <Tab key="withdraw" title="Withdraw">
                        <div className="flex flex-col gap-4">
                            {/* <Input
                                    accept=".secret"
                                    className="cursor-pointer"
                                    label="Select your note.secret file"
                                    type="file"
                                    onChange={handleReadNoteFile}
                                /> */}
                            {/* <CustomSelect
                                className="w-full"
                                label="Mixer Version"
                                placeholder="Select a mixer version"
                                selectedKeys={[selectedVersion]}
                            >
                                {versions.map((version) => (
                                    <SelectItem key={version.key} onPress={() => setSelectedVersion(version.key)}>
                                        {version.label}
                                    </SelectItem>
                                ))}
                            </CustomSelect> */}
                            <CustomTextArea
                                height={200}
                                label="Secret Note"
                                placeholder="Paste the secret note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                            <div className="w-full">
                                <CustomInput
                                    required
                                    label="Recipient Wallet Address"
                                    placeholder="Paste the destination wallet address"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                />
                                <p className="mt-2 text-xs tracking-[-0/52px] text-gray-60/70 lg:text-[13px]">
                                    Make sure the address matches the selected network.
                                </p>
                            </div>
                            <SolanaWalletButton className="flex w-full" />
                            <Button disabled={!connected} isLoading={loading} variantColor="blue" onClick={handleConfirmWithdraw}>
                                Confirm Withdraw
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <CautionModal isOpen={cautionModalOpen} onClose={() => setCautionModalOpen(false)} />
        </>
    );
}
