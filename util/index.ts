import { PublicKey } from "@solana/web3.js";
import { ethers } from "ethers";

export const getFormattedDatetime = () => {
  const now = new Date();

  const formatted =
    now.getFullYear().toString() +
    '-' +
    String(now.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(now.getDate()).padStart(2, '0') +
    '-' +
    String(now.getHours()).padStart(2, '0') +
    '-' +
    String(now.getMinutes()).padStart(2, '0');

  return formatted;
};

export const validateSolanaWalletAddress = (address: string) => {
  try {
    const publicKey = new PublicKey(address)

    return PublicKey.isOnCurve(publicKey.toBytes())
  }
  catch {
    return false
  }
}

export const validateEthereumWalletAddress = (address: string) => {
  // 1. Basic format check (starts with 0x and is 42 hex characters long)
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return false;
  }

  // 2. EIP-55 Checksum Validation using ethers.utils.isAddress
  // ethers.utils.isAddress returns the checksummed address if valid,
  // or false if invalid (including incorrect checksum).
  const checksummedAddress = ethers.isAddress(address);

  return checksummedAddress !== false;
}