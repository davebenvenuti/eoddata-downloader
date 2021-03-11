import fetch from 'node-fetch';
import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';

interface PrivateWebtoolsClient {
  send: { (cmd: String): Promise<{ cookies: [{ name: String, value: String }] }> }
}

interface PageWithPrivateWebtoolsClient extends Page {
  _client: PrivateWebtoolsClient
}

type Exchange = "NASDAQ" | "NYSE";

// MEMBER LOGIN

const DOWNLOAD_URL = "https://eoddata.com/download.aspx";

interface LoginCallback {
  (browser: Browser, page: PageWithPrivateWebtoolsClient): Promise<any>
}

async function login(callback: LoginCallback) {
  let browser: Browser | undefined;

  const username = process.env.EODDATA_USERNAME;
  const password = process.env.EODDATA_PASSWORD;

  browser = await puppeteer.launch();

  const page = await browser.newPage();

  try {
    await page.goto(DOWNLOAD_URL);

    await page.type("input[name*='txtEmail']", username);
    await page.type("input[name*='txtPassword']", password);

    await page.click("input[type='submit'][name*='btnLogin']"),

    await verifyLogin(page);

    return await callback(browser, page as PageWithPrivateWebtoolsClient);
  } catch(err) {
    console.error(err);

    throw err;
  } finally {
    browser?.close();
  }
};

async function verifyLogin(page: Page) {
  try {
    await page.waitForSelector("span[id*='lblName']");
  } catch(err) {
    console.error(err);

    throw new Error("Login failed");
  }
}

function formatDateForUrl(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;
}

const CSV_FORMAT = "4";

async function fetchExchangeDataUrlAndCookies(exchange: Exchange, date: Date, verbose: boolean = false): Promise<{ cookies: any, url: string }> {
  return new Promise(async (resolve, reject) => {
    await login(async (browser, page) => {
      try {
        if(verbose) console.log("logged in successfully");

        await page.goto("https://eoddata.com/download.aspx");

        // Easiest to just customize a link and click it
        const link = await page.$("a[href*='/data/filedownload.aspx']");
        const hrefHandle = await link.getProperty('href');
        const href = await hrefHandle.jsonValue() as string;
        const url = new URL(href);

        const dateString = formatDateForUrl(date);

        url.searchParams.set("sd", dateString);
        url.searchParams.set("ed", dateString);
        url.searchParams.set("e", exchange);
        url.searchParams.set("d", CSV_FORMAT);

        if(verbose) console.log(`Downloading ${url.toString()}`);

        const { cookies } = await page._client.send('Network.getAllCookies');

        resolve({ url: url.toString(), cookies });
      } catch(err) {
        console.error(err);
        await page.screenshot({ path: "whoops.png" });

        reject(err);
      }
    });
  });
}

function cookiesToHeaderString(cookies: [{ name: string, value: string }]) {
  return cookies.map(({ name, value }) => `${name}=${value}`).join("; ");
}

export async function fetchExchangeData(exchange: Exchange, date: Date, outputFilename: string = null, verbose: boolean = false) {
  const { cookies, url } = await fetchExchangeDataUrlAndCookies(exchange, date, verbose);

  return fetch(url, { headers: { cookie: cookiesToHeaderString(cookies) }})
    .then((res) => {
      const dest = outputFilename ? fs.createWriteStream(outputFilename) : process.stdout;

      res.body.pipe(dest);
      res.body.on('end', () => verbose ? console.log(`Wrote ${outputFilename}`) : null);
    });
}
