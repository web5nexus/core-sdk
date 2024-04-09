import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import SocialLogin,{EvmRpc} from "@web5nexus/sociallogin";
import {BlockchainType,NetworkOption,Web3AuthParamsType} from "@web5nexus/coretypes";

interface web3AuthContextType {
  connect: () => Promise<SocialLogin | null | undefined>;
  disconnect: () => Promise<void>;
  getUserInfo: () => Promise<any>;
  provider: any;
  ethersProvider: ethers.providers.JsonRpcProvider | null;
  ethersWallet: ethers.Wallet | null;
  web3Provider: ethers.providers.Web3Provider | null;
  loading: boolean;
  chainId: number;
  address: string;
  userInfo: any;
}
export const Web3AuthContext = React.createContext<web3AuthContextType>({
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  getUserInfo: () => Promise.resolve(),
  loading: false,
  provider: null,
  ethersProvider: null,
  ethersWallet: null,
  web3Provider: null,
  chainId: 0,
  address: "",
  userInfo: null,
});
export const useWeb3AuthContext = () => useContext(Web3AuthContext);

export enum SignTypeMethod {
  PERSONAL_SIGN = "PERSONAL_SIGN",
  EIP712_SIGN = "EIP712_SIGN",
}

type StateType = {
  provider?: any;
  web3Provider?: ethers.providers.Web3Provider | null;
  ethersProvider?: ethers.providers.JsonRpcProvider | null;
  ethersWallet?: ethers.Wallet | null;
  address?: string;
  chainId?: number;
  balance?: string
};
const initialState: StateType = {
  provider: null,
  web3Provider: null,
  ethersProvider: null,
  ethersWallet:null,
  address: "",
  chainId: 0,
  balance: ""
};

// Get from https://dashboard.web3auth.io for Saphire Mainnet only
const clientId = "BJ2nx05HJkS2V_E-WtRliS3XaGvsTtWjBD_jNWeI30B15Rb9ienN-pcL0CiTN5PqqnEHBu7mmxi7GvWBUuxId8Y";
const clientSecret = "72122785a8c9e30a4139d4e62da926cb1e4e18bb106a31ec1df40361d837a8f7";
const name = "XDC Auth"
const logo = "https://altcoinsbox.com/wp-content/uploads/2023/03/XDC-logo-.png"
const network :NetworkOption = "sapphire_mainnet";

export const Web3AuthProvider = ({ children }: any) => {
  const [web3State, setWeb3State] = useState<StateType>(initialState);
  const { provider, web3Provider, ethersProvider,ethersWallet, address, chainId } =
    web3State;
  const [loading, setLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState<SocialLogin | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<any>(null);

  const [error, setError] = useState<any>(null);

  // if wallet already connected close widget
  useEffect(() => {
    console.log("hidelwallet");
    if (socialLoginSDK && socialLoginSDK.provider) {
      socialLoginSDK.hideWallet();
    }
  }, [address, socialLoginSDK]);

  const connect = useCallback(async () => {
    try {
      if (address) return;
      if (socialLoginSDK?.provider && socialLoginSDK.web3auth?.connected) {
        // await disconnect();
        setLoading(true);
        console.info("socialLoginSDK.provider", socialLoginSDK.provider);
        const web3Provider = new ethers.providers.Web3Provider(
          socialLoginSDK.provider
        );
        const blockchain:BlockchainType ={
          blockchain:"xinfin",
          network:"mainnet"
        }

        var rpcUrl = "https://erpc.xdcrpc.com";
        const xdcInstance = new EvmRpc(socialLoginSDK.provider,blockchain,rpcUrl)
        const address = await xdcInstance.getAccounts();
        const chainId = await xdcInstance.getChainId();
        const balance = await xdcInstance.getBalance();
        const provider = await xdcInstance.getProvider();
        // console.log(await xdcInstance.sendTransaction("100000000000000","0x6A891eE71b97AEe5f98828Df15dd1BA408A1aF01"))
        console.log("EthersJs Wallet Address",address )
        console.log(await xdcInstance.getWeb3jsWallet())
        // console.log("Web3Js Wallet Address",((await xdcInstance.getWeb3jsWallet()).eth.defaultAccount)) 

        // console.log("Web3Js Wallet Address",((await xdcInstance.getWeb3jsWallet()).eth.accounts.privateKeyToAccount('0x'+ await xdcInstance.getPrivateKey()).address)) 
        setWeb3State({
          provider: socialLoginSDK.provider,
          web3Provider: web3Provider,
          address: address,
          chainId: Number(chainId),
          balance: balance,
        });
        setLoading(false);
        return;
      }
      if (socialLoginSDK) {
        socialLoginSDK.showWallet();
        return socialLoginSDK;
      }
      setLoading(true);
      const whiteLabel = {
        name :name,
        logo :logo
      }
      const params: Web3AuthParamsType={
        type: "web3auth",
        clientId:clientId,
        clientSecret:clientSecret
      }
      const sdk = new SocialLogin(params, whiteLabel);
      const supportedLogin = ['email-passwordless','google','github','facebook','twitter','discord','linkedin','twitch']
      await sdk.init(network,supportedLogin);
      sdk.showWallet();
      setSocialLoginSDK(sdk);
      
      setLoading(false);
      return socialLoginSDK;
    } catch (err) {
      console.error("Connect error:", err);
      setError(err); // Handle and store the error
    }
  }, [address, socialLoginSDK]);

  const getUserInfo = useCallback(async () => {
    if (socialLoginSDK) {
      const userInfo = await socialLoginSDK.getUserInfo();
      console.log("userInfo", userInfo);
      setUserInfo(userInfo);
    }
  }, [socialLoginSDK]);

  // after metamask login -> get provider event
  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [address, connect, socialLoginSDK]);

  const disconnect = useCallback(async () => {
    try {
      if (!socialLoginSDK || !socialLoginSDK.web3auth) {
        console.error("Web3Modal not initialized.");
        return;
      }
      await socialLoginSDK.logout();
      setWeb3State({
        provider: null,
        web3Provider: null,
        ethersProvider: null,
        address: "",
        chainId: 0,
      });
      setUserInfo(null);
      (window as any).getSocialLoginSDK = null;
      socialLoginSDK.hideWallet();
      setSocialLoginSDK(null);
    } catch (err) {
      console.error("Disconnect error:", err);
      setError(err); // Handle and store the error
    }
  }, [socialLoginSDK]);

  return (
    <Web3AuthContext.Provider
      value={{
        connect,
        disconnect,
        getUserInfo,
        loading,
        provider: provider,
        ethersProvider: ethersProvider || null,
        web3Provider: web3Provider || null,
        ethersWallet: ethersWallet || null,
        chainId: chainId || 0,
        address: address || "",
        userInfo,
        
      }}
    >
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        children // Render children if no error
      )}
    </Web3AuthContext.Provider>
  );
};
