import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"

interface ContentItem {
    title: string;
    link: string;
    image: string;
    width: number;
    height: number
}
interface SectionProps {
    name: string;
    content?: ContentItem[];
    isLink?: boolean;
    isImage?: boolean;
    isVideo?: boolean
}

export default function Section({ name, content, isLink = false, isImage = false, isVideo = false }: SectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [aniDone, isAniDone] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
    
    useEffect(() => {
        if (isOpen == false) {
            isAniDone(false)
        }
    })

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
                        initial={{ y: -8, height: 0, opacity: 0, scale: 0.6 }} 
                        animate={{ y: 0, height: "auto",  opacity: 1, scale: 1 }} 
                        exit={{ y: -8, height: 0, opacity: 0, scale: 0.6 }} 
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onAnimationComplete={ () => {isAniDone(true)} }
                    >
                        {content.map((item, index) => (
                            <div 
                                key={index}
                                style={{ position: "relative" }} 
                                onMouseEnter={aniDone ? () => setHoveredItemIndex(index) : undefined}
                                onMouseLeave={aniDone ? () => setHoveredItemIndex(null) : undefined}
                            >
                                <div 
                                    className={isImage ? "image" : "item"} 
                                    style={{marginTop: 15, marginLeft: isImage ? 8 : 15, fontSize: 17}} 
                                >
                                    {isLink && !isImage ? (
                                        <a href={item.link} target="_blank" rel="noreferrer" style={{textDecoration: "underline", color: "inherit"}}>{item.title}↗</a>
                                    ) : isImage && isLink ? (
                                        <a href={item.link} target="_blank" rel="noreferrer">
                                            <img className={name} src={item.image} width={item.width} height={item.height} style={{margin: 0}} alt={item.title}/>
                                        </a>
                                    ) : (
                                        <div>{item.title}</div>
                                    )}
                                </div>
                                
                                {hoveredItemIndex === index && isVideo && ( 
                                    <motion.div 
                                        className="project-preview"
                                        initial={{ y: 140, scale: 0.6 }}
                                        animate={{ y: 0, scale: 1 }}
                                        exit={{ y: 200, scale: 0.6 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <video 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline
                                            width={500} 
                                            height={500} 
                                        >
                                            <source src={`/assets/Videos/${item.title}.mp4`} type="video/mp4" />
                                        </video>
                                    </motion.div> 
                                )}
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