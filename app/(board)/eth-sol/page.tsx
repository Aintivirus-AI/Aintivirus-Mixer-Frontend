'use client';
// ** import external libraries
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { useAccount } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import { addToast } from '@heroui/toast';
import { useWallet } from '@solana/wallet-adapter-react';

//** import custom components
import { CustomConnectButton } from '@/components/custom-connectbutton';
import SolanaWalletButton from '@/components/solana-wallet-button';

// ** import api action
import MixAction from '@/actions/MixAction';

// ** import local constants
import { currenciesMap } from '@/config/data';
import { config as wagmiConfig } from '@/config/wagmi';

// ** import util
import { ENV } from '@/config/env';

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
    const { publicKey } = useWallet();
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = React.useState('deposit');

    const [selectedCurrency, setSelectedCurrency] = useState('eth');
    const [amount, setAmount] = useState(selectedCurrency === 'eth' ? amountsEth[0].key : amountsToken[0].key);

    const [note, setNote] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

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
                title: 'Oops!',
                description: 'Please connect your wallet',
                color: 'danger',
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
            const res_1 = await MixAction.depositOnEthereum(
                Number(amount), 
                selectedCurrency === 'eth' ? 3 : 4, 
                address
            );
            const walletClient = await getWalletClient(wagmiConfig);

            if (!walletClient) throw new Error('No wallet client found');

            const provider = new ethers.BrowserProvider(walletClient.transport, 'any');
            const signer = await provider.getSigner();

            // Sign & send transactions
            let txHash = '';

            for (const txData of JSON.parse(res_1.data.transactions)) {
                const tx = await signer.sendTransaction(txData);
                const receipt = await tx.wait();

                txHash = receipt?.hash || '';
            }

            // Set session ID
            localStorage.setItem('sessionId', res_1.data.sessionId);

            const res_2 = await MixAction.validateETHDeposit(res_1.data.sessionId, txHash);

            // handleAutoDownload(res_2.data.note);

            addToast({
                title: 'Success!',
                description: 'Deposit completed. Keep your note.secret file SAFE!',
                color: 'success',
            });

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
        if (ENV.PROJECT_DISABLE) return;
        if (!publicKey) {
            addToast({
                title: 'Oops!',
                description: 'Please connect your wallet',
                color: 'danger',
            });

            return;
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
            await MixAction.withdrawSOL(note, recipientAddress);

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

    const handleReadNoteFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (ENV.PROJECT_DISABLE) return;
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setNote(reader.result as string);
        };
        reader.onerror = () => {
            console.error('Error reading file');
        };
        reader.readAsText(file);
    };

    return (
        <div className="flex w-full flex-col items-center justify-center py-2">
            <Card className="flex w-full sm:w-[400px]">
                <CardHeader className="flex items-center justify-center">
                    <h1 className="text-xl">Ethereum to Solana</h1>
                </CardHeader>
                <CardBody className="h-full">
                    <Tabs
                        fullWidth
                        aria-label="Tabs form"
                        selectedKey={selected}
                        size="md"
                        onSelectionChange={(key) => setSelected(key.toString())}
                    >
                        <Tab key="deposit" title="Deposit">
                            <div className="flex flex-col gap-4">
                                <Select
                                    className="w-full"
                                    label="Currency"
                                    placeholder="Select a currency"
                                    selectedKeys={[selectedCurrency]}
                                >
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency.key} onPress={() => handleSelectCurrency(currency.key)}>
                                            {currency.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select className="w-full" label="Amount" placeholder="Select an amount" selectedKeys={[amount]}>
                                    {(selectedCurrency === 'eth' ? amountsEth : amountsToken).map((amount) => (
                                        <SelectItem key={amount.key} onPress={() => handleSelectAmount(amount.key)}>
                                            {amount.label}
                                        </SelectItem>
                                    ))}
                                </Select>
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
                                        <Button fullWidth color="primary" isLoading={loading} onPress={handleConfirmDeposit}>
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
                                <Textarea label="Note" height={200} placeholder="Enter your secret note" value={note} onChange={(e) => setNote(e.target.value)} />
                                <Input
                                    required
                                    label="Recipient Address"
                                    placeholder="Enter recipient address"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                />
                                <SolanaWalletButton className="flex w-full" />
                                <Button color="primary" isLoading={loading} onPress={handleConfirmWithdraw}>
                                    Confirm Withdraw
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}
