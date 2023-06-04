# `@web5nexus/web3auth-core`


```markdown
# Web5 Nexus Web3Auth Core Library

This library provides functionalities for social login using Web3Auth in a web application.

## Installation

You can install this library using npm or yarn:

```bash
npm install @web5nexus/web3auth-core
```

or

```bash
yarn add @web5nexus/web3auth-core
```

## Usage

To use the library, you need to import the desired components from the package:

```javascript
import { Web5 } from '@web5nexus/web3auth-core';
import { XdcRpc } from '@web5nexus/web3auth-core';
import { CosmosRpc } from '@web5nexus/web3auth-core';
import { web5walletconnect } from '@web5nexus/web3auth-core';
```

### Web5 Social Login

The `Web5` class provides methods for social login using various providers:

```javascript
const web5 = new Web5(clientId, network);
```

- `clientId` (required): The client ID obtained from Web5 Nexus.
- `network` (required): The network to connect to (`"TESTNET"` or `"MAINNET"`).

#### Facebook Login

```javascript
web5.facebook()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Google Login

```javascript
web5.google()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Discord Login

```javascript
web5.discord()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Twitter Login

```javascript
web5.twitter()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Reddit Login

```javascript
web5.reddit()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Twitch Login

```javascript
web5.twitch()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Apple Login

```javascript
web5.apple()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### GitHub Login

```javascript
web5.github()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### LinkedIn Login

```javascript
web5.linkedin()
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Email Login

```javascript
web5.email(email)
  .then((provider) => {
    // Use the provider for further actions
  })
  .catch((error) => {
    console.error(error);
  });
```

#### Mobile Login

```javascript
web5.mobile(mobile)
  .then((provider) => {
    // Use the provider for further

 actions
  })
  .catch((error) => {
    console.error(error);
  });
```

### XDC RPC

The `XdcRpc` class provides an interface for interacting with the XDC network using RPC calls.

```javascript
const xdcRpc = new XdcRpc(provider);
```

- `provider` (required): The provider recieved from the social login for the XDC network.

#### Example Usage

```javascript
// Retrieve the chain ID
const chainId = await xdcRpc.getChainId();
console.log("Chain ID:", chainId);

// Retrieve the XDC accounts
const accounts = await xdcRpc.getAccounts();
console.log("Accounts:", accounts);

// Retrieve the XDC balance
const balance = await xdcRpc.getBalance();
console.log("Balance:", balance);

// Send a transaction
const txReceipt = await xdcRpc.sendTransaction("1000000000000000000", "0x123456789...");
console.log("Transaction Receipt:", txReceipt);

// Sign a message
const signedMessage = await xdcRpc.signMessage();
console.log("Signed Message:", signedMessage);

// Retrieve the private key
const privateKey = await xdcRpc.getPrivateKey();
console.log("Private Key:", privateKey);

```

### Cosmos RPC

The `CosmosRpc` class provides an interface for interacting with the Cosmos network using RPC calls.

```javascript
const blockchain = "coreum";
const network = "testnet";
const cosmosRpc = new CosmosRpc(blockchain,network,provider);
```

- `blockchain` (required): The Blockchain Name for the Cosmos based network for eg: "coreum".
- `network` (required): The Network for the Cosmos based network for eg: "testnet"/"mainnet".
- `provider` (required): The provider recieved from the social login for the Cosmos based network.

#### Example Usage

```javascript
// Call the getChainId() function and log the result
cosmosRpc.getChainId()
  .then(chainId => {
    console.log("Chain ID:", chainId);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Call the getAccounts() function and log the result
cosmosRpc.getAccounts()
  .then(accounts => {
    console.log("Accounts:", accounts);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Call the getBalance() function and log the result
cosmosRpc.getBalance()
  .then(balance => {
    console.log("Balance:", balance);
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Call the sendTransaction() function and log the result
// Call the sendTransaction() function and log the result
const amount = "1000000";
const toAddress = "testcore1xxxxxxxx"; // Replace with the recipient's Cosmos  based address (coreum)
const gasFee = "200000"; // Optional gas fee, adjust as needed
const gasLimit = "200000"; // Optional gas limit, adjust as needed

cosmosRpc.sendTransaction(amount, toAddress, gasFee, gasLimit)
  .then(result => {
    console.log("Transaction Hash:", result.transactionHash);
    console.log("Block Height:", result.height);
  })
  .catch(error => {
    console.error("Error:", error);
  });



// Call the getPrivateKey() function and log the result
cosmosRpc.getPrivateKey()
  .then(privateKey => {
    console.log("Private Key:", privateKey);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```



## License

This library is licensed under the MIT License.
```