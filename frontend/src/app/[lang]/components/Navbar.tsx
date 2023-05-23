"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="nav-item">
      <Link
        href={url}
        className={`nav-link ${
          path === url && "active"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
  lang
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  lang: string | "en"
}) {

  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <nav className={scroll ? "group navbar is-sticky" : "group navbar"} id="navbar">
        <div className="container flex flex-wrap items-center justify-between">
          <Logo src={logoUrl} lang={lang}>
            {logoText && <h2 aria-hidden="true" className="hidden text-2xl font-bold">{logoText}</h2>}
          </Logo>
                {/* <span className="inline-block dark:hidden">
                    <img src="assets/images/logo-dark.png" className="l-dark" alt="">
                    <img src="assets/images/logo-light.png" className="l-light" alt="">
                </span> */}

            {/* <div className="nav-icons flex items-center lg_992:order-2 ml-auto md:ml-8">
                <!-- Navbar Button -->
                <ul className="list-none menu-social mb-0 ps-lg-4">
                    <li className="inline">
                        <a href="login.html" className="btn btn-icon rounded-full bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white"><i className="uil uil-user"></i></a>
                    </li>
                </ul>
                <!-- Navbar Collapse Manu Button -->
                <button data-collapse="menu-collapse" type="button" className="collapse-btn inline-flex items-center ml-3 text-dark dark:text-white lg_992:hidden" aria-controls="menu-collapse" aria-expanded="false">
                    <span className="sr-only">Navigation Menu</span>
                    <i className="mdi mdi-menu text-[24px]"></i>
                </button>
            </div> */}

            <div className="navigation lg_992:flex hidden ml-auto" id="menu-collapse">
                <ul className="navbar-nav nav-light" id="navbar-navlist">
                  {links.map((item: NavLink) => (
                    <NavLink key={item.id} {...item} />
                  ))}
                </ul>
                <select
                  id="location"
                  name="location"
                  className="block ml-2 rounded-md border-0 outline-none bg-transparent text-white/60 focus:ring-0 group-[.is-sticky]:text-gray-800 dark:group-[.is-sticky]:text-white/60"
                  defaultValue={pathname}
                  onChange={(e) => router.push(e.target.value)}
                >
                  <option value="/en">English</option>
                  <option value="/fr">France</option>
                </select>
            </div>
        </div>
    </nav>
  )
}
