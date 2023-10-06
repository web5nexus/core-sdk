import type { SafeEventEmitterProvider } from "@web3auth/base";
import {BlockchainType,cosmoschains} from '@web5nexus/coretypes';
import { StargateClient, SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import {
    DirectSecp256k1Wallet,
    OfflineDirectSigner,
} from "@cosmjs/proto-signing";

export default class CosmosRpc {
    public hrp: string;
    public blockchain: string;
    private provider: SafeEventEmitterProvider;
    public rpcTarget: string;
    public denom: string;

    constructor(params:BlockchainType, provider: SafeEventEmitterProvider) {
        this.blockchain = params.blockchain;
        this.hrp = this.getHrpValue(params.blockchain, params.network);
        this.provider = provider;
        this.rpcTarget = this.getRpcValue(params.blockchain, params.network);
        this.denom = this.getDenomValue(params.blockchain, params.network);
    }

    private getHrpValue(blockchain: string, network: string): string {
        blockchain = blockchain.toLowerCase();
        network = network.toLowerCase();
        const chain = cosmoschains.find(chain => chain.blockchain === blockchain && chain.network === network);
        if (chain) {
            return chain.hrp;
        }
        throw new Error(`Could not find hrp value for the specified blockchain (${blockchain}) and network (${network}) combination.`);
    }

    private getRpcValue(blockchain: string, network: string): string {
        blockchain = blockchain.toLowerCase();
        network = network.toLowerCase();
        const chain = cosmoschains.find(chain => chain.blockchain === blockchain && chain.network === network);
        if (chain) {
            return chain.rpcTarget;
        }
        throw new Error(`Could not find RPC Target value for the specified blockchain (${blockchain}) and network (${network}) combination.`);
    }

    private getDenomValue(blockchain: string, network: string): string {
        blockchain = blockchain.toLowerCase();
        network = network.toLowerCase();
        const chain = cosmoschains.find(chain => chain.blockchain === blockchain && chain.network === network);
        if (chain) {
            return chain.denom;
        }
        throw new Error(`Could not find Denom value for the specified blockchain (${blockchain}) and network (${network}) combination.`);
    }

    async getAccounts(): Promise<any> {
        try {
            const privateKey = Buffer.from(await this.getPrivateKey(), "hex");
            const walletPromise = await DirectSecp256k1Wallet.fromKey(
                privateKey,
                this.hrp
            );
            return (await walletPromise.getAccounts())[0].address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBalance(): Promise<any> {
        try {
            const client = await StargateClient.connect(this.rpcTarget);
            // Get user's Cosmos public address
            const privateKey = Buffer.from(await this.getPrivateKey(), "hex");
            const walletPromise = await DirectSecp256k1Wallet.fromKey(
                privateKey,
                this.hrp
            );
            const address = (await walletPromise.getAccounts())[0].address;
            const balanceResponse = await client.getAllBalances(address);
            const balance = balanceResponse.find(b => b.denom === this.denom);
            return balance ? balance.amount : "0";
        } catch (error) {
            return error as string;
        }
    }

    async getChainId(): Promise<string> {
        try {
            const client = await StargateClient.connect(this.rpcTarget);

            // Get the connected Chain's ID
            const chainId = await client.getChainId();

            return chainId.toString();
        } catch (error) {
            return error as string;
        }
    }

    async getPrivateKey(): Promise<any> {
        try {
            return await this.provider.request({
                method: "eth_private_key",
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async sendTransaction(amount: string, toAddress: string, gasFee?:string, gasLimit?: string): Promise<any> {
        try {
            await StargateClient.connect(this.rpcTarget);
            const privateKey = Buffer.from(await this.getPrivateKey(), "hex");
            const walletPromise = await DirectSecp256k1Wallet.fromKey(
                privateKey,
                this.hrp
            );
            const fromAddress = (await walletPromise.getAccounts())[0].address;

            const destination = toAddress;

            const defaultGas = "100000";
            const gasLimits = gasLimit !== undefined ? gasLimit : defaultGas;

            const defaultFee = "4000";
            const gasFees = gasFee !== undefined ? gasFee : defaultFee;

            const getSignerFromKey = async (): Promise<OfflineDirectSigner> => {
                return DirectSecp256k1Wallet.fromKey(privateKey, this.hrp);
            };
            const signer: OfflineDirectSigner = await getSignerFromKey();

            const signingClient = await SigningStargateClient.connectWithSigner(
                this.rpcTarget,
                signer
            );
            const result = await signingClient.sendTokens(
                fromAddress,
                destination,
                [{ denom: this.denom, amount: amount }],
                {
                    amount: [{ denom: this.denom, amount: gasFees }],
                    gas: gasLimits,
                }
            );
            const transactionHash = result.transactionHash;
            const height = result.height;
            return { transactionHash, height };
        } catch (error) {
            return error as string;
        }
    }
}