export interface CosmosChainConfig {
  blockchain: string;
  hrp: string;
  network: string;
  rpcTarget: string;
}

const cosmoschains: CosmosChainConfig[] = [
  {
    blockchain: "coreum",
    hrp: "testcore",
    network: "testnet",
    rpcTarget: "https://full-node.testnet-1.coreum.dev:2665"
  }, {
    blockchain: "coreum",
    hrp: "core",
    network: "mainnet",
    rpcTarget: "https://full-node.mainnet-1.coreum.dev:26657"
  },{
    blockchain: "cosmos",
    hrp: "cosmos",
    network: "mainnet",
    rpcTarget: "https://full-node.testnet-1.coreum.dev:2665"
  },
];

export default cosmoschains;
