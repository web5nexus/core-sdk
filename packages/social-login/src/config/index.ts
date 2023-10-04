import CosmosRpc from './cosmos'
import EvmRpc from './evm';
export type {
    CHAIN_NAMESPACES,
    SafeEventEmitterProvider,
    WALLET_ADAPTERS,
} from "@web3auth/base";

import evmchains from './evmchains'
import cosmoschains from './cosmoschains';

export default {EvmRpc,CosmosRpc, evmchains, cosmoschains}