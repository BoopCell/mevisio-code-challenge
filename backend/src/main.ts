import { createServer } from "node:http";
import { IncomingMessage, ServerResponse } from "node:http";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { TwitterResponse } from "./types.js";
import { createString } from "./utils/createString.js";
import { countWords } from "./utils/countWords.js";
import { BEARER_TOKEN, TWITTER_ENDPOINT_URL } from "./constants.js";
import { filterWords } from "./utils/filterWords.js";

createServer(router).listen(8126, () => {
  console.log("Listening on http://localhost:8126");
});

async function router(req: IncomingMessage, res: ServerResponse) {
  try {
    const url: URL = new URL(req.url, `http://${req.headers["host"]}`);
    const hashtag: string = url.searchParams.get('hashtag');

    if (!url.searchParams.get('hashtag')) {
      res.writeHead(400, {
        "Content-Type": "application/json",
      });
      res.write(
        JSON.stringify(new Error('Something went wrong...'))
      );
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'get',
      url: TWITTER_ENDPOINT_URL+hashtag,
      headers: {
        "User-Agent": "v2RecentSearchJS",
        "authorization": `Bearer ${BEARER_TOKEN}`
      },
    };

    const response: AxiosResponse<TwitterResponse, AxiosRequestConfig> = await axios(config);
    if (response.data.data) {
      const tweetString = createString(response.data.data)
      const wordCount = countWords(tweetString)
      const filteredData = filterWords(wordCount) 
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(filteredData));
    } else throw new Error("Unsuccessful Request");
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.write("Something went wrong! Check the console...");
  } finally {
    res.end();
  }
}
