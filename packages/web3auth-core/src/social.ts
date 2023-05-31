import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import {
    WalletConnectV2Adapter,
    getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import QRCodeModal from "@walletconnect/qrcode-modal";
import chains, { ChainConfig } from './chains';

export class Web5 {
    public clientId: string;
    public network: string;
    public web3auth: Web3AuthNoModal | null;
    public web3authProvider: SafeEventEmitterProvider | null

    constructor(clientId: string, network: string) {
        this.clientId = clientId;
        this.network = network;
        this.web3auth = null;
        this.web3authProvider = null;
    }
    
    async init(blockchain?: string, symbol?: string) {
        try {
            if (!(blockchain || symbol)) {
                throw new Error('At least one of blockchain or symbol must be provided.');
            }

            let chainConfig: ChainConfig | undefined;
            if (blockchain) {
                chainConfig = chains.find((chain) => chain.blockchain === blockchain);
            } else if (symbol) {
                chainConfig = chains.find((chain) => chain.symbol === symbol);
            }

            if (!chainConfig) {
                throw new Error(`Chain configuration not found for blockchain: ${blockchain || ''} and symbol: ${symbol || ''}`);
            }
            this.web3auth = new Web3AuthNoModal({
                clientId: this.clientId,
                chainConfig: {
                    chainNamespace: CHAIN_NAMESPACES.EIP155,
                    chainId: chainConfig.chainId,
                    rpcTarget: chainConfig.rpcTarget,
                },
                web3AuthNetwork: this.network === "TESTNET" ? "testnet" : "cyan",
            });

            const openloginAdapter = new OpenloginAdapter({
                adapterSettings: {
                    whiteLabel: {
                        name: "Web5 Nexus Login - Secured by Web3Auth",
                        logoLight: "https://i.ibb.co/D1FBzB1/w5WhiteT.png",
                        logoDark: "https://i.ibb.co/yShkFGZ/w5BlueT.png",
                        defaultLanguage: "en",
                        dark: true,
                    },
                },
            });
            this.web3auth.configureAdapter(openloginAdapter);

            // Adding WalletConnect V2 adapter
            const defaultWcSettings = await getWalletConnectV2Settings("eip155", [1, 137, 5], "04309ed1007e77d1f119b85205bb779d");
            const walletConnectV2Adapter = new WalletConnectV2Adapter({
                adapterSettings: { qrcodeModal: QRCodeModal, ...defaultWcSettings.adapterSettings },
                loginSettings: { ...defaultWcSettings.loginSettings },
            });

            this.web3auth.configureAdapter(walletConnectV2Adapter);

            await this.web3auth.init();
            return this.web3auth;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async facebook() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "facebook",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async google() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "google",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async discord() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "discord",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async twitter() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "twitter",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async reddit() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "reddit",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async twitch() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "twitch",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async apple() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "apple",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async github() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "github",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async linkedin() {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "linkedin",
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async email(
        email: string
    ) {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "email_passwordless",
                    extraLoginOptions: {
                        login_hint: email,
                    }
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    async mobile(
        mobile: string
    ) {
        try {
            if (!this.web3auth) {
                return;
            }
            this.web3authProvider = await this.web3auth.connectTo(
                WALLET_ADAPTERS.OPENLOGIN,
                {
                    loginProvider: "sms_passwordless",
                    extraLoginOptions: {
                        login_hint: mobile,
                    }
                }
            );
            return this.web3authProvider;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}