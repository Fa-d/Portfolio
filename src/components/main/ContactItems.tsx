import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

export const CONTACT_EMAIL = 'contact@sadakat.dev';

const contacts = [
    { href: `mailto:${CONTACT_EMAIL}`, icon: '/assets/email.png', label: 'Email' },
    { href: 'https://www.linkedin.com/in/sadakat-hussain-fahad/', icon: '/assets/linkedin.png', label: 'LinkedIn' },
    { href: 'https://github.com/Fa-d', icon: '/assets/github.png', label: 'GitHub' },
    { href: 'https://wa.me/8801749948098', icon: '/assets/whatsapp.png', label: 'WhatsApp' },
    { href: 'https://www.facebook.com/sadakat.hussain.fahad/', icon: '/assets/facebook.png', label: 'Facebook' },
    { href: 'https://x.com/faddy_fahad__', icon: '/assets/x.png', label: 'X (Twitter)' },
];

interface ContactItemsProps {
    // On dark backgrounds each icon sits on a light disc so dark glyphs (GitHub, X) stay visible.
    onDark?: boolean;
    size?: number;
}

export function ContactItems({ onDark: onDarkProp = false, size = 36 }: ContactItemsProps) {
    const isDarkTheme = useTheme().palette.mode === 'dark';
    const onDark = onDarkProp || isDarkTheme;
    return (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {contacts.map((contact) => {
                const external = contact.href.startsWith('http');
                return (
                    <Tooltip key={contact.href} title={contact.label}>
                        <IconButton
                            component="a"
                            href={contact.href}
                            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                            aria-label={external ? `${contact.label} (opens in a new tab)` : contact.label}
                            sx={{
                                p: onDark ? 0.75 : 0.25,
                                bgcolor: onDark ? 'rgba(255,255,255,0.92)' : 'transparent',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    bgcolor: onDark ? '#fff' : 'action.hover',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={contact.icon}
                                alt=""
                                width={onDark ? size - 12 : size}
                                height={onDark ? size - 12 : size}
                                loading="lazy"
                                decoding="async"
                                sx={{ display: 'block' }}
                            />
                        </IconButton>
                    </Tooltip>
                );
            })}
        </Stack>
    );
}
