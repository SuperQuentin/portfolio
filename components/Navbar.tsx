import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

const burger = ""
const close = ""

/** Define route who will be display into the navbar */
const navRoute: any = {
  "/": "Accueil",
  "/projects": "Projets",
  "/blog": "Blog",
  "/goals": "Objectifs",
  "/contact": "Contact",
};

export default function Navbar() {
  /** a lot of state to monitor the status of y axis and screen size */
  const [scrollY, setScrollY] = useState(0);
  const [screenHeight, setScreenHeight] = useState(1);
  const [screenWidth, setScreenWidth] = useState(1);
  const [changeNavColor, setChangeNavColor] = useState(false);
  const [isMobileShow, setIsMobileShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  /** handle screen resize to set isMobile state */
  useEffect(() => {
    function handleResize() {
      setScreenWidth(() => window.innerWidth);
      setIsMobileShow(isMobile ? isMobileShow : false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 1024;

  /** handle scroll to check if we want to change nav colors after passing the screen height */
  const handleScroll = () => {
    isMobileShow ? setIsMobileShow(false) : null;
    setScrollY(() => window.scrollY);
    setScreenHeight(() => window.innerHeight - 20);
    setChangeNavColor(() => scrollY >= screenHeight - 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return isMobile ? ( // Check if the screen is mobile to know witch menu to display
    <nav>
      <div
        className={clsx(
          "fixed right-0 top-0 bottom-0 z-50 w-1/2 bg-white border-l-2 border-slate-100 ",
          isMobileShow ? "" : "translate-x-full",
          "transition-all"
        )}
      >
        <div
          className={clsx(
            "flex flex-col items-center pt-20 justify-center divide-y-2"
          )}
        >
          {/** loop on the array of route to generate each button */}
          {Object.keys(navRoute).map((route, index) => {
            return (
              <Link key={index} href={route}>
                <a
                  className={clsx(
                    "w-full text-center font-bold p-4 text-white",
                    router.pathname === route ||
                      (router.pathname.indexOf(route) > -1 && route !== "/")
                      ? "text-orange-400"
                      : "text-neutral-600 hover:text-neutral-800 hover:bg-gray-100 transition"
                  )}
                >
                  {navRoute[route]}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      {isMobileShow ? ( // Update the button to a cross when the mobile menu is display
        <button
          type={"button"}
          className={clsx(
            "fixed top-4 right-4 bg-transparent p-4 rounded-lg hover:text-orange-400 transition-all z-[60]"
          )}
          onClick={() => {
            setIsMobileShow(!isMobileShow);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : (
        <button
          type={"button"}
          className={clsx(
            "fixed top-4 right-4 bg-transparent p-4 rounded-lg hover:text-orange-400 transition-all z-[60]",
            changeNavColor || router.pathname !== "/"
              ? "text-slate-800 bg-white border border-slate-800 hover:border-orange-400"
              : "text-white"
          )}
          onClick={() => {
            setIsMobileShow(!isMobileShow);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </nav>
  ) : (
    // At the there is the normal nav menu
    <nav className={clsx("sticky top-0 z-50")}>
      <div className={clsx("flex items-center justify-center flex-wrap p-3 ")}>
        <div
          className={clsx(
            "h-full bg-white p-4 rounded-full transition",
            changeNavColor || router.pathname !== "/" // Some black magic to just have noice background on other pages that home or after the first height scroll base on changeNavColor
              ? "bg-opacity-100"
              : "bg-opacity-0"
          )}
        >
          {/** Same as before display each link base on navRoute array */}
          {Object.keys(navRoute).map((route, index) => {
            return (
              <Link key={index} href={route}>
                <a
                  className={clsx(
                    "font-bold p-4 text-white",
                    router.pathname === route ||
                      (router.pathname.indexOf(route) > -1 && route !== "/")
                      ? "text-orange-400"
                      : router.pathname === "/"
                      ? changeNavColor
                        ? "text-neutral-600 hover:text-neutral-800"
                        : "text-neutral-100 hover:text-neutral-300"
                      : "text-neutral-600 hover:text-neutral-800"
                  )}
                >
                  {navRoute[route]}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
