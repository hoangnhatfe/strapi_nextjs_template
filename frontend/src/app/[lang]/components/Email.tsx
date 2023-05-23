import { renderBackgroundStyle } from "../utils/render-background-style";
import FormSubmit from "./FormSubmit";

interface EmailProps {
  id: string;
  __component: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  background: string;
  submitButton: {
    text: string;
  };
}

export default function Email({ data }: { data: EmailProps }) {
  const {background} = data
  return (
    <section className={`py-16 md:py-24 ${renderBackgroundStyle(background)}`}>
      <div className="container mx-auto flex flex-col justify-center py-4 space-y-8 md:py-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none">{data.title}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
        <FormSubmit placeholder={data.emailPlaceholder} text={data.submitButton.text} />
      </div>
    </section>
  );
}
