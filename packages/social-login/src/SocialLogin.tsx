/* eslint-disable no-console */
import React from "react";
import { createRoot } from "react-dom/client";
import { ethers } from "ethers";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
// import QRCodeModal from "@walletconnect/qrcode-modal";
import { whitelistUrl } from "@toruslabs/openlogin";
import {
  WalletConnectV2Adapter,
  getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { WalletConnectModal } from "@walletconnect/modal";
import UI from "./UI";
import { NetworkOption,Web3AuthParamsType, SocialLoginDTO, WhiteLabelDataType } from "@web5nexus/coretypes";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";

function createLoginModal(socialLogin: SocialLogin): void {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const root = createRoot((document as any).getElementById("w3a-modal"));
  root.render(<UI socialLogin={socialLogin} />);
}

class SocialLogin {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  walletDiv: any;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  walletIframe: any;

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  iWin: any = false;

  iframeInitialized = false;

  isInit = false;

  Web3AuthParams: Web3AuthParamsType;

  whiteLabel: WhiteLabelDataType;

  userInfo: Partial<UserInfo> | null = null;

  web3auth: Web3AuthNoModal | null = null;

  provider: SafeEventEmitterProvider | null = null;

  constructor(params: Web3AuthParamsType,whiteLabel?:WhiteLabelDataType) {
    this.createWalletDiv();
    this.isInit = false;
    this.web3auth = null;
    this.provider = null;
    this.Web3AuthParams={
      type: 'web3auth',
      clientId: params.clientId,
      clientSecret: params.clientSecret
    }

    this.whiteLabel = {
      name: whiteLabel?.name==null?"Web5 Auth":whiteLabel.name,
      logo: whiteLabel?.logo==null?"https://lh3.googleusercontent.com/fife/AK0iWDzoYTHWdtLQSNfP9DYeb2gS0gIhIv5NWJGErMZL6z5aEt3ycyUq6itUGwortM_7cbWhFHascxn7IoiQ_-y9PVBESJoO9V4oxCQtx2BCwqWIrXxoy26wVROxLeMtxhj249AK3chtlcUOMX2ajkiSKGfyglO1Vrnt0nJfJHv6VguwTJ0nBATxi6S4d0EGmwtPvGE1_iHNY_1Pd_pFinTW2rIgkTXILhEc00wzwTwAz0QQFWys2KcJ4-Bvk7dvMOcOSZ9ZtH8-yQOtygCFByX4jq6RSPdTpvLOuLVHGCirpDsSmhK4v0rjr0aj9ryniOVBVGriXkEYyZ91bQogkIQXkxjkZU7PSKqOdNNK3UYXr14-EKE8vEq-kUzXa7am6mc9guP5T-BBpQNtFeDTZidNuqIGNkccyttsKXpyhYutrfd8dHbTkQg6GEUtkKLyUHbdJA4mjCWfDygoL2BhoxR3kNsaVb0H-WWHEDlU34kgBFis-OlpuAi_JEXKfaQ2Pwq1aXcOgKVS72mQiVQ1YMIyjwwBpSmEV0xHGxmgwuuQ-aHKGE5wGOEsyXdvkYw_hhScJ1-EoI-A0csR1y63XU2jrPI9HohdMOJ61clGAE7OBz3vGa5ayqAJ_QaUuCLbXVA6JOy6CJmyhD47rLe6-JMypcmmOu5EmilmVwwRGEPmL44RoEQj8OvGejtpVX-sbq8y_KweyfO7e9FmS_mJwbfauMuCGLAOD228QOHhNEiwCef7PWDxIuiwn7TU-mnKpifdQ9TdNWrJDSTqRlIA72cJE9BgBqVdR5rjxpg-wjOnkbnnrWVDEWGZadKQNmwDX_thC2S6S6hvy7AQlSOx_scCie35tBC5kJd1uFJPRd1JJ3IPoOMfY7qCBNmL9lKjhSEIlGRqUB55tg9P2K55Y4FMHQa-wf9LNOkNY0tjjlb9ReJTlr6t4seMo35p0SPvqF1z6BcpQ2kSu-xI83yA_cxQ5aNkfMupTf_X0r9Ux_z-o-1ezulR2aXzDgEkVZoqLNAsNPdeC90XZAMpZdhUODADDBT_OEoqPOBbyRuzvd-zN6fsKQxB0Sinkq-e-RvwzD57redO6g8uyb4U-jcotvb7kCx5id1MgAhp6raiuft94XUhkLXR-1MzCFn4ZgGXvHB8UnVSSpFZLo7BexMaIgwE2bXVA8Pw1srlVgz6lzZiJj6OiyqUY4cxkiGE035ft5sSxZKUwEMHydNW4SM9UVWxyQ53e_P0mGXi2eLioSSkJrK7eQsDjEwH9O5-LZsk6EbLQZZLB9xR7fSKnfok1uYoy1KaF9lI2W9ophnMUC4XgqiqPTo-kXMbMMNXt7OtucGOOLko266nIBR_uoTz7RKSxAybocv-Ja8epQApqe7KWWAMEx-0ma6QadJVTHx4n-5wGymNaUhAzo122DHpD-jWIkkryFFSU9uUh9xFCuB4lGmCDJ-emlWdzMQENsNrY7coawlJGGIDe1uMQ1t06q5ZIHi66KM8a-8t-pfC39TB9UZutVFMBSAYP7GqMSN1Rl2yocoq4HAfbgJNttgck5fJQQh8xpke5UixONqiRf_chKkwK-EIbApjY9UvI25go3DnqLAguJ5Qfw0jinxPeor4GMAuhjmD5IYp2ep_ZEdRdKQKS-gyDviV9h1PLlE2bFLXd6hudP1UFmxGv4lLAH_cQsgADMfEdK_yoWfGCBOQ7IGm16GYDjk3L5_ecjKqVqFFrnn1TNy1c5uY7gWQ86L40DF-q5osRwoFz3mSNn_pMWQJb_6nWzs8AVnYMtQLKeESfMzFDpoyvwgp4NGqTTHELSp2ZWrhnR4Zo0eqG_XByqdslJlu1IfAE8T-s-vTgydsjNGFlXMRuaZzC9Br-KpmCT-gXtdg=w400-h380-p-k-rw-nu-v1":whiteLabel.logo
    };
  }

  async whitelistUrl(origin: string): Promise<string> {
    const whiteListUrlResponse = await whitelistUrl(this.Web3AuthParams.clientId, this.Web3AuthParams.clientSecret, origin);;
    return whiteListUrlResponse;
  }

  async init(network?:NetworkOption, socialLoginDTO?: Partial<SocialLoginDTO>): Promise<void> {
    const finalDTO: SocialLoginDTO = {
      chainId: "0x1",
      whitelistUrls: {},
      network: "sapphire_mainnet",
      whteLableData: this.whiteLabel,
    };
    if (socialLoginDTO) {
      if (socialLoginDTO.chainId) finalDTO.chainId = socialLoginDTO.chainId;
      if (socialLoginDTO.network) finalDTO.network = socialLoginDTO.network;
      if (socialLoginDTO.whitelistUrls) finalDTO.whitelistUrls = socialLoginDTO.whitelistUrls;
      if (socialLoginDTO.whteLableData) this.whiteLabel = socialLoginDTO.whteLableData;
      if (network) finalDTO.network = network;
    }

    

    try {
      const web3AuthCore = new Web3AuthNoModal({
        clientId: this.Web3AuthParams.clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0X1",
          rpcTarget: "https://rpc.ankr.com/eth"
        },
      });

      const chainConfigEvm = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0X1",
        rpcTarget: "https://rpc.ankr.com/eth",
        network:"mainnet",
        displayName:"Ethereum Mainnet",
        blockExplorer:"https://etherscan.io/",
        ticker:"ETH",
        tickerName:"Ethereum"
      };

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig: chainConfigEvm },
      });



      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          clientId: this.Web3AuthParams.clientId,
          network: finalDTO.network,
          uxMode: "popup",
          originData: finalDTO.whitelistUrls,
        },
        privateKeyProvider
      });
      const metamaskAdapter = new MetamaskAdapter({
        clientId: this.Web3AuthParams.clientId,
      });
      // adding wallet connect v2 adapter
      const defaultWcSettings = await getWalletConnectV2Settings(
        "eip155",
        [1],
        "04309ed1007e77d1f119b85205bb779d"
      );
      const walletConnectModal = new WalletConnectModal({ projectId: "04309ed1007e77d1f119b85205bb779d" });
      const walletConnectV2Adapter = new WalletConnectV2Adapter({
        adapterSettings: {
          qrcodeModal: walletConnectModal,
          ...defaultWcSettings.adapterSettings,
        },
        loginSettings: { ...defaultWcSettings.loginSettings },
      });

      web3AuthCore.configureAdapter(walletConnectV2Adapter);
      web3AuthCore.configureAdapter(openloginAdapter);
      web3AuthCore.configureAdapter(metamaskAdapter);
      await web3AuthCore.init();
      this.web3auth = web3AuthCore;
      if (web3AuthCore && web3AuthCore.provider) {
        this.provider = web3AuthCore.provider;
      }
      createLoginModal(this);
      this.isInit = true;
    } catch (error) {
      console.error(error);
    }
  }

  getProvider(): SafeEventEmitterProvider | null {
    return this.provider;
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private _createIframe(iframeContainerDiv: any): void {
    this.walletIframe = document.createElement("iframe");
    this.walletIframe.style.display = "none";
    this.walletIframe.style.display = "relative";
    this.walletIframe.onload = () => {
      this.iWin = this.walletIframe.contentWindow || this.walletIframe;
      this.iframeInitialized = true;
    };
    iframeContainerDiv.appendChild(this.walletIframe);
  }

  private createWalletDiv(): void {
    // create a fixed div into html but keep it hidden initially
    const walletDiv = document.createElement("div");
    walletDiv.id = "w3a-modal";
    walletDiv.className = "w3a-modal w3a-modal--light";
    walletDiv.style.display = "none";
    walletDiv.style.position = "fixed";
    walletDiv.style.top = "0";
    walletDiv.style.right = "0";
    walletDiv.style.height = "100%";
    walletDiv.style.width = "100%";
    walletDiv.style.background = "rgba(33, 33, 33, 0.75)";
    walletDiv.style.zIndex = "100";
    this.walletDiv = walletDiv;
    // insert div into top of body.
    document.body.insertBefore(walletDiv, document.body.firstChild);
    this._createIframe(walletDiv);
  }

  showWallet(): void {
    this.walletDiv.style.display = "block";
    this.walletIframe.style.display = "block";
    // Set height and width of the iframe to 600x341
    this.walletIframe.style.height = "600px";
    this.walletIframe.style.width = "341px";
    this.walletIframe.style.border = "0px";
    this.walletIframe.style.borderRadius = "3%";
    const el = document.getElementById("w3a-modal");
    el?.dispatchEvent(new Event("show-modal"));
  }

  hideWallet(): void {
    this.walletDiv.style.display = "none";
    this.walletIframe.style.display = "none";
  }

  async getUserInfo(): Promise<Partial<UserInfo> | null> {
    if (this.web3auth) {
      const userInfo = await this.web3auth.getUserInfo();
      this.userInfo = userInfo;
      return userInfo;
    }
    return null;
  }

  async getPrivateKey(): Promise<string | null> {
    if (this.web3auth && this.web3auth.provider) {
      const privateKey = await this.web3auth.provider.request({
        method: "eth_private_key",
      });
      return privateKey as string;
    }
    return null;
  }

  async socialLogin(loginProvider: string): Promise<SafeEventEmitterProvider | null> {
    if (!this.web3auth) {
      console.info("web3auth not initialized yet");
      return null;
    }
    if (this.web3auth.connected) {
      this.logout();
    }

    try {
      const web3authProvider = await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: loginProvider,
      });
      if (!web3authProvider) {
        console.error("web3authProvider is null");
        return null;
      }
      const web3Provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      // const network = await web3Provider.getNetwork();
      console.info(`EOA Address ${gotAccount}`);
      this.provider = web3authProvider;
      return web3authProvider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async emailLogin(email: string): Promise<SafeEventEmitterProvider | null> {
    if (!this.web3auth) {
      console.info("web3auth not initialized yet");
      return null;
    }
    try {
      const web3authProvider = await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "email_passwordless",
        login_hint: email,
      });
      if (!web3authProvider) {
        console.error("web3authProvider is null");
        return null;
      }
      const web3Provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      // const network = await web3Provider.getNetwork();
      console.info(`EOA Address ${gotAccount}`);
      this.provider = web3authProvider;
      return web3authProvider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async phoneLogin(phone: string): Promise<SafeEventEmitterProvider | null> {
    if (!this.web3auth) {
      console.info("web3auth not initialized yet");
      return null;
    }
    try {
      const web3authProvider = await this.web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "sms_passwordless",
        login_hint: phone,
      });
      if (!web3authProvider) {
        console.error("web3authProvider is null");
        return null;
      }
      const web3Provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      // const network = await web3Provider.getNetwork();
      console.info(`EOA Address ${gotAccount}`);
      this.provider = web3authProvider;
      return web3authProvider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async metamaskLogin(): Promise<SafeEventEmitterProvider | null> {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return null;
    }
    try {
      const web3authProvider = await this.web3auth.connectTo(WALLET_ADAPTERS.METAMASK);
      if (!web3authProvider) {
        console.log("web3authProvider is null");
        return null;
      }
      const web3Provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      // const network = await web3Provider.getNetwork();
      console.info(`EOA Address ${gotAccount}`);
      this.provider = web3authProvider;
      return web3authProvider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async walletConnectLogin(): Promise<SafeEventEmitterProvider | null> {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return null;
    }
    try {
      const web3authProvider = await this.web3auth.connectTo(WALLET_ADAPTERS.WALLET_CONNECT_V2);
      if (!web3authProvider) {
        console.log("web3authProvider is null");
        return null;
      }
      const web3Provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      // const network = await web3Provider.getNetwork();
      console.info(`EOA Address ${gotAccount}`);
      this.provider = web3authProvider;
      return web3authProvider;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async logout(): Promise<void> {
    if (!this.web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await this.web3auth.logout();
    this.web3auth.clearCache();
    this.provider = null;
  }
}

// const socialLoginSDK: SocialLogin = new SocialLogin(this.clientId,this.clientSecret);
// (window as any).socialLoginSDK = socialLoginSDK;

export default SocialLogin;

// let initializedSocialLogin: SocialLogin | null = null;
// const getSocialLoginSDK = async (socialLoginDTO?: Partial<SocialLoginDTO>): Promise<SocialLogin> => {
//   if (initializedSocialLogin) {
//     return initializedSocialLogin;
//   }
//   await socialLoginSDK.init("ethereum", "eth", socialLoginDTO);
//   initializedSocialLogin = socialLoginSDK;
//   return socialLoginSDK;
// };

// export { socialLoginSDK, getSocialLoginSDK };
