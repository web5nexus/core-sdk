import secp256k1 from 'secp256k1';
import createHash from 'create-hash'
import { bech32 } from "bech32";
import EthUtil from "ethereumjs-util"
// import { DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
// import { stringToPath } from "@cosmjs/crypto";
// import utxolib from '@bitgo/utxo-lib';
// import bip39 from 'bip39';
// import { Keccak256 } from "@iov/crypto";
// import { Address} from "@iov/bcp";
// import { toAscii, toHex } from "@iov/encoding";
// import { Buffer } from 'safe-buffer'


export default class Cosmos {
    public hrp: string;
    public blockchain: string; 
    private privatekey0x:string;

    constructor(blockchain:string,hrp: string,privatekey0x:string) {
        this.blockchain = blockchain;
        this.hrp = hrp;
        this.privatekey0x=privatekey0x;
    }

    async CosmosBufferToAddress(pubBuf: any) {
        const sha256_ed = createHash("sha256").update(pubBuf).digest();
        const ripemd160_ed = createHash("rmd160").update(sha256_ed).digest();
        return bech32.encode(this.hrp, bech32.toWords(ripemd160_ed));
    }

    async publicaddress(){
        const privateKeyBuffer = EthUtil.toBuffer(this.privatekey0x);
        const cosmosWalletPubKey = secp256k1.publicKeyCreate(privateKeyBuffer, true);
        const walletAddress = this.CosmosBufferToAddress(cosmosWalletPubKey);
        return walletAddress
    }

    async privatekey(){
        return this.privatekey0x;
    }

}

