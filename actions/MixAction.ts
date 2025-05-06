import { TransactionRequest } from 'ethers';
import { Transaction } from '@solana/web3.js';

import axios from '@/lib/axios';

export default class MixAction {
  static async depositOnEthereum(
    amount: string,
    currency: string,
    sender: string
  ): Promise<{ data: { sessionId: string; expiresAt: number; transactions: string } }> {
    try {
      const response = await axios.post('/deposit-eth', {
        amount,
        currency,
        sender,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async depositOnSolana(
    amount: number,
    currency: string,
    sender: string
  ): Promise<{ data: { sessionId: string; expiresAt: number; transaction: Array<Transaction> } }> {
    try {
      const response = await axios.post('/deposit-sol', {
        amount,
        currency,
        sender,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async validateETHDeposit(sessionId: string, txHash: string): Promise<{ data: { note: string } }> {
    try {
      const response = await axios.post('/validate-eth-deposit', {
        sessionId,
        txHash,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async validateSOLDeposit(sessionId: string, txHash: string): Promise<{ data: { note: string } }> {
    try {
      const response = await axios.post('/validate-sol-deposit', {
        sessionId,
        txHash,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async withdrawSOL(note: string, receiver: string) {
    try {
      const response = await axios.post('/withdraw-sol', {
        note,
        receiver,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async withdrawETH(note: string, receiver: string) {
    try {
      const response = await axios.post('/withdraw-eth', {
        note,
        receiver,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
