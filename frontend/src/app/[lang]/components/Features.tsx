'use client';
import Link from "next/link";
import { renderBackgroundStyle } from "../utils/render-background-style";

import dynamic from 'next/dynamic';
const HeroIcon = dynamic(() => import('./DynamicHeroIcon'), { ssr: false });

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    background: string;
    feature: Feature[];
  };
}

interface Feature {
  icon: string;
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
}

function Feature({ title, description, showLink, newTab, url, text, icon }: Feature) {
  return (
    <div className="flex flex-col items-center p-4">
      <HeroIcon name={`${icon}Icon`} className="w-12 h-12 dark:text-blue-400" />
      <h3 className="text-lg h5 transition duration-500 ease-in-out hover:text-blue-600 mt-1">{title}</h3>
      <p className="text-slate-400 transition duration-500 ease-in-out mt-3 text-center">{description}</p>
      {showLink && url && text && (
        <div>
          <Link
            href={url}
            target={newTab ? "_blank" : "_self"}
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {text}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  const {background} = data
  return (
    <section className={`m:py-12 lg:py-24 ${renderBackgroundStyle(background)}`}>
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h2 className="mb-4 md:text-2xl text-xl font-medium">{data.heading}</h2>
        <p className="text-slate-400 max-w-xl mx-auto">{data.description}</p>
      </div>
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
