import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo({
  src,
  lang,
  children,
}: {
  src: string | null;
  lang: string | "en";
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={`/${lang}`}
      aria-label="Back to homepage"
      className="navbar-brand md:mr-16"
    > 
      <span className="inline-block dark:hidden">
        {src && <Image className="l-dark" src={src} alt="logo" width={45} height={45} />}
        {src && <Image className="l-light" src={src} alt="logo" width={45} height={45} />}
      </span>
      {src && <Image className="hidden dark:inline-block" src={src} alt="logo" width={45} height={45} />}
      <div className="ml-2">{children}</div>
    </Link>
  );
}
