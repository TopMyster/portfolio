import Section from "./Section"
export default function MainContent() {
    return(
        <>
            <h2 style={{fontWeight: 500, margin: 0, marginBottom: 8, opacity: 1}}>Toope Oladunjoye</h2>
            <h3 style={{fontWeight: 100, margin: 0, marginBottom: 30, opacity: .7}}>Software Engineer</h3>
            <div className="sections">
                <Section name="About" isLink={false} content={[{title: "Hi", link: ""}]}/>
                <Section name="Work" isLink={true} content={[
                    {title: "Nova", link: "https://github.com/TopMyster/Nova"},
                    {title: "Nova", link: "https://github.com/TopMyster/Nova"},
                    {title: "Nova", link: "https://github.com/TopMyster/Nova"}
                    
                ]}/>
                <Section name="Files" content={[
                    {title: "Resumé", link: ""},
                    {title: "Curriculum Vitae", link: ""}
                ]}/>
                <Section name="Papers"/>
                <Section name="Socials"/>
            </div>
        </>
    )
}