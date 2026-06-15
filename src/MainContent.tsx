import { useEffect, useState } from "react"
import MusicPlayer from "./MusicPlayer"
import Section from "./Section"
import { Toaster, toast } from "sonner"

export default function MainContent() {
    const [isEasterEgg, setIsEasterEgg] = useState(false)
    const [score, setScore] = useState(0)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (score == 11) {
            toast(
                <>
                    Reward:<br></br>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs" style={{ color: "grey" }} target="_blank">Here's this link</a>
                </>
            )
        } else if (score == 51) {
            toast(
                <>
                    Reward:<br></br>
                    <a href="https://www.google.com/search?q=persona%204" style={{ color: "grey" }} target="_blank">Here's my favorite Game. Try it out! </a>
                </>
            )
        } else if (score == 101) {
            toast(
                <div style={{lineHeight: 2}}>
                    Thanks for checking out my portfolio!<br></br>
                    <a style={{ color: "grey" }}>Here's another song for you to listen to</a><br></br>
                    <iframe data-testid="embed-iframe" style={{borderRadius: 12}} src="https://open.spotify.com/embed/track/76YdWrd7Yw9GuU0LirE088?utm_source=generator&si=40a4b732c6c14488" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
            )
            setDone(true)
        }
    })

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
                onClick={() => {setIsEasterEgg(true); score <= 100 ? setScore(score+1) : null; score <= 100 ? toast(`Your Score is: ${score}`) : null}}
            >
                Toope Oladunjoye
            </h2>
            <h3 style={{fontWeight: 100, margin: 0, marginBottom: 30, opacity: .7, cursor: "default" }}>Software Engineer</h3>
            <div className="sections">
                <Section 
                    name="About" 
                    isLink={false} 
                    isImage={false} 
                    content={[
                        {title: "Hi, I'm Toope! I enjoy coding, designing software, and playing video games.", 
                        link: "", 
                        image: "", 
                        width: 0, 
                        height: 0
                    }]}
                />
                <Section 
                    name="Work" 
                    isLink={true} 
                    isVideo={true} 
                    isImage={false} 
                    content={[
                        {title: "Pokemon BSP", link: "https://github.com/TopMyster/pokemon-python", image: "", width: 0, height: 0},
                        {title: "DeskTama", link: "https://github.com/TopMyster/DeskTama", image: "", width: 0, height: 0},
                        {title: "Rayterm", link: "https://github.com/TopMyster/rayterm", image: "", width: 0, height: 0},
                        {title: "Forma", link: "https://formasite.vercel.app/", image: "", width: 0, height: 0},
                        {title: "Nova", link: "https://github.com/TopMyster/Nova", image: "", width: 0, height: 0}
                    ]}
                />
                <Section 
                    name="Files" 
                    isLink={true} 
                    isImage={false} 
                    content={[
                        {title: "Resumé", link: "/assets/Files/Resume.pdf", image: "", width: 0, height: 0},
                        {title: "Curriculum Vitae", link: "/assets/Files/CV.pdf", image: "", width: 0, height: 0}
                    ]}
                />
                <Section 
                    name="Papers" 
                    isLink={true} 
                    isImage={false} 
                    content={[
                        {title: "BCNY's Purpose Shift: Arc to Dia", link: "/assets/Papers/BCNY's Purpose Shift: Arc to Dia.pdf", image: "", width: 0, height: 0}
                    ]}
                />
                <Section 
                    name="Socials" 
                    isLink={true} 
                    isImage={true} 
                    content={[
                        {title: "BlueSky", link: "https://bsky.app", image: "/assets/Socials/Bluesky.png", width: 23, height: 23},
                        {title: "Threads", link: "https://threads.com", image: "/assets/Socials/Threads.png", width: 20, height: 22},
                        {title: "Linkedin", link: "https://linkedin.com", image: "/assets/Socials/Linkedin.png", width: 23, height: 23}
                    ]}
                />
            </div>
        </>
    )
}