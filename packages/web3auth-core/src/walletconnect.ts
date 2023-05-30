import {
    WALLET_ADAPTERS,
  } from "@web3auth/base";

export async function walletconnect(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
            WALLET_ADAPTERS.WALLET_CONNECT_V2
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

