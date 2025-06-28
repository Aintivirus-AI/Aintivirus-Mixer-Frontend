'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Transaction, TransactionInstruction, PublicKey } from '@solana/web3.js';
import { useWallet, useConnection, WalletContextState } from '@solana/wallet-adapter-react';
import { addToast } from '@heroui/toast';

import MixAction from '@/actions/MixAction';

import SolanaWalletButton from '@/components/solana-wallet-button';

function Page() {
    const { connection } = useConnection();
    const wallet = useWallet();

    const [loading, setLoading] = useState<boolean>(false)
    const [fetchingDefault, setFetchingDefault] = useState<boolean>(false)

    const [defaultOperatorSettings, setDefaultOperatorSettings] = useState({
        maintainer: '',
        feeCollector: '',
        refund: '0',
        fee: '0',
        minSolDepositAmount: '0',
        minTokenDepositAmount: '0'
    })

    const [maintainer, setMaintainer] = useState<string>('');
    const [feeCollector, setFeeCollector] = useState<string>('');
    const [refund, setRefund] = useState<string>('0');
    const [fee, setFee] = useState<string>('0');
    const [minSolDepositAmount, setMinSolDepositAmount] = useState<string>('0');
    const [minTokenDepositAmount, setMinTokenDepositAmount] = useState<string>('0');

    const isWalletConnected = wallet.connected;

    const handleSetMaintainer = async () => {
        try {
            if (!maintainer) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid Solana account',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolMaintainer(maintainer, wallet.publicKey.toBase58())

            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (maintainer)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSetFeeCollector = async () => {
        try {
            if (!feeCollector) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid Solana account',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolFeeCollector(feeCollector, wallet.publicKey.toBase58())
            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (fee collector)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSetRefund = async () => {
        try {
            if (isNaN(Number(refund)) || Number(refund) <= 0) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid fee rate',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolRefund(Number(refund), wallet.publicKey.toBase58())
            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (refund)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSetFee = async () => {
        try {
            if (isNaN(Number(fee)) || Number(fee) <= 0) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid fee rate',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolFee(Number(fee), wallet.publicKey.toBase58())
            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (fee)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSetMinSolDepositAmount = async () => {
        try {
            if (isNaN(Number(minSolDepositAmount)) ||  Number(minSolDepositAmount) <= 0) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid amount',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolMinDepositAmount(Number(minSolDepositAmount), wallet.publicKey.toBase58())
            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (min SOL deposit amount)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    const handleSetMinTokenDepositAmount = async () => {
        try {
            if (isNaN(Number(minTokenDepositAmount)) ||  Number(minTokenDepositAmount) <= 0) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please input valid amount',
                    color: 'danger',
                });
                return
            }

            if (!wallet.publicKey) {
                addToast({
                    title: 'Invalid input',
                    description: 'Please connect wallet',
                    color: 'danger',
                });
                return
            }

            setLoading(true)

            const res = await MixAction.setSolMinTokenDepositAmount(Number(minTokenDepositAmount), wallet.publicKey.toBase58())
            const txSig = await executeJsonTransaction(res.data.transaction, wallet)

            console.log({ txSig })

            addToast({
                title: 'Success',
                description: 'On-chain setting updated (min AINTI deposit amount)',
                color: 'success',
            });
        }
        catch (error: any) {
            if (error.code === 'CALL_EXCEPTION') {
                addToast({
                    title: 'Oops!',
                    description: error.message,
                    color: 'danger',
                });
                console.error(error);
            } else {
                console.error(error);
            }
        }
        finally {
            setLoading(false)
        }
    }

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

    useEffect(() => {
        (async () => {
            try {
                setFetchingDefault(true)

                const mixStorageData = await MixAction.getMixStorageData()

                setDefaultOperatorSettings({
                    maintainer: mixStorageData.data.maintainer,
                    feeCollector: mixStorageData.data.feeCollector,
                    fee: mixStorageData.data.fee.toString(),
                    refund: mixStorageData.data.refund.toString(),
                    minSolDepositAmount: mixStorageData.data.minSolDepositAmount.toString(),
                    minTokenDepositAmount: mixStorageData.data.minTokenDepositAmount.toString()
                })

                setMaintainer(mixStorageData.data.maintainer)
                setFeeCollector(mixStorageData.data.feeCollector)
                setRefund(mixStorageData.data.refund.toString())
                setFee(mixStorageData.data.fee.toString())
                setMinSolDepositAmount(mixStorageData.data.minSolDepositAmount.toString())
                setMinTokenDepositAmount(mixStorageData.data.minTokenDepositAmount.toString())

                console.log(mixStorageData)
            }
            catch(error) {
                console.error(error)
            }
            finally {
                setFetchingDefault(false)
            }
        })()
    }, [wallet.connected])

    return (
        <div className="relative flex w-full flex-col items-center justify-center py-2">
            <div className="relative w-full sm:w-[850px]">
                {/* Blur overlay when wallet is not connected */}
                {!isWalletConnected && (
                    <div className="absolute inset-0 z-[1000] flex items-center justify-center rounded-xl backdrop-blur-md pointer-events-auto">
                        <div className="z-[1001]">
                            <SolanaWalletButton />
                        </div>
                    </div>
                )}

                <Card
                    className={`transition-all duration-300 rounded-xl ${!isWalletConnected ? 'pointer-events-none' : ''
                        }`}
                >
                    <CardHeader className="flex flex-col justify-center items-center py-5 relative z-1">
                        {
                            isWalletConnected && (
                                <div className="flex w-full justify-end relative z-[9999]">
                                    <SolanaWalletButton />
                                </div>
                            )
                        }
                        <h1 className="flex text-lg">Solana Operator Setting</h1>
                    </CardHeader>
                    <CardBody className="flex flex-row flex-wrap justify-center w-full overflow-hidden gap-3 pb-10 relative z-0">
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input 
                                label="New Operator" 
                                variant="underlined" 
                                value={maintainer} 
                                disabled={loading || fetchingDefault}
                                onChange={(e) => setMaintainer(e.target.value)}
                            />
                            <Button 
                                color={ maintainer === defaultOperatorSettings.maintainer ? "default" : "primary"}
                                isLoading={loading} 
                                onClick={handleSetMaintainer}
                                disabled={maintainer === defaultOperatorSettings.maintainer}
                            >
                                Confirm
                            </Button>
                        </div>
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input 
                                label="Fee Collector" 
                                variant="underlined" 
                                value={feeCollector} 
                                disabled={loading || fetchingDefault} 
                                onChange={(e) => setFeeCollector(e.target.value)}
                            />
                            <Button 
                                color={ feeCollector === defaultOperatorSettings.feeCollector ? "default" : "primary"}
                                isLoading={loading} 
                                onClick={handleSetFeeCollector}
                                disabled={feeCollector === defaultOperatorSettings.feeCollector}
                            >
                                Confirm
                            </Button>
                        </div>
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input 
                                label="SOL Fee" 
                                variant="underlined" 
                                value={refund.toString()} 
                                disabled={loading || fetchingDefault}
                                onChange={(e) => setRefund(e.target.value)}
                            />
                            <Button 
                                color={ refund === defaultOperatorSettings.refund ? "default" : "primary"}
                                isLoading={loading} 
                                onClick={handleSetRefund}
                                disabled={refund === defaultOperatorSettings.refund}
                            >
                                Confirm
                            </Button>
                        </div>
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input 
                                label="AINTI Fee" 
                                variant="underlined" 
                                value={fee.toString()} 
                                disabled={loading || fetchingDefault}
                                onChange={(e) => setFee(e.target.value)}
                            />
                            <Button 
                                color={ fee === defaultOperatorSettings.fee ? "default" : "primary"}
                                isLoading={loading} 
                                onClick={handleSetFee}
                                disabled={fee === defaultOperatorSettings.fee}
                            >
                                Confirm
                            </Button>
                        </div>
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input
                                label="Min SOL deposit amount"
                                variant="underlined"
                                value={minSolDepositAmount.toString()}
                                disabled={loading || fetchingDefault}
                                onChange={(e) => setMinSolDepositAmount(e.target.value)}
                            />
                            <Button 
                                color={ minSolDepositAmount === defaultOperatorSettings.minSolDepositAmount ? "default" : "primary"} 
                                isLoading={loading} 
                                onClick={handleSetMinSolDepositAmount}
                                disabled={minSolDepositAmount === defaultOperatorSettings.minSolDepositAmount}
                            >
                                Confirm
                            </Button>
                        </div>
                        <div className="flex sm:w-[400px] justify-between items-end gap-2">
                            <Input
                                label="Min AINTI deposit amount"
                                variant="underlined"
                                value={minTokenDepositAmount.toString()}
                                disabled={loading || fetchingDefault}
                                onChange={(e) => setMinTokenDepositAmount(e.target.value)}
                            />
                            <Button 
                                color={ minTokenDepositAmount === defaultOperatorSettings.minTokenDepositAmount ? "default" : "primary"} 
                                isLoading={loading} 
                                onClick={handleSetMinTokenDepositAmount}
                                disabled={minTokenDepositAmount === defaultOperatorSettings.minTokenDepositAmount}
                            >
                                Confirm
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
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
