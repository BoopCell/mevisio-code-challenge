import { Word } from "../types.js";

export const countWords = (inputString: string) => {
    // split the input string into an array of words
    const words = inputString.split(' ');
  
    // create an empty object to store the word counts
    const wordCounts: Record<string, number> = {};
  
    // iterate over the array of words
    for (const word of words) {
      // if the word is not yet in the object, add it with a count of 1
      if (!wordCounts[word]) {
        wordCounts[word] = 1;
      } else {
        // if the word is already in the object, increment its count
        wordCounts[word] += 1;
      }
    }
  
    // create an array to store the objects
    let result: Word[] = [];
  
    // iterate over the wordCounts object and push each word and its count to the result array
    for (const [value, count] of Object.entries(wordCounts)) {
      result.push({
        value,
        count,
      });
    }

    // return the result array
    return result;
  }
