'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export const SelectLanguage = () => {
    const router = useRouter();
    const pathName = usePathname();
    const currentLocale = useLocale();

    const changeLanguage = (newLocale: string) => {
    const newPathname = pathName.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
    };

    return (
        <select className="bg-white text-black" onChange={(e) => changeLanguage(e.target.value)} value={currentLocale}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
        </select>
    );
}