import React from "react";
import Link from "next/link";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image"

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    publishedAt: string;
    cover: {
      data: {
          attributes: {
              url: string;
              width: number;
              height: number;
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

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "relative z-10 rounded-full bg-gray-50 px-3 mx-1 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    : "relative z-10 rounded-full bg-gray-50 px-3 mx-1 py-1.5 font-medium text-blue-400 hover:bg-blue-100";
}

export default function ArticleSelect({
  categories,
  article,
  params,
}: {
  categories: Category[];
  article: Article;
  params: {
    slug: string;
    category: string;
    lang: string;
  };
}) {
  const { authorsBio } = article.attributes;
  const author = authorsBio.data?.attributes.name;
  const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);

  return (
    <div className="sticky top-20">
      <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center">Author</h5>
      <div className="text-center mt-8">
          <div className="relative h-24 w-24 mx-auto rounded-full shadow mb-4 overflow-hidden">
            {authorImgUrl && (
              <Image 
                  src={authorImgUrl || ""}
                  alt={author || ""}
                  fill={true}
                  className="object-cover"/>
            )}
          </div>
          <h3 className="text-lg font-medium hover:text-blue-600 transition-all duration-500 ease-in-out h5">{author}</h3>
      </div>

      <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow dark:shadow-gray-800 rounded-md p-2 text-center mt-8">Browse By Category</h5>
      <div className="text-center mt-8">
        {categories.map((category: Category) => {
          if (category.attributes.articles.data.length === 0) return null;
          return (
            <Link
              href={`${params.lang}/blog/${category.attributes.slug}`}
              className={selectedFilter(
                category.attributes.slug,
                params.category
              )}
            >
              #{category.attributes.name}
            </Link>
          );
        })}
        <Link href={`${params.lang}/blog`} className={selectedFilter("", "filter")}>
          #all
        </Link>
      </div>
    </div>
  );
}
