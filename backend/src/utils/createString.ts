import { Tweet } from "../types.js";

export const createString = (tweets: Tweet[]): string => {
    let result = "";
    for (const tweet of tweets) {
      if (tweet.text) {
        result += tweet.text
      }
    }
  return result
  }