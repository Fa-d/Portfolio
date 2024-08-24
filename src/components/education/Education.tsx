import './Education.css'
import { EducationProps } from '../../data/EducationData'

const Education: React.FC<{ steps: EducationProps[] }> = ({ steps }) => {

    var listItems = steps.map(item =>
        <li className='item_root-edu'>
            <div className='degree-title'>{item.degree}</div>
            <div className='date-edu'>{item.date}</div>
            <div className='inistitute'>{item.institution} </div>
        </li>
    );
    return (
        <div className='content-edu'>
            <h3 className="title">EDUCATION</h3>
            <ul className='root-ul'>
                {listItems}
            </ul>
        </div>
    );
};
export default Education;

