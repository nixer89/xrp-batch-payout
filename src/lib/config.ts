/**
 * ###### NOTICE ######
 * This file has been modified from its original version to meet the requirements of mg.social
 */

// wss rippled node endpoints hosted by RippleX
export enum WSSEndpoint {
  Main = 'wss://xrplcluster.com',
  Test = 'wss://s.altnet.rippletest.net:51233',
}

//file properties
export const INPUT_CSV_FILE = process.env.INPUT_CSV_FILE || './test/input.csv';
export const OUTPUT_CSV_FILE = process.env.OUTPUT_CSV_FILE || './test/output.csv';
export const FAILED_TRX_FILE = process.env.FAILED_TRX_FILE || './test/failed.csv';
export const ALREADY_SENT_ACCOUNT_FILE = process.env.ALREADY_SENT_ACCOUNT_FILE || './test/alreadyDistributedAccounts'

//xrpl network
export const XRPL_NETWORK = process.env.XRPL_NETWORK || 'testnet';

//issuer properties
//export const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS || 'rHP4bHzghBdzskqcaPciL5WRGkHosB5zYx'; // <--- real MGS!
export const ISSUER_ADDRESS = process.env.ISSUER_ADDRESS || 'rEESECoTco6VeKFVu7UFRnZppapSNittfJ';

//export const CURRENCY_CODE = process.env.CURRENCY_CODE || 'MGS';
export const CURRENCY_CODE = process.env.CURRENCY_CODE || 'ABC';

export const MGS_SENDER_SECRET = process.env.MGS_SENDER_SECRET || 'sn11CgqnQuMAaCbBvrCn2h7y7234v';
