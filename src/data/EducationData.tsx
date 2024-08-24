
export interface EducationProps {
    institution: string;
    date: string;
    degree: string;
}

const bauet: EducationProps = {
    date: '2017- 2021',
    institution: 'Bangledesh Army University of Engineering and Technology.',
    degree: 'B.Sc in CSE'
}

const biam: EducationProps = {
    date: '2006- 2016',
    institution: 'Biam Model School and College.',
    degree: 'S.S.C and H.S.C'
}

const educationStepsData = [bauet, biam];
export default educationStepsData 