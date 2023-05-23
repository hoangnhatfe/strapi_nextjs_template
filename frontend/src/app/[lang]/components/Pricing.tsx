import { CheckCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link";
import { renderBackgroundStyle } from "../utils/render-background-style";

interface Feature {
  id: string;
  attributes: {
    name: string;
  };
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  pricePeriod: string;
  isRecommended: boolean;
  product_features: {
    data: Feature[];
  };
}

interface PriceProps {
  data: {
    id: string;
    title: string;
    description: string;
    background: string;
    plans: Plan[];
  };
}

export default function Pricing({ data }: PriceProps) {
  const {background} = data
  return (
    <section className={`relative md:py-24 py-16 ${renderBackgroundStyle(background)}`}>
      <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
              <h3 className="mb-4 md:text-2xl text-xl font-medium">{data.title}</h3>

              <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">{data.description}</p>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-[30px] items-center">
            {data.plans.map((plan: Plan) => (
                <div
                    key={plan.id}
                    className={`p-6 ${
                        plan.isRecommended ? "shadow rounded-md bg-gradient-to-t bg-blue-600" : ""
                    }`}>
                    <div className="pb-8">
                        <h3 className={`mb-6 text-xl font-medium ${plan.isRecommended ? "" : "dark:"}text-white`}>{plan.name}</h3>
                        <div className={`mb-6 ${plan.isRecommended ? "" : "dark:"}text-white/50`}>
                            <span className={`relative h6 -top-5 text-xl`}>$</span>
                            <span className={`text-5xl h6 font-bold ${plan.isRecommended ? "" : "dark:"}text-white`}>{plan.price}</span>
                            <span className={`inline-block h6 ml-1`}>/ {plan.pricePeriod.toLowerCase()}</span>
                        </div>
                        <p className={`mb-6 ${plan.isRecommended ? "" : "dark:"}text-white`}>Basic features for up to 10 users.</p>
                        <Link href="#" className={`btn text-white rounded-md w-full ${ plan.isRecommended ? "bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700" : "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700"}`}>Started Now</Link>
                    </div>
                    <div className={`border-b ${
                            plan.isRecommended ? "border-slate-200/10" : "border-slate-200 dark:border-slate-200/5"
                        }`}></div>
                    <ul className="self-start pt-8">
                        {plan.product_features.data.map((feature: Feature) => (
                            <li  key={feature.id} className={`flex items-center mb-1 ${plan.isRecommended ? "text-white/80" : "text-slate-400"}`}>
                                <CheckCircleIcon className={`w-5 h-5 text-xl ${plan.isRecommended ? "text-white" : "text-green-600"}  mr-2`}/>
                                <span>{feature.attributes.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
              ))}
          </div>
      </div>
  </section>
  );
}
