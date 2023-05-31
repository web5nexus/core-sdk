export interface ChainConfig {
  blockchain: string;
  symbol: string;
  chainId: string;
  rpcTarget: string;
}

const chains: ChainConfig[] = [
  {
    blockchain: "xinfin",
    symbol: "xdc",
    chainId: "0X32",
    rpcTarget: "https://rpc.xinfin.network",
  }, {
    blockchain: "ethereum",
    symbol: "eth",
    chainId: "0X1",
    rpcTarget: "https://rpc.ankr.com/eth",
  },
];

export default chains;
