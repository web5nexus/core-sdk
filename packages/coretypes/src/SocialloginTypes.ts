export type DefaultSocialLoginConfig = {
    backendUrl: string;
  };
  
  export type WhiteLabelDataType = {
    name: string;
    logo: string;
  };

  export type BlockchainType = {
    blockchain: string;
    network: string;
  };
  
  export type typeOption = "web3auth" | "arcana";
  
  export type Web3AuthParamsType = {
    type: typeOption;
    clientId: string;
    clientSecret: string;
  };
  
  export type NetworkOption = "sapphire_mainnet" | "sapphire_devnet" | "cyan" | "mainnet" | "testnet" | "aqua" ;
  
  export type SocialLoginDTO = {
    chainId: string;
    whitelistUrls: { [P: string]: string };
    network: NetworkOption;
    whteLableData: WhiteLabelDataType;
  };
  