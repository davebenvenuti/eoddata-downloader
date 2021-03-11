import { Command } from 'commander';

import { fetchExchangeData } from './client';
import { parseDateString, failAndExit } from './util';

import { version } from '../package.json';

const program = new Command();

program.version(version);

program
  .requiredOption('-e, --exchange <exchange>', 'NASDAQ|NYSE')
  .requiredOption('-d --date <YYYYMMDD>', 'a parsable date string')
  .option('-o, --outputFilename <filename>', 'output filename, defaults to STDOUT')
  .option('-v, --verbose', 'more verbose output, defaults to false', false);

program.parse(process.argv);

const { date, exchange, outputFilename, verbose } = program.opts();

const parsedDate = parseDateString(date);

async function run() {
  fetchExchangeData(exchange, parsedDate, outputFilename, verbose);
}

run();
