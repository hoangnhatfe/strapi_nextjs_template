import React from "react";
import Image from "next/image"
import { getStrapiMedia } from "../utils/api-helpers";

interface PageHeaderProps {
  heading: string,
  text?: string,
  img?: any
}

export default function PageHeader({ heading, text, img } : PageHeaderProps) {
  return (
    <section className="py-28 w-full table relative">
        {img ? (
          <Image 
            src={getStrapiMedia(img.data.attributes.url) || ""}
            alt={img.data.attributes.alternativeText || ""}
            fill={true}
            className="absolute inset-0 object-cover"/>
        ) : ""}
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container">
            <div className="grid grid-cols-1 pb-8 text-center mt-10">
              { text && <span className="text-gray-200 font-bold">{text}</span> }
              <h2 className="font-medium leading-normal text-3xl text-white">{heading}</h2>
            </div>
        </div>
    </section>
  );
}
