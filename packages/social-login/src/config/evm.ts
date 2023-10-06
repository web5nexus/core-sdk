import type { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers} from "ethers";
import {BlockchainType, ChainConfig, evmchains } from '@web5nexus/coretypes';


export default class EvmRpc {
    private provider: SafeEventEmitterProvider;
    private chainConfigs: ChainConfig | undefined;
    private blockchain: any;

    constructor(provider: SafeEventEmitterProvider,params: BlockchainType) {
        this.provider = provider;
        this.blockchain = params.blockchain;
        
        if (!(params.blockchain && params.network)) {
            throw new Error("Both Blockchain and network must be provided.");
          }
      
          this.chainConfigs = evmchains.find((chain) => chain.blockchain === params.blockchain && chain.network === params.network);
      
          if (!this.chainConfigs) {
            throw new Error(
              `Chain configuration not found for blockchain: ${params.blockchain || ""} and network: ${params.network || ""}`
            );
          }
          
    }

    async getChainId(): Promise<string> {
        try {

            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);

            // Get the connected Chain's ID
            const chainId = await wallet.getChainId();

            return chainId.toString();
        } catch (error) {
            return error as string;
        }
    }

    async getAccounts(): Promise<any> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);


            // Get user's Ethereum public address
            var address = (await wallet.getAddress());
            if(this.blockchain=="xinfin"){
                const prefix = 'xdc'
                address = prefix + String(address).slice(2)
            }
            return address;
        } catch (error) {
            return error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);

            // Get user's Ethereum public address
            const address = (await wallet.getAddress());

            // Get user's balance in ether
            const balance = ethers.utils.formatEther(await wallet.getBalance(address));

            return balance;
        } catch (error) {
            return error as string;
        }
    }

    async sendTransaction(amountInWei: string, toAddress: string, maxPriorityFeePerGas?: string, maxFeePerGas?: string): Promise<any> {
        try {
            
           
            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);

            // Get user's Ethereum public address
            const fromAddress = (await wallet.getAddress());

            const destination = toAddress;

            const amount = amountInWei; // Convert 1 ether to wei
            // Set default values if not provided
            const defaultMaxPriorityFeePerGas = "5000000000";
            const defaultMaxFeePerGas = "6000000000000";

            // Use provided values or default values
            const priorityFeePerGas = maxPriorityFeePerGas !== undefined ? maxPriorityFeePerGas: defaultMaxPriorityFeePerGas;
            const feePerGas = maxFeePerGas !== undefined ? maxFeePerGas : defaultMaxFeePerGas;

            // Submit transaction to the blockchain and wait for it to be mined
            const receipt = await wallet.sendTransaction({
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

            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);


            const originalMessage = "Hello Web5";

            // Sign the message
            const signedMessage = await wallet.signMessage(
                originalMessage
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

    async getWalletInstance(): Promise<ethers.Wallet> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)
            var wallet = new ethers.Wallet(await this.getPrivateKey(),provider);

            return wallet;
        } catch (error) {
            return error as any;
        }
    }

    async getProvider(): Promise<ethers.providers.JsonRpcProvider> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.chainConfigs?.rpcTarget)

            return provider;
        } catch (error) {
            return error as any;
        }
    }
}
