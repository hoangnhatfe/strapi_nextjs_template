import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";
import { PlayIcon } from '@heroicons/react/20/solid'
import { renderBackgroundStyle } from "../utils/render-background-style";

interface LargeVideoSection {
  data: {
    title: string;
    description: string;
    background: string;
    poster: {
      data: Image
    };
    video: {
      data: Image
    }
  };
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
export default function LargeVideoSection({ data }: LargeVideoSection) {
  const { title, description, poster, video, background } = data;

  return (
    <section className={`relative md:py-24 py-16 md:pt-0 pt-0 ${renderBackgroundStyle(background)}`}>
      <div className="container">
        <div className="grid grid-cols-1 justify-center">
          <div className="relative z-10">
            <div className="grid lg:grid-cols-12 grid-cols-1 md:text-left text-center justify-center">
              <div className="lg:col-start-2 lg:col-span-10">
                <div className="relative">
                  <Image 
                    src={getStrapiMedia(poster.data.attributes.url) || ""} 
                    alt={poster.data.attributes.alternativeText || ""}
                    width={poster.data.attributes.width}
                    height={poster.data.attributes.height}
                    // fill={true}
                    className="rounded-md shadow-lg object-cover"
                  />
                  <div className="absolute bottom-2/4 translate-y-2/4 right-0 left-0 text-center">
                    <a href="#!" data-type="youtube" data-id="yba7hPeTSjk" className="lightbox lg:h-20 h-16 lg:w-20 w-16 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white hover:bg-blue-600 text-blue-600 hover:text-white duration-500 ease-in-out mx-auto">
                      <PlayIcon className="h-8 w-8 inline-flex items-center justify-center" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="content md:mt-8">
              <div className="grid lg:grid-cols-12 grid-cols-1 md:text-left text-center justify-center">
                <div className="lg:col-start-2 lg:col-span-10">
                  <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                    <div className="section-title text-md-start">
                      {/* <h6 className="text-white/50">Customers needs</h6> */}
                      <h3 className="md:text-2xl text-xl font-medium text-white">{title}</h3>
                    </div>
                    <div className="section-title text-md-start">
                      <p className="text-white/50 max-w-xl mx-auto mb-2">{description}</p>
                      {/* <a href="" className="text-white">Read More <i className="uil uil-angle-right-b align-middle"></i>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 left-0 h-4/5 md:h-2/3 bg-blue-600"></div>
    </section>
  );
}
