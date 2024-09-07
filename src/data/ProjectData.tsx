import github from '../../src/assets/github.png'
import typescript from '../../src/assets/typescript.png'
import kotlin from '../../src/assets/kotlin.png'
import cpp from '../../src/assets/cpp.png'
import java from '../../src/assets/java.png'
import javascript from '../../src/assets/jscript.png'
import live from '../../src/assets/live.png'

export interface ProjectProps {
    name: string;
    desc: string;
    languages: ProjectLanguageProps[];
    references: ProjectLinkProps[];
}

export interface ProjectLanguageProps {
    logo: string;
    url: string;
}

export interface ProjectLinkProps {
    logo: string;
    url: string;
}

const p1: ProjectProps = {
    name: 'RickandMorty ',
    desc: "A simple android application implementing clean architecture principals with Rick And Morty API.",
    languages: [
        {
            logo: kotlin,
            url: ""
        }
    ],
    references: [
        {
            logo: github,
            url: "https://github.com/Fa-d/RickandMorty"
        }
    ]
}

const p2: ProjectProps = {
    name: 'URLEncryption  ',
    desc: "Encrypting network data within compiled binary",
    languages: [
        {
            logo: cpp,
            url: ""
        }, {
            logo: java,
            url: ""
        }
    ],
    references: [
        {
            logo: github,
            url: "https://github.com/Fa-d/URLEncryption"
        }
    ]
}

const p3: ProjectProps = {
    name: 'Portfolio  ',
    desc: "The portfolio you are currently visiting.",
    languages: [
        {
            logo: typescript,
            url: ""
        }, {
            logo: javascript,
            url: ""
        }
    ],
    references: [
        {
            logo: github,
            url: "https://github.com/Fa-d/Portfolio"
        },{
            logo: live,
            url: "https://sadakat.dev"
        }
    ]
}


const p4: ProjectProps = {
    name: 'VPNSDK   ',
    desc: "This project ensembles the basic features of all protocols.",
    languages: [
        {
            logo: java,
            url: ""
        }, {
            logo: kotlin,
            url: ""
        }, {
            logo: cpp,
            url: ""
        }
    ],
    references: [
        {
            logo: github,
            url: "https://github.com/Fa-d/VPNSDK"
        }
    ]
}
export const allProjects = [p1, p2, p3, p4]

