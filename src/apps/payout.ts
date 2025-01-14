/**
 * ###### NOTICE ######
 * This file has been modified from its original version to meet the requirements of mg.social
 */

// XRP payout script
import fs from 'fs';
import { ZodError } from 'zod';
import * as config from '../lib/config';
import { parseFromCsvToArray } from '../lib/io';
import log, { green, black, red } from '../lib/log';
import {
  TxInput,
  txInputSchema,
  txOutputSchema,
} from '../lib/schema'
import {
  connectToLedger,
  generateWallet,
  reliableBatchPayment,
} from '../lib/xrp'

/**
 * Run the XRP payout script.
 *
 * @param override - Override prompt inputs. Useful for testing and debugging.
 * @throws Re-throws error after logging.
 */
export default async function payout(): Promise<void> {
  try {
    // Prompt user to configure XRP payout and validate user input
    const senderInput = {
      inputCsv: config.INPUT_CSV_FILE,
      outputCsv: config.OUTPUT_CSV_FILE,
      network: config.XRPL_NETWORK,
      wssUrl: 'mainnet' === config.XRPL_NETWORK ? config.WSSEndpoint.Main : config.WSSEndpoint.Test,
      maxFee: 0.000012,
      secret: config.MGS_SENDER_SECRET,
      confirmed: true
    }

    // Cancel if user did not confirm payout
    if (!senderInput.confirmed) {
      throw Error(red('XRP batch payout stopped.'))
    }

    log.info('Starting XRP batch payout..')

    // Parse and validate input CSV to get XRP transaction inputs
    log.info('')
    log.info(`Parsing data from ${senderInput.inputCsv}..`)
    const txInputReadStream = fs.createReadStream(senderInput.inputCsv)
    const txInputs = await parseFromCsvToArray<TxInput>(
      txInputReadStream,
      txInputSchema,
    )
    log.info(green(`Parsed and validated ${txInputs.length} entries.`))

    // Generate XRP wallet from secret
    log.info('')
    log.info(`Generating ${senderInput.network} wallet from secret..`)
    const [wallet, classicAddress] = generateWallet(
      senderInput.secret
    )
    log.info(green('Generated wallet from secret.'))
    log.info(black(`  -> Sender XRPL X-Address: ${wallet.address}`))
    log.info(black(`  -> Sender XRPL Classic address: ${classicAddress}`))

    // Connect to XRPL
    log.info('')
    log.info(`Connecting to XRPL ${senderInput.network}..`)
    const [xrpNetworkClient, balance] = await connectToLedger(
      senderInput.wssUrl,
      classicAddress,
    )
    log.info(green(`Connected to XRPL ${senderInput.network}.`))
    log.info(
      black(`  -> RippleD node wss endpoint: ${senderInput.wssUrl}`),
    )
    log.info(black(`  -> ${classicAddress} balance: ${balance} XRP`))

    //read existing sent accounts
    let alreadySentToAccounts: string[] = [];
    console.log("loading already distributed accounts from FS");
    try {
        if(fs.existsSync(config.ALREADY_SENT_ACCOUNT_FILE)) {
            let alreadySentTo:any = JSON.parse(fs.readFileSync(config.ALREADY_SENT_ACCOUNT_FILE).toString());
            //console.log(JSON.stringify(bithompNames));
            if(alreadySentTo && alreadySentTo.accounts) {
                alreadySentToAccounts = alreadySentTo.accounts;

                console.log("loaded " + alreadySentToAccounts.length + " accounts from file system");
            }
        } else {
            console.log("already distributed to file does not exist yet.")
        }
    } catch(err) {
        console.log("error reading already distributed accounts from FS");
        console.log(err);
    }

    // Reliably send XRP to accounts specified in transaction inputs
    const txOutputWriteStream = fs.createWriteStream(senderInput.outputCsv)
    let sentSkipped:any[] = await reliableBatchPayment(
      txInputs,
      txOutputWriteStream,
      txOutputSchema,
      wallet,
      xrpNetworkClient,
      alreadySentToAccounts
    )

    log.info('')
    log.info(
      green(
        `Batch payout complete succeeded. Reliably sent ${sentSkipped[0]} MGS payments and skipped ${sentSkipped[1]} due to missing TrustLine or Account deleted.`,
      ),
    )
  } catch (err) {
    if (err instanceof ZodError) {
      log.error(err.errors)
    } else {
      log.error(err)
    }
    throw err
  }
}
