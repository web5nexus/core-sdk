export type DefaultSocialLoginConfig = {
  backendUrl: string;
};

export type WhiteLabelDataType = {
  name: string;
  logo: string;
};

export type SocialLoginDTO = {
  chainId: string;
  whitelistUrls: { [P: string]: string };
  network: "sapphire_mainnet" | "sapphire_devnet";
  whteLableData: WhiteLabelDataType;
};
