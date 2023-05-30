import {
    WALLET_ADAPTERS,
  } from "@web3auth/base";

export async function email(
    web3auth: any,
    email:string
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "email_passwordless",
            extraLoginOptions: {
                login_hint: email, 
            }
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function mobile(
    web3auth: any,
    mobile:string
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "sms_passwordless",
            extraLoginOptions: {
                login_hint: mobile, 
            }
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

