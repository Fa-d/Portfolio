import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { keyframes } from '@mui/system';
const linkedin = '/assets/linkedin.png';
const github = '/assets/github.png';
const whatsapp = '/assets/whatsapp.png';
const facebook = '/assets/facebook.png';
const email = '/assets/email.png';
const x = '/assets/x.png';

export function ContactItems() {
    const bounceIn = keyframes`
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    `;

    const contacts = [
        { href: 'mailto:contact@sadakat.dev', icon: email, alt: 'Email', color: '#EA4335' },
        { href: 'https://www.linkedin.com/in/sadakat-hussain-fahad/', icon: linkedin, alt: 'LinkedIn', color: '#0077B5' },
        { href: 'https://github.com/Fa-d', icon: github, alt: 'GitHub', color: '#333' },
        { href: 'https://wa.me/8801749948098', icon: whatsapp, alt: 'WhatsApp', color: '#25D366' },
        { href: 'https://www.facebook.com/sadakat.hussain.fahad/', icon: facebook, alt: 'Facebook', color: '#1877F2' },
        { href: 'https://x.com/faddy_fahad__', icon: x, alt: 'X', color: '#000000' },
    ];

    return (
        <Stack direction="row" spacing={1.5} justifyContent="center">
            {contacts.map((contact, index) => (
                <IconButton
                    key={contact.href}
                    component="a"
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                        p: 0,
                        transition: 'all 0.3s ease',
                        animation: `${bounceIn} 0.6s ease-out ${index * 0.1}s both`,
                        '&:hover': {
                            transform: 'translateY(-3px) scale(1.1)'
                        }
                    }}
                >
                    <Box 
                        component="img" 
                        src={contact.icon} 
                        alt={contact.alt} 
                        sx={{ 
                            height: 40, 
                            width: 40
                        }} 
                    />
                </IconButton>
            ))}
        </Stack>
    );
}