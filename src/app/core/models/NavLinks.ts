
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
    { name: 'Dashboard', url: '/dashboard', isHref: false },
    { name: 'Manage Users', url: '/manage-users', isHref: false },
    { name: 'Profile', url: '/profile', isHref: false },
    { name: 'Schedule', url: '/schedule', isHref: false },
    { name: 'history', url: '/history', isHref: false },
]
