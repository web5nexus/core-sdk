import XdcRpc from './xdc';
import CosmosRpc from './cosmos'
import {Web5} from './social'
export type { Web3AuthNoModal } from "@web3auth/no-modal";
export type {
    CHAIN_NAMESPACES,
    SafeEventEmitterProvider,
    WALLET_ADAPTERS,
} from "@web3auth/base";

export default {Web5,XdcRpc,CosmosRpc};
export {web5walletconnect} from './walletconnect'