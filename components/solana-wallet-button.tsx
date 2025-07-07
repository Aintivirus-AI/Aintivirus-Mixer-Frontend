'use client';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@/styles/solana-wallet-adapter-react-ui-styles.css';

interface SolanaWalletButtonPropType {
  className?: string;
}

const SolanaWalletButton: React.FC<SolanaWalletButtonPropType> = ({ className }) => {
  // if you use anchor, use the anchor hook instead
  // const wallet = useAnchorWallet();
  // const walletAddress = wallet?.publicKey.toString();

  return <WalletMultiButton className={`${className}`}/>;
};

export default SolanaWalletButton;
