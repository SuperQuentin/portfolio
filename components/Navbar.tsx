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
  const [changeNavColor, setChangeNavColor] = useState(false);

  const router = useRouter();

  const handleScroll = () => {
    setScrollY(() => window.scrollY);
    setScreenHeight(() => window.innerHeight - 20);
    setChangeNavColor(() => scrollY >= screenHeight - 20);
    console.log(changeNavColor);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav className={clsx("sticky top-0")}>
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
  );
}
