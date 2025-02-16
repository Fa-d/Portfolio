import git from '../../src/assets/git.png'
import typescript from '../../src/assets/typescript.png'
import kotlin from '../../src/assets/kotlin.png'
import cpp from '../../src/assets/cpp.png'
import java from '../../src/assets/java.png'
import javascript from '../../src/assets/jscript.png'
import android from '../../src/assets/android.png'
import node from '../../src/assets/node.png'
import react from '../../src/assets/react.png'
import restApi from '../../src/assets/api.png'
import mysql from '../../src/assets/mysql.png'


export interface SkillsProps {
    title: string;
    image: string;
}

export const skillsList: SkillsProps[] = [
    {
        title: "Kotlin",
        image: kotlin,
    }, {
        title: "Android",
        image: android,
    }, {
        title: "Git",
        image: git,
    },
    {
        title: "TypeScript",
        image: typescript,
    }, {
        title: "JavaScript",
        image: javascript,
    }, {
        title: "C++",
        image: cpp,
    }, {
        title: "Java",
        image: java,
    }, {
        title: "Node",
        image: node
    }, {
        title: "React",
        image: react,
    }, {
        title: "REST-API",
        image: restApi,
    }, {
        title: "MySQL",
        image: mysql,
    },
]

