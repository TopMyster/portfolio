import { useEffect, useState } from "react"
import MusicPlayer from "./MusicPlayer"
import AboutSection from "./AboutSection"
import WorkSection from "./WorkSection"
import FilesSection from "./FilesSection"
import PapersSection from "./PapersSection"
import SocialsSection from "./SocialsSection"
import { Toaster, toast } from "sonner"
import Scritto from "@scritto/react"

export default function Content() {
    const [isEasterEgg, setIsEasterEgg] = useState(false)
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)

    const descs: Record<number, string> = {
        1 : "Software Engineer",
        2 : "Designer",
        3 : "Friend",
        4 : "Brother",
        5 : "Son"
    };

    const desc = descs[count] || "Software Engineer"

    useEffect(() => {
        if (!isEasterEgg) return

        toast(`Your Score is: ${score}`);
        
        if (score === 10) {
            toast(
                <>
                    Reward:<br></br>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs" style={{ color: "grey" }} target="_blank">Here's this link</a>
                </>
            )
        } else if (score === 50) {
            toast(
                <>
                    Reward:<br></br>
                    <a href="https://www.google.com/search?q=persona%204" style={{ color: "grey" }} target="_blank">Here's my favorite Game. Try it out! </a>
                </>
            )
        } else if (score === 100) {
            toast(
                <div style={{lineHeight: 2}}>
                    Thanks for checking out my portfolio!<br></br>
                    <a style={{ color: "grey" }}>Here's another song for you to listen to</a><br></br>
                    <iframe data-testid="embed-iframe" style={{borderRadius: 12}} src="https://open.spotify.com/embed/track/76YdWrd7Yw9GuU0LirE088?utm_source=generator&si=40a4b732c6c14488" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            )
            setDone(true)
        }
    }, [score, isEasterEgg])

    return (
        <>
            {isEasterEgg ? 
                <Toaster 
                    duration={done ? Infinity : undefined}
                    closeButton={done}
                />
            : null}
            <MusicPlayer/> 
            <h2 
                style={{fontWeight: 500, margin: 0, marginBottom: 8, opacity: 1, cursor: "pointer", userSelect: isEasterEgg ? "none" : undefined, WebkitUserSelect: isEasterEgg ? "none" : undefined, MozUserSelect: isEasterEgg ? "none" : undefined }}
                onClick={() => {
                    setIsEasterEgg(true);
                    if (score < 100) {
                        let newScore = score + 1
                        setScore(newScore);
                        const audio = new Audio('/assets/music/sound-effect.mp3')
                        audio.play()
                    }
                }}
            >
                Toope Oladunjoye
            </h2>
            <Scritto onClick={() => {setCount(count < 5 ? count + 1  : 1)}} value={desc} trend={1} transition={{ duration: 400 }} style={{ fontSize: 19, fontWeight: 100, margin: 0, marginBottom: 30, opacity: .7, cursor: "default" }}/>
              <div className="sections">
                <AboutSection />
                <WorkSection />
                <FilesSection />
                <PapersSection />
                <SocialsSection />
              </div>
        </>
    )
}
