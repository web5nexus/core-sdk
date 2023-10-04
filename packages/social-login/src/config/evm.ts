import type { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";

export default class EvmRpc {
    private provider: SafeEventEmitterProvider;

    constructor(provider: SafeEventEmitterProvider) {
        this.provider = provider;
    }

    async getChainId(): Promise<string> {
        try {
            const web3 = new Web3(this.provider as any);

            // Get the connected Chain's ID
            const chainId = await web3.eth.getChainId();

            return chainId.toString();
        } catch (error) {
            return error as string;
        }
    }

    async getAccounts(): Promise<any> {
        try {
            const web3 = new Web3(this.provider as any);

            // Get user's Ethereum public address
            var address = (await web3.eth.getAccounts())[0];
            return address;
        } catch (error) {
            return error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            const web3 = new Web3(this.provider as any);

            // Get user's Ethereum public address
            const address = (await web3.eth.getAccounts())[0];

            // Get user's balance in ether
            const balance = web3.utils.fromWei(
                await web3.eth.getBalance(address),
                "ether"
            );

            return balance;
        } catch (error) {
            return error as string;
        }
    }

    async sendTransaction(amountInWei: string, toAddress: string, maxPriorityFeePerGas?: string, maxFeePerGas?: string): Promise<any> {
        try {
            const web3 = new Web3(this.provider as any);

            // Get user's Ethereum public address
            const fromAddress = (await web3.eth.getAccounts())[0];

            const destination = toAddress;

            const amount = amountInWei; // Convert 1 ether to wei
            // Set default values if not provided
            const defaultMaxPriorityFeePerGas = "5000000000";
            const defaultMaxFeePerGas = "6000000000000";

            // Use provided values or default values
            const priorityFeePerGas = maxPriorityFeePerGas !== undefined ? maxPriorityFeePerGas: defaultMaxPriorityFeePerGas;
            const feePerGas = maxFeePerGas !== undefined ? maxFeePerGas : defaultMaxFeePerGas;

            // Submit transaction to the blockchain and wait for it to be mined
            const receipt = await web3.eth.sendTransaction({
                from: fromAddress,
                to: destination,
                value: amount,
                maxPriorityFeePerGas: priorityFeePerGas, // Max priority fee per gas
                maxFeePerGas: feePerGas, // Max fee per gas
            });

            return receipt;
        } catch (error) {
            return error as string;
        }
    }

    async signMessage() {
        try {
            const web3 = new Web3(this.provider as any);

            // Get user's Ethereum public address
            const fromAddress = (await web3.eth.getAccounts())[0];

            const originalMessage = "Hello Web5";

            // Sign the message
            const signedMessage = await web3.eth.personal.sign(
                originalMessage,
                fromAddress,
                "test password!" // configure your own password here.
            );

            return signedMessage;
        } catch (error) {
            return error as string;
        }
    }

    async getPrivateKey(): Promise<any> {
        try {
            const privateKey = await this.provider.request({
                method: "eth_private_key",
            });

            return privateKey;
        } catch (error) {
            return error as string;
        }
    }
}