import {useEffect, useState} from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

const navRoute = {
    "/": "Accueil",
    "/projects": "Projets",
    "/blog": "Blog",
    "/goals": "Objectifs",
    "/contact": "Contact",
}

export default function Navbar () {
    const [scrollY, setScrollY] = useState(0)
    const [screenHeight, setScreenHeight] = useState(1)
    const [displayNavBackground, setDisplayNavBackground] = useState(false)

    const router = useRouter();

    const handleScroll = () => {
        setScrollY(() => window.scrollY)
        setScreenHeight( () => window.innerHeight-10)
        setDisplayNavBackground(() => scrollY >= screenHeight-10)
        console.log(displayNavBackground)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (
        <nav className={clsx('sticky top-0 py-2 transition delay-75', displayNavBackground ? 'bg-white shadow' : '')}  aria-label="Global">
            
            <div className={clsx('flex items-center flex-grow flex-shrink-0 lg:flex-grow-0')}>
                <div className={clsx('flex items-center justify-between w-full md:w-auto')}>

                    <div className={clsx('-mr-2 flex items-center md:hidden')}>
                        <button type="button" className={clsx('')} aria-expanded="false">
                            <span className={'sr-only'}>Menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={clsx('hidden md:flex flex-row md:ml-10 justify-center md:space-x-4')}>
                {
                    Object.keys(navRoute).map( (route, index) => {
                        return (
                            <Link key={index} href={route}>
                                <a className={clsx('font-bold p-4 text-white', router.pathname === route ? 'text-orange-400' : (displayNavBackground ? 'text-neutral-600 hover:text-neutral-800' : 'text-neutral-100 hover:text-neutral-300'))}>
                                    {navRoute[route]}
                                </a>
                            </Link>
                        )
                    })
                }
            </div>                
        </nav>
    )
}