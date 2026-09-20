import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface ContentItem {
    title: string
    link: string
    video: string
}

export default function WorkSection() {
    const [isOpen, setIsOpen] = useState(false)
    const [aniDone, setAniDone] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null)
    const [pointer, setPointer] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const content: ContentItem[] = [
        { title: "NotchScript", link: "https://github.com/TopMyster/notchscript", video: "/assets/videos/notchscript.mp4" },
        { title: "DeskTama", link: "https://github.com/TopMyster/DeskTama", video: "/assets/videos/desktama.mp4" },
        { title: "Rayterm", link: "https://github.com/TopMyster/rayterm", video: "/assets/videos/rayterm.mp4" },
        { title: "Jarvis", link: "https://github.com/TopMyster/Jarvis", video: "/assets/videos/jarvis.mp4" },
        { title: "Nexus", link: "https://nexusstart.vercel.app", video: "/assets/videos/nexus.mp4" },
    ]

    useEffect(() => {
        const handlePointerMove = (event: MouseEvent) => setPointer({ x: event.clientX, y: event.clientY })
        window.addEventListener("mousemove", handlePointerMove)
        return () => window.removeEventListener("mousemove", handlePointerMove)
    }, [])

    useEffect(() => {
        const handleClose = (event: Event) => {
            const customEvent = event as CustomEvent<string>
            if (customEvent.detail !== "Work") setIsOpen(false)
        }

        window.addEventListener("close", handleClose)
        return () => window.removeEventListener("close", handleClose)
    }, [])

    useEffect(() => {
        if (!isOpen) setAniDone(false)
    }, [isOpen])

    useEffect(() => {
        const videoUrls = content.map((item) => item.video)
        const preloadLinks = videoUrls.map((video) => {
            const link = document.createElement("link")
            link.rel = "preload"
            link.as = "video"
            link.href = video
            link.type = "video/mp4"
            document.head.appendChild(link)
            return link
        })

        const preloadVideos = videoUrls.map((video) => {
            const element = document.createElement("video")
            element.preload = "auto"
            element.muted = true
            element.playsInline = true
            element.src = video
            element.load()
            return element
        })

        return () => {
            preloadLinks.forEach((link) => link.remove())
            preloadVideos.forEach((video) => {
                video.pause()
                video.removeAttribute("src")
                video.load()
            })
        }
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
                        if (!isOpen) window.dispatchEvent(new CustomEvent("close", { detail: "Work" }))
                        setIsOpen(!isOpen)
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Work
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}
                            initial={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            animate={{ y: 0, filter: "blur(0px)", height: "auto", opacity: 1, scale: 1 }}
                            exit={{ y: -8, filter: "blur(10px)", height: 0, opacity: 0, scale: 0.6 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            onAnimationComplete={() => setAniDone(true)}
                        >
                            {content.map((item, index) => (
                                <div
                                    key={index}
                                    style={{ position: "relative" }}
                                    onMouseEnter={aniDone ? (event) => {
                                        setHoveredItemIndex(index)
                                        setPointer({ x: event.clientX, y: event.clientY })
                                    } : undefined}
                                    onMouseMove={aniDone ? (event) => setPointer({ x: event.clientX, y: event.clientY }) : undefined}
                                    onMouseLeave={aniDone ? () => setHoveredItemIndex(null) : undefined}
                                >
                                    <div className="item" style={{ marginTop: 15, marginLeft: 15, fontSize: 18 }}>
                                        <a href={item.link} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
                                            {item.title}↗
                                        </a>
                                    </div>

                                    <AnimatePresence>
                                        {hoveredItemIndex === index && (
                                            <motion.div
                                                key={item.video}
                                                className="project-preview"
                                                initial={{ x: 18, y: 0, scale: 0.8, opacity: 0 }}
                                                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                                                exit={{ x: 18, y: 0, scale: 0.8, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                style={{
                                                    position: "fixed",
                                                    left: Math.min(window.innerWidth - 50, pointer.x - 280),
                                                    top: Math.max(22, pointer.y - 10000),
                                                    zIndex: 20,
                                                    pointerEvents: "none",
                                                }}
                                            >
                                                <video
                                                    key={item.video}
                                                    autoPlay
                                                    muted={window.innerWidth < 860}
                                                    loop
                                                    playsInline
                                                    preload="auto"
                                                    width={180}
                                                    height={180}
                                                >
                                                    <source key={item.video} src={item.video} type="video/mp4" />
                                                </video>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </li>
        </ul>
    )
}
