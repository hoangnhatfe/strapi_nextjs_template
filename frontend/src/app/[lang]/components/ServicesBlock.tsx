import { renderBackgroundStyle } from "../utils/render-background-style";
import HeroIcon from "./DynamicHeroIcon";

interface ServicesProps {
  data: {
    title: string;
    background: string;
    description: string;
    services: Service[];
  };
}

interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

function Service({ title, description, iconName }: Service) {
  return (
    <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
      <div className="relative overflow-hidden text-transparent -m-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-hexagon h-28 w-28 fill-blue-600/5 mx-auto rotate-[30deg]"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-blue-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
            <HeroIcon name={`${iconName}Icon`} className="w-8 h-8 dark:text-blue-400" />
          </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg h5 transition duration-500 ease-in-out">{title}</h3>
        <p className="text-slate-400 transition duration-500 ease-in-out mt-3">{description}</p>
      </div>
    </div>
  );
}

export default function ServicesBlock({ data }: ServicesProps) {
  const {background} = data
  return (
    <section className={renderBackgroundStyle(background)}>
      <div className="container md:py-24 py-16">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-2xl text-xl font-medium">{data.title}</h3>
          <p className="text-slate-400 max-w-xl mx-auto">{data.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
          {data.services.map((service: Service, index: number) => (
            <Service key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
