import { useState } from "react"

export default function Footer() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    async function getQuote() {
        try {
            const url = "https://bible-api.com/data/web/random"
            const response = await fetch(url)
            const data = await response.json()
            setQuote(data.random_verse.text)
            setAuthor(`${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`)
        }  catch {
            setQuote("Come to me, all you who are weary and burdened, and I will give you rest")
            setAuthor("Matthew 11:28")
        }
    }
    getQuote()

    return(
        <>
            <div style={{opacity: .6, marginTop: 20}}>
                <h4><i>{quote}</i></h4>
                <h4><b>-{author}</b></h4>
            </div>
        </>
    )
}