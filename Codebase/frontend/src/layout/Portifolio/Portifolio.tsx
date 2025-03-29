import Footer from "../../component/Footer"
import Header from "../../component/Header"
import Aboutme from "../../feature/Portifolio/Aboutme"
import Contact from "../../feature/Portifolio/Contact"
import Hero from "../../feature/Portifolio/Hero"
import Projects from "../../feature/Portifolio/Projects"
import Service from "../../feature/Portifolio/Service"
import Skill from "../../feature/Portifolio/Skill"

function Portifolio() {
    return (
        <>
            <Header />
            <Hero />
            <Aboutme />
            <Service />
            <Skill />
            <Projects />
            <Contact />
            <Footer />
        </>
    )
}

export default Portifolio