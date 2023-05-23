import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { renderButtonStyle } from "../utils/render-button-style";
import Link from "next/link";
import { renderBackgroundStyle } from "../utils/render-background-style";

interface StartSection {
  data: {
    title: string;
    description: string;
    background: string;
    picture: {
      data: Image
    };
    button: Button
  };
}
interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Image {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    url: string;
    width: number;
    height: number;
  };
}
export default function StartSection({ data }: StartSection) {
  const { title, description, picture, button, background } = data;

  return (
    <section className={`relative md:py-24 py-16 ${renderBackgroundStyle(background)}`}>
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center">
                <div className="lg:col-span-5">
                    <Image 
                        src={getStrapiMedia(picture.data.attributes.url) || ""} 
                        alt={picture.data.attributes.alternativeText || ""}
                        width={picture.data.attributes.width}
                        height={picture.data.attributes.height}
                        // fill={true}
                        className="rounded-lg shadow-lg relative"
                      />
                </div>

                <div className="lg:col-span-7">
                    <div className="lg:ml-7">
                        <h3 className="mb-4 md:text-2xl text-xl font-medium">{title}</h3>

                        <p className="text-slate-400 dark:text-slate-300 max-w-2xl mx-auto">{description}</p>
                    
                        <div className="relative mt-8">
                          <Link
                            href={button.url}
                            target={button.newTab ? "_blank" : "_self"}
                            className={renderButtonStyle(button.type)}
                          >
                            {button.text}
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
