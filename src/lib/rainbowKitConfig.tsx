import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, polygon, arbitrum, base } from "wagmi/chains"

export default getDefaultConfig({
    appName: "ChainStream",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
    chains: [mainnet, polygon, arbitrum, base],
    ssr: false,
})