"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { getStrapiMedia } from "../utils/api-helpers";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className="text-sm leading-6 text-gray-300 hover:text-white"
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="text-sm leading-6 text-gray-300 hover:text-white"
      >
        {attributes.name}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
}

export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
  lang,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
  lang: string | "en";
}) {

  return (
    <footer className="bg-slate-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto container pb-8 pt-16 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Image src={getStrapiMedia(logoUrl) || ""} alt="logo" width={45} height={45} />
            <p className="text-sm leading-6 text-gray-300">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link: FooterLink) => {
                return (
                  <a
                    key={link.id}
                    rel="noopener noreferrer"
                    href={link.url}
                    title={link.text}
                    target={link.newTab ? "_blank" : "_self"}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    <RenderSocialIcon social={link.social} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {legalLinks.map((link: FooterLink) => (
                    <li key={link.id} className="flex">
                      <Link
                        href={link.url}
                        className="text-sm leading-6 text-gray-300 hover:text-white"
                        key={link.id}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Pages</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {menuLinks.map((link: FooterLink) => (
                    <FooterLink key={link.id} {...link} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Categories</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {categoryLinks.map((link: CategoryLink) => (
                    <CategoryLink key={link.id} {...link} />
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">©{new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
