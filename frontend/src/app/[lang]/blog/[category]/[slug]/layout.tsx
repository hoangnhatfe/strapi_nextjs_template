import React from "react";

import ArticleSelect from "@/app/[lang]/components/ArticleSelect";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image"
import Link from "next/link";
import { PageWrapper } from "@/app/[lang]/components/PageWrapper";

async function fetchSideMenuData(filter: string, slug: string, lang: string) {
  try {
    const token = process.env.NEXT_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/categories",
      { populate: "*", locale: lang },
      options
    );

    const articlesResponse = await fetchAPI(
      "/articles",
      filter
        ? {
            filters: {
              category: {
                name: filter,
              },
            },
            populate: {
              cover: { fields: ['url', 'width', 'height'] },
            },
            pagination: {
              limit: 3,
            },
            locale: lang
          }
        : {
          populate: {
            cover: { fields: ['url', 'width', 'height'] },
          },
          pagination: {
            limit: 3,
          },
          locale: lang
        },
      options
    );

    const articleResponsive = await fetchAPI(
      "/articles",
      {
        filters: { slug },
        populate: {
          cover: { fields: ['url', 'width', 'height'] },
          authorsBio: {
            populate: "*",
          },
        },
        locale: lang
      },
      options
    );
    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
      article: articleResponsive.data[0]
    };
  } catch (error) {
    console.error(error);
  }
}

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
    description: string;
    categories: Category[];
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

interface Data {
  articles: Article[];
  categories: Category[];
  article: Article
}

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    category: string;
    lang: string
  };
}) {
  const { category, slug, lang } = params;
  const { categories, articles, article } = (await fetchSideMenuData(category, slug, lang)) as Data;
  const imageUrl = getStrapiMedia(article.attributes.cover.data.attributes.url)
  return (
    <PageWrapper>
      <section className="py-28 w-full table relative">
        {imageUrl && (
          <Image 
              src={imageUrl || ""}
              alt={article.attributes.title || ""}
              fill={true}
              className="absolute inset-0 object-cover"/>
        )}
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="container">
            <div className="grid grid-cols-1 pb-8 text-center mt-10">
              <h2 className="font-medium leading-normal text-3xl text-white">{article.attributes.title}</h2>
              <span className="text-gray-200 font-bold">{formatDate(article.attributes.publishedAt)}</span>
            </div>
        </div>
      </section>
      <section className="relative md:py-12 py-8 dark:text-white dark:bg-slate-900">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-6">
              <div className="p-6 rounded-md shadow">
                {imageUrl && (
                  <Image 
                      src={imageUrl || ""}
                      alt={article.attributes.title || ""}
                      width={article.attributes.cover.data.attributes.width}
                      height={article.attributes.cover.data.attributes.height}
                      className="w-full"/>
                )}
                <div className="mt-6">
                  {children}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-6">
              <ArticleSelect
                categories={categories}
                article={article}
                params={params}
              />
            </div>
          </div>
        </div>

        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-2xl text-xl font-medium">Related Blogs</h3>

                <p className="text-slate-400 dark:text-slate-300 max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px] mt-8">
              {articles.map((article) => {
                const imageUrl = getStrapiMedia(
                  article.attributes.cover.data?.attributes.url
                );

                return (
                  <div key={article.id} className="blog relative rounded-md shadow shadow-slate-200 dark:shadow-gray-800 overflow-hidden">
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
                          href={`${lang}/blog/${category}/${article.attributes.slug}`} 
                          className="text-lg hover:text-blue-600 dark:text-white dark:hover:text-blue-600 transition duration-500 ease-in-out font-medium h5">
                          {article.attributes.title}
                        </Link>
                        <div className="mt-2 text-xs text-gray-400">
                          {formatDate(article.attributes.publishedAt)}
                        </div>
                        <p className="text-slate-400 mt-3">{article.attributes.description}</p>
                        
                        <div className="mt-5">
                          <Link
                            href={`${lang}/blog/${category}/${article.attributes.slug}`}
                            key={article.id}
                            className="hover:text-blue-600 dark:hover:text-blue-600 after:bg-blue-600 dark:text-white transition duration-500"
                          >Read More</Link>
                        </div>
                    </div>
                </div>
                );
              })}
            </div>
        </div>

      </section>
    </PageWrapper>
  );
}

export async function generateStaticParams({ params }: { params: { slug:string; lang: string } }) {
  const token = process.env.NEXT_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
      locale: params.lang
    },
    options
  );

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}
