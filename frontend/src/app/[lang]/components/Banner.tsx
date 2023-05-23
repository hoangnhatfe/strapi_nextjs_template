import { XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface BannerProps {
  data: {
    heading: string;
    text: string;
    type: string;
    link: {
      id: number;
      url: string;
      newTab: boolean;
      text: string;
    };
  } | null;
}

export default function Banner({ data }: BannerProps) {
  if (!data) return null;
  const { heading, text, type, link } = data;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="flex items-center gap-x-6 bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <p className="text-sm leading-6 text-white">
          <Link href={link.url} target={link.newTab ? "_blank" : "_self"}>
            <strong className="font-semibold">{heading}</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            {text}&nbsp;<span aria-hidden="true">&rarr;</span>
          </Link>
        </p>
        <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
