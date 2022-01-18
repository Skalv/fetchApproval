import { InjectedConnector } from "@web3-react/injected-connector"
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FrameConnector } from '@web3-react/frame-connector'

const RPC_URLS = {
  1: process.env.RPC_URL_1,
  4: process.env.RPC_URL_4
}

export const injected = new InjectedConnector({
  supportedChainIds: [1]
})

export const walletconnect = new WalletConnectConnector({
  urls: {
    1: RPC_URLS[1],
    4: RPC_URLS[4]
  },
  defaultChainId: 1
})

export const frame = new FrameConnector({
  supportedChainIds: [1]
})