import axios from "axios";
import { useEffect, useState } from "react"
import { BASE_URL, BASE_URL1 } from "../config";

export default function Quotes() {
    let [quotes, setQuotes] = useState([]);
    async function getQuotes() {
        let { data } = await axios.get(`${BASE_URL}/quotes`)
        setQuotes(data.quotes);
    }
    useEffect(() => { getQuotes() }, [])
    return (
        <section style={{ padding: '20px' }}>
            <h2 style={{marginBottom:'30px'}}>Quotes</h2>
            {quotes && quotes.map((quote) => (
                <div style={{ textAlign: 'left', background: 'rgb(236, 235, 235)',marginBottom:'20px', padding: '10px', borderRadius: '10px' }}>
                    <p style={{ fontSize: 'larger' }}>
                        {quote.quote}
                    </p>
                    <p style={{ color: 'gray' }}>Author:{quote.author}</p>
                </div>

            ))}
        </section>
    )
}