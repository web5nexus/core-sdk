export interface CosmosChainConfig {
  blockchain: string;
  hrp: string;
  network: string;
}

const cosmoschains: CosmosChainConfig[] = [
  {
    blockchain: "coreum",
    hrp: "testcore",
    network: "testnet"
  }, {
    blockchain: "coreum",
    hrp: "core",
    network: "mainnet"
  },{
    blockchain: "cosmos",
    hrp: "cosmos",
    network: "mainnet"
  },
];

export default cosmoschains;
