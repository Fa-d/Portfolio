import './ContactItems.css'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github.png'
import whatsapp from '../../assets/whatsapp.png'
import facebook from '../../assets/facebook.png'
import email from '../../assets/email.png'
import x from '../../assets/x.png'

export function ContactItems() {
    return <ul className='contact_items'>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='mailto:contact@sadakat.dev' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={email} />
                </div>
            </a>
        </li>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='https://www.linkedin.com/in/sadakat-hussain-fahad/' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={linkedin} />
                </div>
            </a>
        </li>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='https://github.com/Fa-d' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={github} />
                </div>
            </a>
        </li>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='https://wa.me/8801749948098' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={whatsapp} />
                </div>
            </a>
        </li>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='https://www.facebook.com/sadakat.hussain.fahad/' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={facebook} />
                </div>
            </a>
        </li>
        <li>
            <a style={{ textDecoration: 'none' }}
                href='https://x.com/faddy_fahad__' target="_blank">
                <div className='hyperlink-item'>
                    <img style={{ height: 40, width: 40 }} src={x} />
                </div>
            </a>
        </li>
    </ul>;
}