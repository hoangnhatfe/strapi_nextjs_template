import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
      width: number;
      height: number;
    };
  };
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.data.attributes.url);

  return (
    <section className={`py-36 lg:py-56 w-full table relative bg-top bg-no-repeat`} id="home">
        <Image 
          src={imgUrl || ""}
          alt={data.picture.data.attributes.alternativeText || ""}
          fill={true}
          className="absolute inset-0 object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t to-black/50 via-black/75 from-black"></div>

        <div className="container">
            <div className="grid grid-cols-1 pb-8 text-center mt-10">
                {/* <a href="#!" data-type="youtube" data-id="yba7hPeTSjk" className="lightbox lg:h-20 h-16 lg:w-20 w-16 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-blue-600 text-blue-600 hover:text-white duration-500 ease-in-out mx-auto">
                    <i className="mdi mdi-play inline-flex items-center justify-center text-3xl"></i>
                </a> */}

                <HighlightedText
                  text={data.title}
                  tag="h1"
                  className="font-medium leading-normal text-4xl mb-5 mt-10 text-white"
                  color="dark:text-blue-400"
                />

                <HighlightedText
                  text={data.description}
                  tag="p"
                  className="text-slate-400 text-lg max-w-xl mx-auto"
                  color="dark:text-blue-400"
                />

                <div className="mt-8">
                  {data.buttons.map((button: Button, index: number) => (
                    <Link
                      key={index}
                      href={button.url}
                      target={button.newTab ? "_blank" : "_self"}
                      className={`mx-2 ${renderButtonStyle(button.type)}`}
                    >
                      {button.text}
                    </Link>
                  ))}
                </div>
            </div>
        </div>
    </section>
  );
}
