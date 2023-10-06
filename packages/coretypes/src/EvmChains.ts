export interface ChainConfig {
    blockchain: string;
    symbol: string;
    chainId: string;
    rpcTarget: string;
    network: string;
    displayName: string;
    blockExplorer: string;
    ticker: string;
    tickerName: string;
}

export const evmchains: ChainConfig[] = [
    {
        blockchain: "xinfin",
        symbol: "xdc",
        chainId: "0X32",
        rpcTarget: "https://rpc.xinfin.network",
        network: "mainnet",
        displayName: "XinFin Mainnet",
        blockExplorer: "https://xdcscan.io/",
        ticker: "XDC",
        tickerName: "XinFin"
    }, {
        blockchain: "xinfin",
        symbol: "txdc",
        chainId: "0X33",
        rpcTarget: "https://rpc.apothem.network",
        network: "testnet",
        displayName: "XinFin Testnet",
        blockExplorer: "https://explorer.apothem.network/",
        ticker: "TXDC",
        tickerName: "XinFin"
    }, {
        blockchain: "ethereum",
        symbol: "eth",
        chainId: "0X1",
        rpcTarget: "https://rpc.ankr.com/eth",
        network: "mainnet",
        displayName: "Ethereum Mainnet",
        blockExplorer: "https://etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum"
    }, {
        blockchain: "ethereum",
        symbol: "gteth",
        chainId: "0x5",
        rpcTarget: "https://rpc.ankr.com/eth_goerli	",
        network: "goerli",
        displayName: "Ethereum Goerli Testnet",
        blockExplorer: "https://goerli.etherscan.io/",
        ticker: "GTETH",
        tickerName: "Ethereum"
    }, {
        blockchain: "ethereum",
        symbol: "steth",
        chainId: "0xaa36a7",
        rpcTarget: "https://rpc.sepolia.org	",
        network: "sepolia",
        displayName: "Ethereum Sepolia Testnet",
        blockExplorer: "https://sepolia.etherscan.io/",
        ticker: "STETH",
        tickerName: "Ethereum"
    }, {
        blockchain: "polygon",
        symbol: "matic",
        chainId: "0x89",
        rpcTarget: "https://rpc.ankr.com/polygon",
        network: "mainnet",
        displayName: "Polygon Mainnet",
        blockExplorer: "https://polygonscan.com/",
        ticker: "MATIC",
        tickerName: "MATIC"
    }, {
        blockchain: "polygon",
        symbol: "tmatic",
        chainId: "0x13881",
        rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
        network: "testnet",
        displayName: "Polygon Mumbai",
        blockExplorer: "https://mumbai.polygonscan.com/",
        ticker: "TMATIC",
        tickerName: "MATIC"
    }, {
        blockchain: "binance",
        symbol: "bnb",
        chainId: "0x38",
        rpcTarget: "https://rpc.ankr.com/bsc",
        network: "mainnet",
        displayName: "Binance SmartChain Mainnet",
        blockExplorer: "https://bscscan.com/",
        ticker: "BNB",
        tickerName: "Binance SmartChain"
    }, {
        blockchain: "avalanche",
        symbol: "avax",
        chainId: "0xA86A",
        rpcTarget: "https://rpc.ankr.com/avalanche-c",
        network: "mainnet",
        displayName: "Avalanche C-Chain Mainnet",
        blockExplorer: "https://subnets.avax.network/c-chain",
        ticker: "AVAX",
        tickerName: "Avalanche"
    }, {
        blockchain: "cronos",
        symbol: "cro",
        chainId: "0x19",
        rpcTarget: "https://rpc.cronos.org",
        network: "mainnet",
        displayName: "Cronos Mainnet",
        blockExplorer: "https://cronoscan.com/",
        ticker: "CRO",
        tickerName: "Cronos"
    },
];