interface ExperienceProps {
    date: string;
    role: string;
    company: string;
    description: string;
    skills: string[];
    links?: string[];
}

const kolpolok: ExperienceProps = {
    date: 'May 2021- Present',
    role: 'Software Engineer (III)',
    company: 'Kolpolok Limited',
    description: "Responsibilities include publishing and maintaining application binaries, Collaborating with international clients, gathering requirements and building, refactoring, updating necessary changes, writing documentations for the development of mobile and android TV apps. ",
    skills: [
        'Multi-module',
        'Compose',
        'Datastore',
        'Ktor',
        'Flow',
        'Coroutine'
    ],
}
const ajkerDeal: ExperienceProps = {
    date: 'Jul 2021 - Apr 2022',
    role: 'Junior Software Engineer',
    company: 'AjkerDeal.Com',
    description: "Responsible for translating logistics, E-commerce business requirements into android applications.",
    skills: [
        'REST APIs',
        'Java',
        'Kotlin',
        'Andorid'
    ],
}

const labAr: ExperienceProps = {
    date: 'Feb 2020 - Mar 2020',
    role: 'Internship (Game Development)',
    company: 'Lab AR',
    description: "Responsible for translating logistics, E-commerce business requirements into android applications.",
    skills: [
        'Unity',
        'Colliders',
        'Shaders',
        'Level Design'
    ],
}


const i2Tech: ExperienceProps = {
    date: 'Aug 2019 - Sep 2019',
    role: 'Internship (Web Development)',
    company: 'i2 Technologies',
    description: "Responsible for translating logistics, E-commerce business requirements into android applications.",
    skills: [
        'REST-API',
        'FrontEnd',
        'Database'],
}

const careerStepsData = [kolpolok, ajkerDeal, labAr, i2Tech];

export default careerStepsData 

