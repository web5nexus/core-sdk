import XdcRpc from './xdc';
import CosmosRpc from './cosmos'
export type {
    CHAIN_NAMESPACES,
    SafeEventEmitterProvider,
    WALLET_ADAPTERS,
} from "@web3auth/base";

import evmchains from './evmchains'
import cosmoschains from './cosmoschains';

export default {evmchains, cosmoschains, XdcRpc,CosmosRpc};
