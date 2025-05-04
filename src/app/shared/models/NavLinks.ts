
export interface Link{
    name: string;
    url?: string;
    isHref?: boolean;
    href?: string;
}

export const UnauthenticatedLinks: Link[] = [
    { name: 'Home', url: '/', isHref: false },
    { name: 'About', href: '#about', isHref: false },
    { name: 'Contact', href: '#contact', isHref: false },
]

export const AuthenticatedLinks: Link[] = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Profile', url: '/profile' },
    { name: 'Settings', url: '/settings' }
]
