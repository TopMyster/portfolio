import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

export default function SocialsSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const content = [
        { title: "Bluesky", link: "https://bsky.app/", image: "/assets/socials/bluesky.png", width: 23, height: 23 },
        { title: "Threads", link: "https://www.threads.net/", image: "/assets/socials/threads.png", width: 23, height: 23 },
        { title: "LinkedIn", link: "https://www.linkedin.com/", image: "/assets/socials/linkedin.png", width: 23, height: 23 },
    ]

    useEffect(() => {
        const handleClose = (event: Event) => {
            const customEvent = event as CustomEvent<string>
            if (customEvent.detail !== "Socials") setIsOpen(false)
        }

        window.addEventListener("close", handleClose)
        return () => window.removeEventListener("close", handleClose)
    }, [])

    return (
        <ul style={{ padding: 0, margin: 0 }}>
            <li style={{ listStyle: "none", marginBottom: 15 }}>
                <div
                    style={{
                        fontSize: 22,
                        textDecoration: "none",
                        cursor: "pointer",
                        display: "inline-block",
                        fontWeight: isOpen ? 500 : undefined,
                        opacity: isOpen || isHovered ? 1 : 0.7,
                    }}
                    onClick={() => {
                        if (!isOpen) window.dispatchEvent(new CustomEvent("close", { detail: "Socials" }))
                        setIsOpen(!isOpen)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Socials
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                                marginLeft: 13,
                                marginTop: 15,
                                cursor: "pointer",
                            }}
                            initial={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            animate={{ y: 0, filter: "blur(0px)", height: "auto", opacity: 1, scale: 1 }}
                            exit={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {content.map((item, index) => (
                                <div key={index} className="image" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <a href={item.link} target="_blank" rel="noreferrer" aria-label={item.title}>
                                        <motion.img
                                            className="contact-image"
                                            src={item.image}
                                            width={item.width}
                                            height={item.height}
                                            style={{
                                                display: "block",
                                                margin: 0,
                                                width: item.width,
                                                height: item.height,
                                                objectFit: "contain",
                                                userSelect: "none",
                                                WebkitUserSelect: "none",
                                                MozUserSelect: "none",
                                            }}
                                            alt={item.title}
                                            initial={{ y: -50 }}
                                            animate={{ y: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </a>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        </ul>
    )
}
