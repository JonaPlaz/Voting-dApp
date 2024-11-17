const RPC = process.env.NEXT_PUBLIC_HOLESKY_RPC || "";
export const holesky = {
    id: 17000,
    name: 'Holesky',
    nativeCurrency: { name: 'Holesky Ether', symbol: 'HOL', decimals: 18 },
    rpcUrls: {
        default: {
            http: [RPC],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://holesky.etherscan.io',
            apiUrl: 'https://api-holesky.etherscan.io/api',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 751532,
        },
        ensRegistry: { address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' },
        ensUniversalResolver: {
            address: '0xc8Af999e38273D658BE1b921b88A9Ddf005769cC',
            blockCreated: 5317080,
        },
    },
    testnet: true,
}