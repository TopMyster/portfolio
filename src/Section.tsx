import { useState } from "react";

interface ContentItem {
    title: string
    link: string
}
interface SectionProps {
    name: string;
    content?: ContentItem[];
    isLink?: boolean;
}

export default function Section({ name, content, isLink = false }: SectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ul style={{padding: 0, margin: 0}}>
                <li style={{listStyle: "none", marginBottom: 15}}>
                    <div
                        style={{fontSize: 20, textDecoration: "none", cursor: "pointer", display: "inline-block", fontWeight: isOpen ? 500 : undefined, opacity: isOpen ? 1 : undefined}}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {name}
                    </div>
                    {content && isOpen && (
                        content.map((item, index) => (
                            <div key={index} style={{marginTop: 15, marginLeft: 15, fontSize: 17}}>
                            {isLink ? <a href={item.link} target="_blank" style={{textDecoration: "underline", color: "inherit"}}>{item.title}↗</a> : <div>{item.title}</div>}
                        </div>
                        ))
                    )}
                </li>
            </ul>
        </>
    )
}