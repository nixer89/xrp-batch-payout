/**
 * ###### NOTICE ######
 * This file has been modified from its original version to meet the requirements of mg.social
 */

// Application configuration - defaults are recommended
import { XrplNetwork } from 'xpring-js'

// Web gRPC rippleD node endpoints hosted by RippleX
export enum WebGrpcEndpoint {
  Main = 'https://testnet.xrpl-labs.com',
  Test = 'test.xrp.xpring.io:50051',
}

// Retry limit for reliable send
export const retryLimit = 10

export const INPUT_CSV_FILE = process.env.INPUT_CSV_FILE || './input.csv';
export const OUTPUT_CSV_FILE = process.env.OUTPUT_CSV_FILE || './output.csv';
export const XRPL_NETWORK = process.env.XRPL_NETWORK === 'mainnet' ? XrplNetwork.Main : XrplNetwork.Test || XrplNetwork.Test;
export const GRPC_URL = process.env.GRPC_URL || 'test.xrp.xpring.io:50051';
export const XRPL_SECRET = process.env.XRPL_SECRET || 'shTAjRHoxanFFx6TiPKEVJYVeXRqj';
