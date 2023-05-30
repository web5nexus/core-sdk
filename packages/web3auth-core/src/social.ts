import {
  WALLET_ADAPTERS,
} from "@web3auth/base";


export async function facebook(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "facebook",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function google(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "google",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};


export async function discord(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "discord",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function twitter(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "twitter",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function reddit(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "reddit",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function twitch(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "twitch",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function apple(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "apple",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function github(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "github",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export async function linkedin(
    web3auth: any,
) {
    try {
        if (!web3auth) {
            return;
        }
        const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
            loginProvider: "linkedin",
        }
        );
        return (web3authProvider);
    } catch (error) {
      console.error(error);
      throw error;
    }
};