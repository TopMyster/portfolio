import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

export default function AboutSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleClose = (event: Event) => {
            const customEvent = event as CustomEvent<string>
            if (customEvent.detail !== "About") setIsOpen(false)
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
                        if (!isOpen) window.dispatchEvent(new CustomEvent("close", { detail: "About" }))
                        setIsOpen(!isOpen)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    About
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            style={{ display: "flex", flexDirection: "column" }}
                            initial={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            animate={{ y: 0, filter: "blur(0px)", height: "auto", opacity: 1, scale: 1 }}
                            exit={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{ marginTop: 15, marginLeft: 15 }}>
                                <div style={{ lineHeight: 1.4, cursor: "text" }}>
                                    Hi, I'm Toope! I really enjoy creating fun software, running, and playing guitar.
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        </ul>
    )
}
