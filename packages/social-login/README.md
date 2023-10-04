# `@web5nexus/sociallogin`

> A library to import the torus web3 social auth directly from [Web5 Nexus SDK](https://github.com/web5nexus/core-sdk)

## Usage

```ts
import SocialLogin from "@web5nexus/sociallogin";
// init wallet
const socialLoginSDK = new SocialLogin();
await socialLoginSDK.init();
// show connect modal
socialLoginSDK.showWallet();
```
