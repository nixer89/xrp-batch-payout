// Application configuration - defaults are recommended
import { XrplNetwork } from 'xpring-js'

// Web gRPC rippleD node endpoints hosted by RippleX
export enum WebGrpcEndpoint {
  Main = 'https://testnet.xrpl-labs.com',
  Test = 'https://testnet.xrpl-labs.com',
}

// Retry limit for reliable send
export const retryLimit = 10

export const INPUT_CSV_FILE = process.env.INPUT_CSV_FILE || './input.csv';
export const OUTPUT_CSV_FILE = process.env.OUTPUT_CSV_FILE || './output.csv';
export const XRPL_NETWORK = process.env.XRPL_NETWORK === 'testnet' ? XrplNetwork.Test : XrplNetwork.Main;
export const GPRC_URL = process.env.GPRC_URL || 'https://testnet.xrpl-labs.com';
export const XRPL_SECRET = process.env.XRPL_SECRET || 's123...';
