import { useEffect, useState,useMemo } from "react";
import "./App.css";
import Web5Nexus, { Web3AuthNoModal } from "@web5nexus/web3auth-core";
import { web5walletconnect } from "@web5nexus/web3auth-core";

const clientId =
  "BD7gzRBgQjGa6OF-Ydbev3hj7KqjxCyx_w2drdVw75STKpk-8rHNxYi2hCecvZcg_4MYyZ9fHKfv8PKbVACxpow"; // get from https://dashboard.web3auth.io

function App() {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<any | null>(null);
  const web5 = useMemo(() => new Web5Nexus.Web5(clientId, "MAINNET"), []);

  useEffect(() => {

    const initialize = async () => {
      try {
        const blockchain = "ethereum";
        await web5.init(blockchain);
      } catch (error) {
        console.error(error);
      }
    }
    initialize();
    

  }, [web5]);


  const loginFacebook = async () => {
    const web3authProvider = await web5.facebook()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginDiscord = async () => {
    const web3authProvider = await web5.discord()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginTwitter = async () => {
    const web3authProvider = await web5.twitter()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginReddit = async () => {
    const web3authProvider = await web5.reddit()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginTwitch = async () => {
    const web3authProvider = await web5.twitch()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginApple = async () => {
    const web3authProvider = await web5.apple()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginGithub = async () => {
    const web3authProvider = await web5.github()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginLinkedin = async () => {
    const web3authProvider = await web5.linkedin()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginGoogle = async () => { 
    
    const web3authProvider = await web5.google()
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginWithSMS = async () => {
    const web3authProvider = await web5.email("+91-7738479381")
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginWithEmail = async () => {
    const web3authProvider = await web5.email("jetso@blockchain.ai.in")
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const loginWCModal = async () => {
    const web3authProvider = await web5walletconnect(web3auth)
    setProvider(web3authProvider);
    setWeb3auth(web5.web3auth);
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const idToken = await web3auth.authenticateUser();
    uiConsole(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    await web5.web3auth?.logout()
    setProvider(null);
    setWeb3auth(null);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new Web5Nexus.CosmosRpc("coreum","testnet",provider);
    const address = await rpc.getAccounts();
    uiConsole(String(address));
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new Web5Nexus.CosmosRpc("coreum","testnet",provider);
    const balance = (await rpc.getBalance());
    uiConsole((balance));
  };

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new Web5Nexus.CosmosRpc("coreum","testnet",provider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new Web5Nexus.CosmosRpc("coreum","testnet",provider);
    const receipt = await rpc.sendTransaction("100000","testcore1jav3wurj74l9ftld26lmxy980t64ht462v4p54");
    uiConsole(receipt);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new Web5Nexus.CosmosRpc("coreum","testnet",provider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={authenticateUser} className="card">
            Get ID Token
          </button>
        </div>
       
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}>Logged in Successfully!</p>
      </div>
    </>
  );

  const unloggedInView = (
    <>
      {/* <button onClick={loginGoogle} className="card"> */}
      <div style={{ width: "100%", margin: "auto", padding: "10px" }}>
        <div style={{ width: "100%", margin: "auto", padding: "10px" }}>
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginGoogle} src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginFacebook} src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginDiscord} src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginTwitter} src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginReddit} src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginTwitch} src="https://www.freepnglogos.com/uploads/purple-twitch-logo-png-18.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginApple} src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-dallas-shootings-don-add-are-speech-zones-used-4.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginGithub} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
          <img alt="" style={{ cursor: "pointer", width: "9%", paddingRight: "10px" }} onClick={loginLinkedin} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" />
        </div>
      </div>

      {/* </button> */}
      <button onClick={loginWithSMS} className="card">
        SMS Login (e.g +cc-number) Currently set to Default
      </button>
      <button onClick={loginWithEmail} className="card">
        Email Login (e.g email@xyz.com) Currently set to Default
      </button>
      <button onClick={loginWCModal} className="card">
        Login with Wallet Connect v2
      </button>
    </>
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
          Web5 Nexus
        </a>{" "}
        Coreum Chain Login Demo Example
      </h1>

      <div className="grid">{provider ? loggedInView : unloggedInView}</div>

      <footer className="footer">
        <a
          href="https://web5.nexus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Web5.Nexus
        </a>
      </footer>
    </div>
  );
}

export default App;
