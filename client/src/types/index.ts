import { provider } from 'web3-core'
import Web3 from 'web3'

declare global {
  interface Window {
    ethereum?: provider;
    web3?: Web3;
  }
}
