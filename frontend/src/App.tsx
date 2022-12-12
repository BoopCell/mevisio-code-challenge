import React, { ChangeEvent, useState} from "react";
import "./App.css";

import Form from "./Form.jsx";
import { Word } from "./types.js";
import { TagCloud } from "react-tagcloud";

  // TODO: Work on folder structure
  // TODO: Extract state components to files/folders + css for each.
  // TODO: Improve error handling
  // TODO: Fine tune wordcloud look & feel
  // TODO: Improve loading state
  // TODO: Semantics & accessibility, etc..

export function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [data, setData] = useState<Word[]>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInputPrompt, setShowInputPrompt] = useState<boolean>(false);
  const [hashtagHeading, setHashtagHeading] = useState<String>("");
  
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (inputValue.length > 1) {
      setIsLoading(true);
      setData([]);
      setShowInputPrompt(false)
      fetch(`api/readTweets?hashtag=${inputValue}`)
      .then((r: Response) => {
        if (r.status !== 200) setError(new Error(r.statusText))
        else return r.json()
      })
      .then((data: Word[]) => {
        setData(data)
        setHashtagHeading(inputValue)
      })
      .finally(() => {
        setInputValue("")
        setIsLoading(false)
      });
    } else {
      setHashtagHeading("")
      setShowInputPrompt(true)
      setTimeout(()=>setShowInputPrompt(false),3000)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.currentTarget.value.trim().slice(1))
  }

const Wordcloud = React.useMemo(() => (() =>
    <TagCloud tags={data} minSize={15} maxSize={50} colorOptions={options} renderer={CustomRenderer} />
  ), [data])

  const options = {
    luminosity: 'light',
    hue: 'yellow',
  }

const CustomRenderer = React.useMemo(() => ((tag: Word, size: number) => (
    <span
      key={tag.value}
      style={{
        fontSize: `${size}px`,
        margin: '3px',
        padding: '3px',
        textAlign: 'center'
      }}
    >
      {tag.value}
    </span>
  )), [data])

const WordcloudError = (): JSX.Element => {
    return <p className="error-paragraph">Something went wrong...</p>
}
  
const WordcloudEmpty = (): JSX.Element => {
  return (
      <div className="empty-word-cloud">
          <h1>Create a wordcloud from a Twitter hashtag</h1>
      </div>
 )
}
  
const InputPrompt = (): JSX.Element => {
  return (
    <div className="input-wrapper">
      <p className="input-prompt">Enter a hashtag if you want yourself a worldclass wordcloud</p>
    </div>)
  }
const HashtagHeading = (): JSX.Element => {
    return <h1 className="hashtag-heading">#{hashtagHeading}</h1>
  }
const Spinner = (): JSX.Element => {
  return (
    <div className="loader-wrapper">
      <span className="loader"></span>
      <p className="loader-text">Loading...</p>
    </div>)
  }

  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} handleChange={handleChange} inputValue={inputValue} />
      {showInputPrompt ? <InputPrompt /> : null}
      {hashtagHeading ? <HashtagHeading /> : null}
      {error != null ? <WordcloudError />: null}
      {isLoading ?  <Spinner /> : null}
      {data ? <Wordcloud /> : error ? null : <WordcloudEmpty />}
    </div>
  );
}
