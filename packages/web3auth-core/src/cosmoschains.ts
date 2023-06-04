export interface CosmosChainConfig {
  blockchain: string;
  hrp: string;
  network: string;
  rpcTarget: string;
  denom: string;
}

const cosmoschains: CosmosChainConfig[] = [
  {
    blockchain: "coreum",
    hrp: "testcore",
    network: "testnet",
    rpcTarget: "https://full-node.testnet-1.coreum.dev:26657",
    denom:"utestcore"
  }, {
    blockchain: "coreum",
    hrp: "core",
    network: "mainnet",
    rpcTarget: "https://full-node.mainnet-1.coreum.dev:26657",
    denom:"ucore"
  },{
    blockchain: "cosmos",
    hrp: "cosmos",
    network: "mainnet",
    rpcTarget: "https://rpc.sentry-02.theta-testnet.polypore.xyz",
    denom:"uatom"
  },
];

export default cosmoschains;
