import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// import "@web5nexus/sociallogin/dist/src/style.css"
import { Web3AuthProvider } from "./contexts/SocialLoginContext";

const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    <Web3AuthProvider>
        <App />
    </Web3AuthProvider>
  );
};

root.render(<Index />);
