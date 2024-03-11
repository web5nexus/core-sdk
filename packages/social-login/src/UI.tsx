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
              <a href="https://web5.nexus"><img style={{ width: "25%", float: "right" }} src={"https://i.ibb.co/GnSQZWd/poweredby-W5-Blue-New-1.png"} alt="logo" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UI;
