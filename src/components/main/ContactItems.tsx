import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import linkedin from '../../../public/assets/linkedin.png'
import github from '../../../public/assets/github.png'
import whatsapp from '../../../public/assets/whatsapp.png'
import facebook from '../../../public/assets/facebook.png'
import email from '../../../public/assets/email.png'
import x from '../../../public/assets/x.png'

export function ContactItems() {
    const contacts = [
        { href: 'mailto:contact@sadakat.dev', icon: email, alt: 'Email' },
        { href: 'https://www.linkedin.com/in/sadakat-hussain-fahad/', icon: linkedin, alt: 'LinkedIn' },
        { href: 'https://github.com/Fa-d', icon: github, alt: 'GitHub' },
        { href: 'https://wa.me/8801749948098', icon: whatsapp, alt: 'WhatsApp' },
        { href: 'https://www.facebook.com/sadakat.hussain.fahad/', icon: facebook, alt: 'Facebook' },
        { href: 'https://x.com/faddy_fahad__', icon: x, alt: 'X' },
    ];

    return (
        <Stack direction="row" spacing={2}>
            {contacts.map((contact, _) => (
                <IconButton
                    key={contact.href}
                    component="a"
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ p: 0 }}
                >
                    <Box component="img" src={contact.icon} alt={contact.alt} sx={{ height: 40, width: 40 }} />
                </IconButton>
            ))}
        </Stack>
    );
}