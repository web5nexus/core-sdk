import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  CHAIN_NAMESPACES,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletConnectV2Adapter, getWalletConnectV2Settings } from "@web3auth/wallet-connect-v2-adapter";
import QRCodeModal from "@walletconnect/qrcode-modal";


export async function web5auth(
    clientId: string,
    network: string
) {
    try {
      const web3auth = new Web3AuthNoModal({
        clientId,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0X1",
          rpcTarget: "https://rpc.ankr.com/eth", 
        },
        web3AuthNetwork: network=="TESTNET"?"testnet":"cyan",
      });

      const openloginAdapter = new OpenloginAdapter(
        {
          adapterSettings: {
            whiteLabel: {
              name: "Web5 Nexus Login - Secured by Web3Auth",
              logoLight: "https://i.ibb.co/D1FBzB1/w5WhiteT.png",
              logoDark: "https://i.ibb.co/yShkFGZ/w5BlueT.png",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },
          }
        }
      );
      web3auth.configureAdapter(openloginAdapter);

      // adding wallet connect v2 adapter
      const defaultWcSettings = await getWalletConnectV2Settings("eip155", [1, 137, 5], "04309ed1007e77d1f119b85205bb779d")
      const walletConnectV2Adapter = new WalletConnectV2Adapter({
        adapterSettings: { qrcodeModal: QRCodeModal, ...defaultWcSettings.adapterSettings },
        loginSettings: { ...defaultWcSettings.loginSettings },
      });

      web3auth.configureAdapter(walletConnectV2Adapter);

      await web3auth.init();

      return web3auth;
    } catch (error) {
      console.error(error);
      throw error;
    }
};
