import { Word } from "../types.js"

export const filterWords = (words: Word[]): Word[] => {
    //Could filter out profanity and make list more exthausive, for now excluding short words and 
    const filteredWords: string[] = ["but","&amp", "and", "And", "the", "The", "\n"] 
    return words.filter((word)=>(!filteredWords.includes(word.value) && word.value.length > 2))
}