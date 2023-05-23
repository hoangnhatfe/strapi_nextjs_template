import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function PostList({
  data: articles,
  lang,
  children,
}: {
  data: Article[];
  lang: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="dark:text-white dark:bg-slate-900">
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(
              article.attributes.cover.data?.attributes.url
            );

            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            const avatarUrl = getStrapiMedia(
              authorsBio?.avatar.data.attributes.url
            );

            return (
              <div className="blog relative rounded-md shadow shadow-slate-200 dark:shadow-gray-800 overflow-hidden">
                <div className="block aspect-[7/4] relative">
                  {imageUrl && (
                    <Image
                      alt="presentation"
                      fill={true}
                      src={imageUrl}
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="content p-6">
                    <Link
                      href={`${lang}/blog/${category?.slug}/${article.attributes.slug}`} 
                      className="text-lg hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition duration-500 ease-in-out font-medium h5">
                      {article.attributes.title}
                    </Link>
                    <div className="mt-2 text-xs text-gray-400">
                      {formatDate(article.attributes.publishedAt)}
                    </div>
                    <p className="text-slate-400 mt-3">{article.attributes.description}</p>
                    
                    <div className="mt-5">
                      <Link
                        href={`${lang}/blog/${category?.slug}/${article.attributes.slug}`}
                        key={article.id}
                        className="hover:text-blue-600 dark:hover:text-blue-600 after:bg-blue-600 dark:text-white transition duration-500"
                      >Read More</Link>
                    </div>
                </div>
            </div>
            );
          })}
        </div>
        {children && children}
      </section>
    </div>
  );
}