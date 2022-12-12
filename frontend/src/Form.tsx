import { ChangeEvent } from "react"

// Could've handled the # sign in the input in a cleaner way perhaps
interface FormProps {
  handleSubmit: (e: React.SyntheticEvent) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

export default function Form({
  handleSubmit,
  handleChange,
  inputValue,
}: FormProps) {
    return (
        <form onSubmit={handleSubmit}>
        <input type="text" name="data-source-input" value={`#${inputValue}`} onChange={handleChange} placeholder={"Enter a hashtag to generate a wordcloud..."} />
        <input type="submit" value="Generate wordcloud" className="button" />
        </form>
   )
}