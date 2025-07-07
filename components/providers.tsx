'use client';
import '@rainbow-me/rainbowkit/styles.css';

import * as React from 'react';
import { HeroUIProvider } from '@heroui/system';
import { useRouter } from 'next/navigation';
import { ToastProvider } from '@heroui/toast';

// ** import external libraries (Ethereum development Kit)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// ** import external libraries (Solana development Kit)
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    SolongWalletAdapter,
    LedgerWalletAdapter,
    AlphaWalletAdapter,
    AvanaWalletAdapter,
    CoinbaseWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import { ENV } from '@/config/env';
import { config } from '@/config/wagmi';

const queryClient = new QueryClient();

export interface ProvidersProps {
    children: React.ReactNode;
}

declare module '@react-types/shared' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>;
    }
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();

    const solanaMainnet = WalletAdapterNetwork.Mainnet;
    const solanaDevnet = WalletAdapterNetwork.Devnet;

    const endpoint = React.useMemo(() => ENV.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(solanaMainnet), [solanaMainnet]);
    // const endpoint = React.useMemo(() => clusterApiUrl(solanaDevnet), [solanaDevnet])

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
    // Only the wallets you configure here will be compiled into your application
    const wallets = React.useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
            new CoinbaseWalletAdapter(),
            new SolongWalletAdapter(),
            new LedgerWalletAdapter(),
            new AlphaWalletAdapter(),
            new AvanaWalletAdapter(),
        ],
        [solanaMainnet, solanaDevnet]
    );

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ConnectionProvider endpoint={endpoint}>
                        <WalletProvider wallets={wallets}>
                            <WalletModalProvider>
                                <HeroUIProvider navigate={router.push}>
                                    <ToastProvider placement="top-right" />
                                    {children}
                                </HeroUIProvider>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
