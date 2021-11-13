/**
 * ###### NOTICE ######
 * This file has been modified from its original version to meet the requirements of mg.social
 */

//run as nodejs
import payout from './apps/payout';
import * as config from './lib/config';
import * as chokidar from 'chokidar'

let isRunning:boolean = false;

function watchInputFile() {
    let watcher = chokidar.watch(config.INPUT_CSV_FILE);

    console.log("watching for file changes on " + config.INPUT_CSV_FILE);

    watcher.on('change', async () => {
        if(!isRunning) {
            isRunning = true;

            console.log("received file change, will execute payout");
            await payout();
            
            isRunning = false;
        } else {
            console.log("received file change but not starting script because it is running already!")
        }
        
    })
}

watchInputFile();