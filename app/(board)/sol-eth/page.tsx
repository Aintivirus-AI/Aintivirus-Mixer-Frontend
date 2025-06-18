'use client';
// ** import external libraries
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Tabs, Tab } from '@heroui/tabs';
import { Input, Textarea } from '@heroui/input';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import { useAccount } from 'wagmi';
import { getWalletClient } from '@wagmi/core';
import { addToast } from '@heroui/toast';
import { useWallet, useConnection, WalletContextState } from '@solana/wallet-adapter-react';

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
    { key: 'sol', label: 'SOL' },
    { key: 'ainti', label: 'AINTI' },
];

const amountsSol = [
    { key: '0.5', label: '0.5' },
    { key: '1', label: '1' },
    { key: '5', label: '5' },
    { key: '10', label: '10' },
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
    const { isConnected } = useAccount();
    const { connection } = useConnection();
    const wallet = useWallet();

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = React.useState('deposit');

    const [selectedCurrency, setSelectedCurrency] = useState('sol');
    const [amount, setAmount] = useState(selectedCurrency === 'sol' ? amountsSol[0].key : amountsToken[0].key);

    const [note, setNote] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');

    const handleSelectCurrency = (key: string) => {
        setSelectedCurrency(key);
        setAmount(key === 'sol' ? amountsSol[0].key : amountsToken[0].key);
    };

    const handleSelectAmount = (key: string) => {
        setAmount(key);
    };

    const handleConfirmDeposit = async () => {
        if (ENV.PROJECT_DISABLE) return;
        if (!wallet.connected || !wallet.publicKey) {
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
            const res_1 = await MixAction.depositOnSolana(
                Number(amount),
                selectedCurrency === 'sol' ? 3 : 4,
                wallet.publicKey.toString()
            );
            const txSig = await executeJsonTransaction(res_1.data.transaction, wallet);

            // Set session ID
            localStorage.setItem('sessionId', res_1.data.sessionId);
            const res_2 = await MixAction.validateSOLDeposit(res_1.data.sessionId, txSig);

            // handleAutoDownload(res_2.data.note);

            addToast({
                title: 'Success!',
                description: 'Deposit completed. Keep your note.secret file SAFE!',
                color: 'success',
            });

            router.push(`/complete?note=${res_2.data.note}&mode=sol-eth`);
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
        if (!isConnected) {
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
            const res = await MixAction.withdrawETH(note, recipientAddress);
            console.log(res.data.txSig)
            
            // const walletClient = await getWalletClient(wagmiConfig);

            // if (!walletClient) throw new Error('No wallet client found');

            // const provider = new ethers.BrowserProvider(walletClient.transport, 'any');
            // const signer = await provider.getSigner();

            // const tx = await signer.sendTransaction(res.data);

            // await tx.wait();

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

    const executeJsonTransaction = async (jsonTx: any, wallet: WalletContextState): Promise<string> => {
        if (!wallet.publicKey || !wallet.signTransaction) {
            throw new Error('Wallet not connected or cannot sign');
        }

        // ✅ Use latest blockhash and lastValidBlockHeight
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('confirmed');

        const tx = new Transaction({
            recentBlockhash: blockhash,
            feePayer: wallet.publicKey,
        });

        // Construct all instructions
        for (const ix of jsonTx.instructions) {
            const keys = ix.keys.map((k: any) => ({
                pubkey: new PublicKey(k.pubkey),
                isSigner: k.isSigner,
                isWritable: k.isWritable,
            }));

            const programId = new PublicKey(ix.programId);
            const data = Buffer.from(ix.data);

            tx.add(new TransactionInstruction({ keys, programId, data }));
        }

        // Sign and send
        const signedTx = await wallet.signTransaction(tx);
        const rawTx = signedTx.serialize();

        const signature = await connection.sendRawTransaction(rawTx, {
            skipPreflight: false,
            preflightCommitment: 'confirmed',
        });

        // ✅ Use lastValidBlockHeight for safer confirmation
        await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed');

        return signature;
    };

    return (
        <div className="flex w-full flex-col items-center justify-center py-2">
            <Card className="flex w-full sm:w-[400px]">
                <CardHeader className="flex items-center justify-center">
                    <h1 className="text-xl">Solana to Ethereum</h1>
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
                                    {(selectedCurrency === 'sol' ? amountsSol : amountsToken).map((amount) => (
                                        <SelectItem key={amount.key} onPress={() => handleSelectAmount(amount.key)}>
                                            {amount.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <SolanaWalletButton className="flex w-full" />
                                <div className="flex justify-end gap-2">
                                    {wallet.connected ? (
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
                                <Textarea label="Note" placeholder="Enter your secret note" value={note} onChange={(e) => setNote(e.target.value)} />
                                <Input
                                    required
                                    label="Recipient Address"
                                    placeholder="Enter recipient address"
                                    value={recipientAddress}
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                />
                                <CustomConnectButton />
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
