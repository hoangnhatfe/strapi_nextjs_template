import Image from "next/image";
import { getStrapiURL } from "../utils/api-helpers";
import { StarIcon } from "@heroicons/react/24/solid";
import { renderBackgroundStyle } from "../utils/render-background-style";
interface Testimonial {
  text: string;
  authorName: string;
  authorDesc: string;
  picture: {
    data: {
      id: string;
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
}

interface TestimonialsProps {
  data: {
    id: string;
    title: string;
    description: string;
    background: string;
    testimonials: Testimonial[];
  };
}

function Testimonial({ text, authorName, authorDesc, picture }: Testimonial) {
  const imageUrl = getStrapiURL(picture.data.attributes.url);
  return (
    <div className="rounded-lg shadow-lg dark:shadow-gray-800 p-6 bg-white dark:bg-slate-900">
      <div className="flex items-center pb-6 border-b border-gray-100 dark:border-gray-800">
          <Image
              src={imageUrl || ""}
              alt={picture.data.attributes.alternativeText || "none provided"}
              className="h-16 w-16 rounded-full shadow dark:shadow-gray-800"
              width={200}
              height={200}
          />

          <div className="pl-4">
              <a href="" className="text-lg h5 hover:text-blue-600 duration-500 ease-in-out">{authorName}</a>
              <p className="text-slate-400">{authorDesc}</p>
          </div>
      </div>

      <div className="mt-6">
          <p className="text-slate-400">{text}</p>
          <ul className="flex mb-0 text-amber-400 mt-2">
              <li><StarIcon className="w-4 h-4"/></li>
              <li><StarIcon className="w-4 h-4"/></li>
              <li><StarIcon className="w-4 h-4"/></li>
              <li><StarIcon className="w-4 h-4"/></li>
              <li><StarIcon className="w-4 h-4"/></li>
          </ul>
      </div>
    </div>
  );
}

export default function Testimonials({ data }: TestimonialsProps) {
  const {background} = data
  return (
    <section className={`relative md:py-24 py-16 ${renderBackgroundStyle(background)}`}>
      <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
              <h3 className="mb-6 md:text-2xl text-xl font-medium">{data.title}</h3>
              <p className="text-slate-400 max-w-xl mx-auto">{data.description}</p>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {data.testimonials.map((testimonial: Testimonial, index: number) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
      </div>
    </section>
  );
}
