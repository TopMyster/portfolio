import Section from "./Section"
export default function MainContent() {
    return(
        <>
            <h2 style={{fontWeight: 500, margin: 0, marginBottom: 8, opacity: 1}}>Toope Oladunjoye</h2>
            <h3 style={{fontWeight: 100, margin: 0, marginBottom: 30, opacity: .7}}>Software Engineer</h3>
            <div className="sections">
                <Section name="About" isLink={false} isImage={false} content={[{title: "Hi, I'm Toope! I enjoy coding, designing software, and playing video games.", link: "", image: "", size: 0}]}/>
                <Section name="Work" isLink={true} isImage={false} content={[
                    {title: "Pokemon BSP", link: "https://github.com/TopMyster/pokemon-python", image: "", size: 0},
                    {title: "DeskTama", link: "https://github.com/TopMyster/DeskTama", image: "", size: 0},
                    {title: "Rayterm", link: "https://github.com/TopMyster/rayterm", image: "", size: 0},
                    {title: "Forma", link: "https://formasite.vercel.app/", image: "", size: 0},
                    {title: "Nova", link: "https://github.com/TopMyster/Nova", image: "", size: 0}
                ]}/>
                <Section name="Files" isLink={true} isImage={false} content={[
                    {title: "Resumé", link: "/assets/Files/Resume.pdf", image: "", size: 0},
                    {title: "Curriculum Vitae", link: "/assets/Files/CV.pdf", image: "", size: 0}
                ]}/>
                <Section name="Papers" isLink={true} isImage={false} content={[
                    {title: "BCNY's Purpose Shift: Arc to Dia", link: "/assets/Papers/BCNY's Purpose Shift: Arc to Dia.pdf", image: "", size: 4}
                ]}/>
                <Section name="Socials" isLink={true} isImage={true} content={[
                    {title: "BlueSky", link: "https://bsky.app", image: "/assets/Socials/Bluesky.png", size: 23},
                    {title: "Threads", link: "https://threads.com", image: "/assets/Socials/Threads.png", size: 20},
                    {title: "Linkedin", link: "https://linkedin.com", image: "/assets/Socials/Linkedin.png", size: 23}
                ]}/>
            </div>
        </>
    )
}