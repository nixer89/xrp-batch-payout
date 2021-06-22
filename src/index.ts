//run as nodejs
import payout from './apps/payout';
import * as config from './lib/config';
import * as chokidar from 'chokidar'

function watchInputFile() {
    let watcher = chokidar.watch(config.INPUT_CSV_FILE);

    watcher.on('change', () => {
        payout();
    })
}

watchInputFile();