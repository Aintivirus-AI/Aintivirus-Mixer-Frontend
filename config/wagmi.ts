// ** import external libraries
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, hardhat } from 'wagmi/chains'

export const config = getDefaultConfig({
    appName: 'McAfee Mixer',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
        mainnet,
        sepolia,
        hardhat
    ],
    ssr: true
})