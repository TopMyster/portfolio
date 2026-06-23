import { useState, useEffect } from "react"

export default function Footer() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const [timeElapsed, setTimeElapsed] = useState({ years: 0, months: 0, days: 0 })
    let year = new Date().getFullYear()

    useEffect(() => {
        async function getQuote() {
            try {
                const url = "https://bible-api.com/data/web/random";
                const response = await fetch(url);
                const data = await response.json();
                setQuote(data.random_verse.text);
                setAuthor(`${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`);
            } catch {
                setQuote("Come to me, all you who are weary and burdened, and I will give you rest");
                setAuthor("Matthew 11:28");
            }
        }

        function timeSinceCreation() {
            const start = new Date("2026-06-13T00:00:00")
            const now = new Date()

            let years = now.getFullYear() - start.getFullYear()
            let months = now.getMonth() - start.getMonth()
            let days = now.getDate() - start.getDate()

            if (days < 0) {
                const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0)
                days += previousMonth.getDate()
                months--
            }

            if (months < 0) {
                months += 12
                years--
            }

            setTimeElapsed({ years, months, days })
        }
        
        getQuote()
        timeSinceCreation()
    }, []);

    useEffect(() => {
        if (quote) { 
            console.log(`${quote} -${author}`)
            console.log(`It's been ${timeElapsed.years} years, ${timeElapsed.months} months, and ${timeElapsed.days} days since I've made this portfolio`)
            console.log(`© ${year} Toope Oladunjoye `)
        }
    }, [quote, author, year]); 

    return (
        <>
        </>
    )
}