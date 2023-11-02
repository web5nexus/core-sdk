import React, { useState } from "react";
import SocialLogin from "./SocialLogin";
import './style.css';
// import * as poweredBy from "./img";

interface UIPorops {
  socialLogin: SocialLogin;
  supportedLogins: string[]; // Add supportedLogins prop
}

const container = {
  position: "fixed",
  float: "left",
  left: "50%",
  top: "50%",
  width: "min(90vw, 375px)",
  transform: "translate(-50%, -50%)",
  transition: "opacity 400ms ease-in",
  border: "1px solid #181818",
  borderRadius: 10,
  background: "black",
  overflow: "hidden",
} as React.CSSProperties;
const allowedLogins = ["google", "facebook", "twitter", "github", "twitch", "discord", "linkedin"]; // List of allowed login methods

const UI: React.FC<UIPorops> = ({ socialLogin, supportedLogins }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState(""); // Added emailError state

  function handleEmailSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (validateEmail(email)) {
      // Email is valid, proceed with login
      setEmailError(""); // Clear any previous error
      socialLogin.emailLogin(email);
    } else {
      // Email is not valid, display an error
      setEmailError("Please enter a valid email address.");
    }
  }

  function handlePhoneSubmit(event: React.SyntheticEvent): void {
    event.preventDefault();
    socialLogin.phoneLogin(phone);
  }

  function handleEmailChange(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }
  function handlePhoneChange(event: React.FormEvent<HTMLInputElement>): void {
    setPhone(event.currentTarget.value);
  }

  // Email validation function
  function validateEmail(email: string): boolean {
    // Use a regular expression to validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  }

  return (
    <div style={container}>
      <div className="w3a-modal__header">
        <div className="w3a-header">
          <img className="w3a-header__logo" src={socialLogin.whiteLabel.logo} alt="logo" />
          <div>
            <div className="w3a-header__title"> {socialLogin.whiteLabel.name} - Sign in</div>
            <p className="w3a-header__subtitle">Select your favourite Sign in method to continue</p>
          </div>
        </div>
        <button onClick={() => socialLogin.hideWallet()} style={{ position: "absolute", top: 20, right: 26, cursor: "pointer" }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L6.75 17.25"></path>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75L17.25 17.25"></path>
          </svg>
        </button>
      </div>

      <div className="w3a-modal__content">
        <div className="w3ajs-social-logins w3a-group">
          <div className="w3a-group__title">CONTINUE WITH</div>
          <ul className="w3a-adapter-list">
            {supportedLogins &&
              supportedLogins
                .filter((loginMethod) => allowedLogins.includes(loginMethod))
                .map((loginMethod) => (
                  <li className="w3a-adapter-item" key={loginMethod}>
                    <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin(loginMethod)}>
                      <img src={`https://images.web3auth.io/login-${loginMethod}.svg`} height="auto" width="auto" alt={`login-${loginMethod}`} />
                    </button>
                  </li>
                ))}
            {/* <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("facebook")}>
                <img src="https://images.web3auth.io/login-facebook.svg" height="auto" width="auto" alt="login-facebook" />
              </button>
            </li>
            <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("github")}>
                <img src="https://images.web3auth.io/login-github.svg" height="auto" width="auto" alt="login-github" />
              </button>
            </li>
            <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("twitter")}>
                <img src="https://images.web3auth.io/login-twitter.svg" height="auto" width="auto" alt="login-twitter" />
              </button>
            </li>
            <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("twitch")}>
                <img src="https://images.web3auth.io/login-twitch.svg" height="auto" width="auto" alt="login-twitch" />
              </button>
            </li>
            <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("discord")}>
                <img src="https://images.web3auth.io/login-discord.svg" height="auto" width="auto" alt="login-discord" />
              </button>
            </li>
            <li className="w3a-adapter-item">
              <button type="button" className="w3a-button w3a-button--icon" onClick={() => socialLogin.socialLogin("linkedin")}>
                <img src="https://images.web3auth.io/login-linkedin.svg" height="auto" width="auto" alt="login-linkedin" />
              </button>
            </li> */}
          </ul>
        </div>
        {supportedLogins.includes("email-passwordless") && (
          <div className="w3ajs-email-passwordless w3a-group w3a-group--email">
            <div className="w3a-group__title">EMAIL - PASSWORDLESS</div>
            <form className="w3ajs-email-passwordless-form" onSubmit={handleEmailSubmit}>
              <input className="w3a-text-field" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              {emailError && <div className="error-message">{emailError}</div>} {/* Display error message */}
              <button className="w3a-button" type="submit">
                Continue with Email
              </button>
            </form>
          </div>
        )}
        {supportedLogins.includes("phone") && (
          <div className="w3ajs-email-passwordless w3a-group w3a-group--email">
            <div className="w3a-group__title">PHONE</div>
            <form className="w3ajs-email-passwordless-form" onSubmit={handlePhoneSubmit}>
              <input className="w3a-text-field" type="text" name="phone" placeholder="Phone (+91-9393939393)" value={phone} onChange={handlePhoneChange} />
              <button className="w3a-button" type="submit">
                Continue with Phone
              </button>
            </form>
          </div>
        )}

        {supportedLogins.includes("metamask") && (
          <div className="w3ajs-external-wallet">
            <div className="w3a-external-toggle">
              <div className="w3a-group__title">EXTERNAL WALLET</div>
              <button type="button" className="w3a-button w3ajs-external-toggle__button" onClick={() => socialLogin.metamaskLogin()}>
                Connect using MetaMask
              </button>
              <button type="button" className="w3a-button w3ajs-external-toggle__button" onClick={() => socialLogin.walletConnectLogin()}>
                Use Wallet Connect
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w3a-modal__footer">
        <div className="w3a-footer">
          <div>
            <div className="w3a-footer__links">
              <a href="https://web5.nexus"><img style={{ width: "25%", float: "right" }} src={"https://lh3.googleusercontent.com/fife/AK0iWDxK7r0yFS7Oz6ub5GPy7L7X0CORVBRH78zjY9RLSAE65g9BifGPg2CEroZLHBG5-BeWAUAiXyfL5uUBVbAcHAk6Wt-Tc-oor0uq-NxVzuzP9O8IX5SnOkAxK5-6aoKVz_hIPRE7RV-hdhcuVdNW9edFV55CgtC7S49BNSkQExpT0zJ0xgABWfVj67t3vjibT2ZO8aBSlT0lgfFYDgJiZUXroAx-xpDx6JMkeWxKIHDLBA0_6J70cJkWT0qqOgJw6Ds7Hp1U3XDX33a0nQ_9N1co467AWgeXZd9qFfsySQn8hFX-gRKVWxw2L1WAJ6k0F0NA3_4y2lpT1vwvurh8YKByJIiVEmOqVuTc7HmXvI-JswdSnQ5H8B9UgcdaXsV8s8_x2KI-86hKknY3l7hQSgQMg7qyZ7mXwj9jbyYV7DmtVrh2v-j8bhXloBuAW9h9xITmXDBDbLvhGPXx9YgClt0_EkORQwj_wgQR3IHhCqvFSLPbS5gCg4SquBKRB1IXFQYnqEWdxaxTUV-RIW46kw4U5rLzmWNQN8PHQqQK28z5TRfYLb4iQS_afcubzG7Z-SyR8JjIm6OgkZ47sU_c8WiY5Jf-G2zp6wGySGOklRbq95sb092FUwERxvqJaxHFkpsM-Ic4DOupChnxw7TtsOwedJIBnbseT8dN9B1Tt6uqqcZLFhTCDw7f52vWGLM8Qtxix8-Q-hWJ772r-_Kf9vLYDfYbpJntObW5EbDh79i-gWiLnJum6oh9YdlLVWE7KsJKxmnQsRT980SqFHQSrgeY63S8-yVyJh2MC1UXBmSjENN7aM9DGi81c7tEl5r7cKo20aa-aPO37TxQo0G2yBELjZ4Rxnu92yZNdBPngQIveUhS7hM-fxV4VggrGLrJLIJOz-PfeMkK_mt-J8b75IjGK89VegssMDr7nNAvujelBt5MUM0IL4OGU3Z0xet35051nF5e0miDcbVXU-2Tn7KBARP2lKrgHquy13tBtx-_fpvF29FbXju2NKuXCNSd3j2qmjnMJmjbw_Jaos6vKnkhWg_YFwa-TfsiHNgJAfckMTzGnu1IiVye6Uom9yZ28NdTXc0BkKY1Bxy3QVhktIf-mE9SH8YbqaaVWWHJOG3DmhiktNabYwtsMuh-8e4_6lfIvzfMp8usZoD6Awcxon-cDKccN-0_XSk98gqOHk9M1chr93OEaiOMffpcLVWjXmxPrt-La-mOFYhLYwIhGEZjyxBMKV-mRCZkgPtYpOQRExkD6r4M64n1nirA1vPH6mC8PNXRSoC6RIZQra9PIk-SG2snayuEH3lhOqafAfJTFOWD74bGuSulf-ym4Y70v4NxPQLb6Vxzadv255gTHQLukx1mcbprnPaQD4PC5zMMlmWDDcJwjKMmfTWs4EhOeuehGWXRDCGArp6K7nPyeZTYo6fVUJj75czqGUWR2eH3PeZFxio5lS0DJK9OuRKOHAK24MZZ_yE2MWceubV29NmQwfYja5ju06Q0XYB3Pw9nCb3zUHGGmc3GmH6h59dimQKqEm0JEiXd3R6UlrI9yJw1hp9d58OSeOYRxNq4ScSYNJy8BYk1Yzni0apVqP3mwyKQa5QyM_rWvCZhmsBzU8tpRpf93B6dZAw92gUaCBM52WpBkqj3iuY4YSS6kwx8o2ajnWAPiCqeDdm-11NpvSV49_pqzVa2l-1HAJIE9BkNoagsuO6dxlSM5Q5c6XBS7rC1Wbn1oxblwpaLFIINDKrpspQ7bCUf8wwFoA51mDZbH2OnivLXF-AAo7sQO75cAtTOr1p3F-ximhnfga5M5qMpMqIHy-UnbdVepngxjDoDurHrogZ5t1A330XNX94GuMo9RZsa2MM0bcXgQvFHYpbUAyJJ=w2560-h1760"} alt="logo" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI;
