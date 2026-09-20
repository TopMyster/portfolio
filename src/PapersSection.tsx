import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

export default function PapersSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const content = [{ title: "BCNY's Purpose Shift: Arc to Dia", link: "/assets/papers/bcny-purpose-shift-arc-to-dia.pdf" }]

    useEffect(() => {
        const handleClose = (event: Event) => {
            const customEvent = event as CustomEvent<string>
            if (customEvent.detail !== "Papers") setIsOpen(false)
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
                        if (!isOpen) window.dispatchEvent(new CustomEvent("close", { detail: "Papers" }))
                        setIsOpen(!isOpen)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Papers
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
                            initial={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            animate={{ y: 0, filter: "blur(0px)", height: "auto", opacity: 1, scale: 1 }}
                            exit={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {content.map((item, index) => (
                                <div key={index} className="item" style={{ marginTop: 15, marginLeft: 15, fontSize: 18 }}>
                                    <a href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
                                        {item.title}↗
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
