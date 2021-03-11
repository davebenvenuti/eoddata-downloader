# eoddata-downloader

Downloads csv data from [eoddata.com](eoddata.com).

## Installation

`npm install -g eoddata-downloader`

## Running

First, ensure you've set `EODDATA_USERNAME` and `EODDATA_PASSWORD`.

Then, it's a matter of:

`eoddata-downloader -e <NASDAQ|NYSE> -d <YYYYMMDD> [-v|--verbose] [-o filename|--outputFilename=filename]`

## Dev Setup

1) `npm install`
2) You can set your `EODDATA_USERNAME` and `EODDATA_PASSWORD` in a `.env` file in the project root.
3) `npm start` will run the project inline.  If you're only looking to build, run `npm run build`.

## TODO

- Tests
