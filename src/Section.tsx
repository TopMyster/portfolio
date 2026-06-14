import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

interface ContentItem {
    title: string
    link: string
    image: string
    size: number
}
interface SectionProps {
    name: string;
    content?: ContentItem[];
    isLink?: boolean;
    isImage?: boolean
}

export default function Section({ name, content, isLink = false, isImage = false }: SectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <ul style={{padding: 0, margin: 0}}>
                <li style={{listStyle: "none", marginBottom: 15}}>
                    <div
                        style={{fontSize: 20, textDecoration: "none", cursor: "pointer", display: "inline-block", fontWeight: isOpen ? 500 : undefined, opacity: isOpen || isHovered ? 1 : 0.7}}
                        onClick={() => setIsOpen(!isOpen)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {name}
                    </div>
                    <AnimatePresence>
                    {content && isOpen && (
                    <motion.div 
                        style={{ 
                            display: "flex", 
                            flexDirection: isImage ? "row" : "column", 
                            marginLeft: isImage ? 5 : 0,
                            cursor: isLink ? "pointer" : "default",
                        }}
                        initial={{y: -8, height: 0, opacity: 0}} 
                        animate={{y: 0, height: "auto",  opacity: 1}} 
                        exit={{y: -8, height: 0, opacity: 0}} 
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {content.map((item, index) => (
                            <div key={index} className={isImage ? "image" : "item"} style={{marginTop: 15, marginLeft: isImage ? 8 : 15, fontSize: 17}}>
                                {isLink && !isImage? <a href={item.link} target="_blank" style={{textDecoration: "underline", color: "inherit"}}>{item.title}↗</a> : isImage && isLink ? <a href={item.link} target="_blank"><img className={name} src={item.image} width={item.size} height={item.size} style={{margin: 0}}/></a> : <div>{item.title}</div>}
                            </div>
                            ))}
                    </motion.div>
                    )}
                    </AnimatePresence>
                </li>
            </ul>
        </>
    )
}