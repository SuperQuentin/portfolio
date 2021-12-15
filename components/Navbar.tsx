import {useEffect, useState} from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Navbar () {
    const [scrollY, setScrollY] = useState(0)
    const [screenHeight, setScreenHeight] = useState(1)
    const [displayNavBackground, setDisplayNavBackground] = useState(false)

    const router = useRouter();

    const handleScroll = () => {
        setScrollY(() => window.scrollY)
        setScreenHeight( () => window.innerHeight-10)
        setDisplayNavBackground(() => scrollY >= screenHeight)
        console.log(displayNavBackground)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (
        <nav className={clsx('sticky top-0 py-4 transition delay-75', displayNavBackground ? 'bg-white shadow' : 'text-white')}>
            <ul className={clsx('w-full h-8 flex flex-row justify-center md:space-x-4')}>
                <li className={clsx('flex items-center')}>
                    <Link href={"/"} >
                        <a className={clsx('p-4 text-black hover:text-yellow-600', router.pathname == '/' ? 'text-yellow-600' : '')}>Acceuil</a>
                    </Link>
                </li>
                <li className={clsx('flex items-center')}>
                    <Link href={"/projects"} >
                        <a className={clsx('p-4 text-black hover:text-yellow-600', router.pathname == '/projects' ? 'text-yellow-600' : '')}>Projets</a>
                    </Link>
                </li>
                <li className={clsx('flex items-center')}>
                    <Link href={"/blog"} >
                        <a className={clsx('p-4 text-black hover:text-yellow-600', router.pathname == '/blog' ? 'text-yellow-600' : '')}>Blog</a>
                    </Link>
                </li>
                <li className={clsx('flex items-center')}>
                    <Link href={"/goals"} >
                        <a className={clsx('p-4 text-black hover:text-yellow-600', router.pathname == '/goals' ? 'text-yellow-600' : '')}>Goals</a>
                    </Link>
                </li>
                <li className={clsx('flex items-center')}>
                    <Link href={"/contact"} >
                        <a className={clsx('p-4 text-black hover:text-yellow-600', router.pathname == '/contact' ? 'text-yellow-600' : '')}>Contact</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}