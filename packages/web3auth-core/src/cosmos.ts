import { publicKeyCreate } from 'secp256k1';
import createHash from 'create-hash';
import { bech32 } from "bech32";
import type { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
import cosmoschains from 'cosmoschains';
import { Secp256k1HdWallet, Secp256k1Wallet,makeCosmoshubPath } from "@cosmjs/amino";
import { Secp256k1Signature, Secp256k1 } from "@cosmjs/crypto";
import { StargateClient, SigningStargateClient, GasPrice } from "@cosmjs/stargate";
import { fromHex,fromBase64 } from "@cosmjs/encoding";

export default class CosmosRpc {
    public hrp: string;
    public blockchain: string;
    private provider: SafeEventEmitterProvider;
    public rpcTarget: string;
    public client:any;

    constructor(blockchain: string, network: string, provider: SafeEventEmitterProvider) {
        this.blockchain = blockchain;
        this.hrp = this.getHrpValue(blockchain, network);
        this.provider = provider;
        this.rpcTarget = this.getRpcValue(blockchain, network);
    }

    private async initiate():Promise<any>{
        try {
            this.client = await StargateClient.connect(this.rpcTarget);
            return this.client;
        } catch (error) {
            return error as string;
        }
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

    private async CosmosBufferToAddress(pubBuf: any) {
        const sha256_ed = createHash("sha256").update(pubBuf).digest();
        const ripemd160_ed = createHash("rmd160").update(sha256_ed).digest();
        return bech32.encode(this.hrp, bech32.toWords(ripemd160_ed));
    }

    private async publicaddress() {
        try {
            const privateKey = await this.getPrivateKey();
            const privateKeyBuffer = Buffer.from(privateKey.slice(2), 'hex');
            const cosmosWalletPubKey = publicKeyCreate(privateKeyBuffer, true);
            const walletAddress = await this.CosmosBufferToAddress(cosmosWalletPubKey);
            return walletAddress;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAccounts(): Promise<any> {
        try {
            const address = await this.publicaddress();
            return address;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getBalance(): Promise<string> {
        try {
            const client = await this.initiate();

            // Get user's Cosmos public address
            const address = await this.getAccounts();
            const balance = await client.getAllBalances(address);

            return balance;
        } catch (error) {
            return error as string;
        }
    }

    async getChainId(): Promise<string> {
        try {
            const client = await this.initiate();

            // Get the connected Chain's ID
            const chainId = await client.getChainId();

            return chainId.toString();
        } catch (error) {
            return error as string;
        }
    }

    async getPrivateKey(): Promise<string> {
        try {
            const privateKey = await this.provider.request({
                method: "eth_private_key",
            });

            return "0x" + privateKey;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
