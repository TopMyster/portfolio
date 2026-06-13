import Section from "./Section"
export default function MainContent() {
    return(
        <>
            <h2 style={{fontWeight: 500, margin: 0, marginBottom: 8, opacity: 1}}>Toope Oladunjoye</h2>
            <h3 style={{fontWeight: 100, margin: 0, marginBottom: 30, opacity: .7}}>Software Engineer</h3>
            <div className="sections">
                <Section name="About" isLink={false} content={[{title: "Hi, I'm Toope! I enjoy coding, designing software, and playing video games.", link: ""}]}/>
                <Section name="Work" isLink={true} content={[
                    {title: "Pokemon BSP", link: "https://github.com/TopMyster/pokemon-python"},
                    {title: "DeskTama", link: "https://github.com/TopMyster/DeskTama"},
                    {title: "Rayterm", link: "https://github.com/TopMyster/rayterm"},
                    {title: "Forma", link: "https://formasite.vercel.app/"},
                    {title: "Nova", link: "https://github.com/TopMyster/Nova"}
                ]}/>
                <Section name="Files" isLink={true} content={[
                    {title: "Resumé", link: "./src/assets/Files/Resume.pdf"},
                    {title: "Curriculum Vitae", link: "./src/assets/Files/CV.pdf"}
                ]}/>
                <Section name="Papers" isLink={true} content={[
                    {title: "BCNY's Purpose Shift: Arc to Dia", link: "./src/assets/Papers/BCNY's Purpose Shift: Arc to Dia.pdf"}
                ]}/>
                <Section name="Socials"/>
            </div>
        </>
    )
}