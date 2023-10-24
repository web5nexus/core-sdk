# `@web5nexus/sociallogin`

> A library to import the torus web3 social auth directly from [Web5 Nexus SDK](https://github.com/web5nexus/core-sdk)

## Usage

```ts
import SocialLogin,{EvmRpc} from "@web5nexus/sociallogin";
// Pre-Requiste
// Get from https://dashboard.web3auth.io for Saphire Mainnet only
const clientId = "Client ID recieved from Web3Auth Dashboard";
const clientSecret = "Client Secret Recieved from Web3Auth Dashboard";

// Addional Customization
const name = "XDC Auth"
const logo = "https://xinfin.org/assets/images/brand-assets/xdc-icon.png"
const network :NetworkOption = "sapphire_mainnet";

const whiteLabel = {
    name :name,
    logo :logo
}
const params: Web3AuthParamsType={
    type: "web3auth",
    clientId:clientId,
    clientSecret:clientSecret
}

// init wallet
const socialLoginSDK = new SocialLogin(params,whiteLabel);
await socialLoginSDK.init(network);
// show connect modal
socialLoginSDK.showWallet();


// For Blockchain Instance 
const blockchain:BlockchainType ={
    blockchain:"xinfin",
    network:"mainnet"
}

// Optional own RPC URL 
var rpcUrl = "https://erpc.xdcrpc.com";
const xdcInstance = new EvmRpc(socialLoginSDK.provider,blockchain,rpcUrl)
```
