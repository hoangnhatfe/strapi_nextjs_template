import dynamic from "next/dynamic";
import { ComponentType } from "react";

type Props = {
  name: any;
  className?: string;
  outline?: boolean;
};

const HeroIcon = ({ name, className = "", outline = false }: Props) => {
  const Icon: ComponentType<{ className: string }> = outline
    ? dynamic(() => import("@heroicons/react/24/outline").then((mod:any) => mod[name]))
    : dynamic(() => import("@heroicons/react/24/solid").then((mod:any) => mod[name]));

  return <Icon className={className} aria-hidden={true} />;
};

export default HeroIcon;