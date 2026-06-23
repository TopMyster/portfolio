import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react"

interface ContentItem {
    title: string;
    link?: string;
    image?: string;
    video?: string;
    width?: number;
    height?: number
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
    const hoveredItem = hoveredItemIndex !== null ? content?.[hoveredItemIndex] : undefined;
    
    useEffect(() => {
        const handleClose = (e: any) => { if (e.detail !== name) setIsOpen(false); };
        window.addEventListener("close", handleClose);
        return () => window.removeEventListener("close", handleClose);
    }, [name]);

    useEffect(() => {
        if (isOpen === false) {
            isAniDone(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isVideo || !content) return;

        const videoUrls = content
            .map((item) => item.video)
            .filter((video): video is string => Boolean(video));

        const preloadLinks = videoUrls.map((video) => {
            const link = document.createElement("link");
            link.rel = "preload";
            link.as = "video";
            link.href = video;
            link.type = "video/mp4";
            document.head.appendChild(link);
            return link;
        });

        const preloadVideos = videoUrls.map((video) => {
            const element = document.createElement("video");
            element.preload = "auto";
            element.muted = true;
            element.playsInline = true;
            element.src = video;
            element.load();
            return element;
        });

        return () => {
            preloadLinks.forEach((link) => link.remove());
            preloadVideos.forEach((video) => {
                video.pause();
                video.removeAttribute("src");
                video.load();
            });
        };
    }, [content, isVideo])

    return (
        <>
            <ul style={{padding: 0, margin: 0}}>
                <li style={{listStyle: "none", marginBottom: 15}}>
                    <div
                        style={{fontSize: 20, textDecoration: "none", cursor: "pointer", display: "inline-block", fontWeight: isOpen ? 500 : undefined, opacity: isOpen || isHovered ? 1 : 0.7}}
                        onClick={() => { if (!isOpen) window.dispatchEvent(new CustomEvent("close", { detail: name })); setIsOpen(!isOpen); }}
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
                                            <motion.img className="contact-image" src={item.image} width={item.width} height={item.height} style={{margin: 0, userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none"}} alt={item.title} initial={{y: -50}} animate={{y:0}} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}/>
                                        </a>
                                    ) : (
                                        <div style={{lineHeight: 1.4}}>{item.title}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    )}
                    </AnimatePresence>
                </li>
            </ul>
            {isVideo && createPortal(
                <AnimatePresence>
                    {hoveredItem?.video && (
                        <motion.div 
                            key={hoveredItem.video}
                            className="project-preview"
                            initial={{ y: 140, scale: 0.6, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 200, scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <video 
                                key={hoveredItem.video}
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                preload="auto"
                                width={500} 
                                height={500} 
                            >
                                <source key={hoveredItem.video} src={hoveredItem.video} type="video/mp4" />
                            </video>
                        </motion.div> 
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}