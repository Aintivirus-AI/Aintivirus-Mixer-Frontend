// ** import external libraries
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, phantomWallet, coinbaseWallet } from '@rainbow-me/rainbowkit/wallets'
import { mainnet, sepolia, hardhat } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Aintivirus Mixer',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, sepolia, hardhat],
    ssr: true,
    wallets: [
        {
            groupName: 'Popular',
            wallets: [metaMaskWallet, phantomWallet, coinbaseWallet]
        },
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, phantomWallet, coinbaseWallet]
        }
    ]
});
