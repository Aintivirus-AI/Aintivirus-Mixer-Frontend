import { TransactionRequest } from 'ethers';
import { Transaction, PublicKey } from '@solana/web3.js';

import axios from '@/lib/axios';

export default class MixAction {
    static async depositOnEthereum(
        amount: number,
        mode: number,
        sender: string
    ): Promise<{
        success: boolean
        message: string,
        data: { sessionId: string; expiresAt: number; transactions: string }
    }> {
        try {
            const response = await axios.post('/deposit-eth', {
                amount,
                mode,
                sender,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async depositOnSolana(
        amount: number,
        mode: number,
        sender: string
    ): Promise<{
        success: boolean,
        message: string
        data: { sessionId: string; expiresAt: number; transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/deposit-sol', {
                amount,
                mode,
                sender,
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async validateETHDeposit(
        sessionId: string, txHash: string
    ): Promise<{
        success: boolean,
        message: string,
        data: { note: string }
    }> {
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

    static async validateSOLDeposit(
        sessionId: string, txHash: string
    ): Promise<{
        success: boolean,
        message: string,
        data: { note: string }
    }> {
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

    static async withdrawSOL(
        note: string, receiver: string
    ): Promise<{
        success: boolean,
        message: string,
        data: { txSig: string }
    }> {
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

    static async withdrawETH(
        note: string, receiver: string
    ): Promise<{
        success: boolean,
        message: string,
        data: { txSig: string }
    }> {
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

    static async setSolMaintainer(
        maintainer: string,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-maintainer', {
                maintainer,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async setSolFeeCollector(
        feeCollector: string,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-feecollector', {
                feeCollector,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async setSolRefund(
        refund: number,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-refund', {
                refund,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async setSolFee(
        fee: number,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-fee', {
                fee,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async setSolMinDepositAmount(
        minAmount: number,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-mindeposit', {
                minAmount,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async setSolMinTokenDepositAmount(
        minAmount: number,
        signer: string
    ): Promise<{
        success: boolean,
        message: string
        data: { transaction: Array<Transaction> }
    }> {
        try {
            const response = await axios.post('/set-sol-mintokendeposit', {
                minAmount,
                signer
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getMixStorageData(): Promise<{
        success: boolean,
        message: string,
        data: {
            maintainer: string,
            feeCollector: string,
            refund: number,
            fee: number,
            minSolDepositAmount: number,
            minTokenDepositAmount: number
        }
    }> {
        try {
            const response = await axios.get('/sol-mixer-storage-data')
            return response.data
        }
        catch (error) {
            throw error
        }
    }
}
