import { useState } from "react"
import MusicPlayer from "./MusicPlayer"
import Section from "./Section"
import Scritto from "@scritto/react"

export default function Content() {
    const [count, setCount] = useState(0)
    const [nameCount, setNameCount] = useState(0)

    const descs: Record<number, string> = {
        1 : "Software Engineer",
        2 : "Designer",
        3 : "Friend",
        4 : "Brother",
        5 : "Son"
    };

    const desc = descs[count] || "Software Engineer"

    const name = nameCount === 0 ? "Toope Oladunjoye" : "That's my name :)"

    return (
        <>
            <MusicPlayer/> 
            <Scritto onClick={() => {
                setNameCount(1)
                setTimeout(() => {
                    setNameCount(0)
                }, 1000)
            }} value={name} trend={1} transition={{ duration: 500 }} style={{ fontSize: 23, fontWeight: 500, margin: 0, marginBottom: 8, opacity: 1, cursor: "pointer", userSelect: "none", WebkitUserSelect: "none", MozUserSelect: "none"}}/>
            <Scritto onClick={() => {setCount(count < 5 ? count + 1  : 1)}} value={desc} trend={1} transition={{ duration: 400 }} style={{ fontSize: 19, fontWeight: 100, margin: 0, marginBottom: 40, opacity: .7, cursor: "default" }}/>
              <div className="sections">
                <Section 
                    name="About" 
                    content={[
                        {title: "Hi, I'm Toope! I really enjoy creating fun software, running, and playing guitar."}]}
                />
                <Section 
                    name="Work" 
                    isLink={true} 
                    isVideo={true} 
                    content={[
                        {title: "NotchScript", link: "https://github.com/TopMyster/notchscript", image: "", video: "/assets/videos/notchscript.mp4"},
                        {title: "DeskTama", link: "https://github.com/TopMyster/DeskTama", image: "", video: "/assets/videos/desktama.mp4"},
                        {title: "Rayterm", link: "https://github.com/TopMyster/rayterm", image: "", video: "/assets/videos/rayterm.mp4"},
                        {title: "Jarvis", link: "https://github.com/TopMyster/Jarvis", image: "", video: "/assets/videos/jarvis.mp4"},
                        {title: "Nexus", link: "https://nexusstart.vercel.app", image: "", video: "/assets/videos/nexus.mp4"}
                    ]}
                />
                <Section 
                    name="Files" 
                    isLink={true} 
                    content={[
                        {title: "Resumé", link: "/assets/files/resume.pdf"},
                        {title: "Curriculum Vitae", link: "/assets/files/cv.pdf"}
                    ]}
                />
                <Section 
                    name="Papers" 
                    isLink={true} 
                    content={[
                        {title: "BCNY's Purpose Shift: Arc to Dia", link: "/assets/papers/bcny-purpose-shift-arc-to-dia.pdf"}
                    ]}
                />
                <Section 
                    name="Socials" 
                    isLink={true} 
                    isImage={true} 
                    content={[
                        {title: "Bluesky", link: "https://bsky.app/", image: "/assets/socials/bluesky.png", width: 23, height: 23},
                        {title: "Threads", link: "https://www.threads.net/", image: "/assets/socials/threads.png", width: 23, height: 23},
                        {title: "LinkedIn", link: "https://www.linkedin.com/", image: "/assets/socials/linkedin.png", width: 23, height: 23}
                    ]}
                />
            </div>
        </>
    )
}
