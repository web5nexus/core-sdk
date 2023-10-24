import type { SafeEventEmitterProvider } from "@web3auth/base";
import { Wallet, ethers } from "ethers";
import { BlockchainType, ChainConfig, evmchains } from '@web5nexus/coretypes';
import { Web3 } from "web3";

export default class EvmRpc {
    private provider: SafeEventEmitterProvider;
    private chainConfigs: ChainConfig | undefined;
    private blockchain: any;
    private rpcUrl: any;

    constructor(provider: SafeEventEmitterProvider, params?: BlockchainType, rpcUrl?: string) {
        this.provider = provider;
        this.blockchain = params?.blockchain;
        this.rpcUrl = rpcUrl;

        this.chainConfigs = evmchains.find((chain) => chain.blockchain === params?.blockchain && chain.network === params.network);

        if (!this.chainConfigs) {
            this.chainConfigs = evmchains.find((chain) => chain.blockchain === "ethereum" && chain.network === "mainnet");
        }

    }

    async getChainId(): Promise<string> {
        try {

            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            // Get the connected Chain's ID
            const chainId = await wallet.getChainId();

            return chainId.toString();
        } catch (error) {
            return error as string;
        }
    }

    async getAccounts(): Promise<any> {
        try {

            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            // Get user's Ethereum public address
            var address = await wallet.getAddress();
            var chainId = await this.getChainId()
            if (this.blockchain == "xinfin" || chainId == '50' || chainId == '51') {
                const prefix = 'xdc'
                address = prefix + String(address).slice(2)
            }
            return address;
        } catch (error) {
            return error;
        }
    }


    async xdcToEvm(): Promise<any> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            // Get user's Ethereum public address
            var address = await wallet.getAddress();
            return address;
        } catch (error) {
            return error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            // Get user's Ethereum public address
            const address = await wallet.getAddress();

            // Get user's balance in ether
            const balance = ethers.utils.formatEther(await provider.getBalance(address));

            return balance;
        } catch (error) {
            return error as string;
        }
    }

    async sendTransaction(amountInWei: string, toAddress: string, maxPriorityFeePerGas?: string, maxFeePerGas?: string): Promise<any> {
        try {



            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            // Get user's Ethereum public address
            const fromAddress = await wallet.getAddress();

            const destination = toAddress;

            const amount = amountInWei; // Convert 1 ether to wei
            // Set default values if not provided
            const defaultMaxPriorityFeePerGas = "5000000000";
            const defaultMaxFeePerGas = "6000000000000";

            // Use provided values or default values
            const priorityFeePerGas = maxPriorityFeePerGas !== undefined ? maxPriorityFeePerGas : defaultMaxPriorityFeePerGas;
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

            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

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

    async getPrivateKey(): Promise<string> {
        try {
            const privateKey = await this.provider.request({
                method: "eth_private_key",
            });

            return String(privateKey);
        } catch (error) {
            return error as string;
        }
    }


    async getProvider(): Promise<ethers.providers.JsonRpcProvider> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);

            return provider;
        } catch (error) {
            return error as any;
        }
    }

    async getEthersWallet(): Promise<ethers.Wallet> {
        try {
            var provider = new ethers.providers.JsonRpcProvider(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);
            var wallet = new ethers.Wallet(await this.getPrivateKey(), provider)
            wallet.connect(provider);


            return wallet;
        } catch (error) {
            return error as any;
        }
    }

    async getWeb3jsWallet(): Promise<Web3> {
        try {
            const privateKey = await this.getPrivateKey();
            const web3Provider = new Web3(this.rpcUrl != null ? this.rpcUrl : this.chainConfigs?.rpcTarget);

            const account = web3Provider.eth.accounts.privateKeyToAccount('0x'+privateKey);

            // Set the account as the default account for the web3Provider
            web3Provider.eth.defaultAccount = account.address;

            return web3Provider;
        } catch (error) {
            return error as any;
        }
    }
}
