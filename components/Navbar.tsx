import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

const navRoute = {
  "/": "Accueil",
  "/projects": "Projets",
  "/blog": "Blog",
  "/goals": "Objectifs",
  "/contact": "Contact",
};

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [screenHeight, setScreenHeight] = useState(1);
  const [screenWidth, setScreenWidth] = useState(1);
  const [changeNavColor, setChangeNavColor] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
      setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
        setScreenWidth(() => window.innerWidth);
        setIsMobileShow(isMobile ? isMobileShow : false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[])

  const isMobile = screenWidth < 1024;


  const handleScroll = () => {
    isMobileShow ? setIsMobileShow(false) : null
    setScrollY(() => window.scrollY);
    setScreenHeight(() => window.innerHeight - 20);
    setChangeNavColor(() => scrollY >= screenHeight - 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });


  return isMobile ? (
    <nav>
        <div className={clsx("fixed right-0 top-0 bottom-0 z-50 w-1/2 bg-slate-100 bg-opacity-80", isMobileShow ? "" : "translate-x-full", "transition-all")}>
            <div className={clsx("flex flex-col items-center pt-20 justify-center divide-y-2 divide-slate-300")}>
                {Object.keys(navRoute).map((route, index) => {
                    return (
                        <Link key={index} href={route}>
                            <a
                                className={clsx(
                                "w-full text-center font-bold p-4 text-white",
                                router.pathname === route
                                    ? "text-orange-400"
                                    : "text-neutral-600 hover:text-neutral-800 hover:bg-slate-200"
                                )}
                            >
                                {navRoute[route]}
                            </a>
                        </Link>
                    );
                    })}
            </div>
        </div>
        {
                isMobileShow ? (
                    <button type={"button"} className={clsx("fixed top-4 right-4 bg-transparent p-4 rounded-lg hover:text-orange-400 transition-all z-[60]")} onClick={() => {setIsMobileShow(!isMobileShow)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                ) : ( 
                    <button type={"button"} className={clsx("fixed top-4 right-4 bg-transparent p-4 rounded-lg hover:text-orange-400 transition-all z-[60]", changeNavColor ? "text-slate-800 bg-white border border-slate-800 hover:border-orange-400" : "text-white")} onClick={() => {setIsMobileShow(!isMobileShow)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )
            }
        
    </nav>
  ) : (
    <nav className={clsx("sticky top-0 z-50")}>
        <div className={clsx("flex items-center justify-center flex-wrap p-3")}>
            {Object.keys(navRoute).map((route, index) => {
            return (
                <Link key={index} href={route}>
                <a
                    className={clsx(
                    "font-bold p-4 text-white",
                    router.pathname === route
                        ? "text-orange-400"
                        : changeNavColor
                        ? "text-neutral-600 hover:text-neutral-800"
                        : "text-neutral-100 hover:text-neutral-300"
                    )}
                >
                    {navRoute[route]}
                </a>
                </Link>
            );
            })}
        </div>
        
    </nav>
)
}
