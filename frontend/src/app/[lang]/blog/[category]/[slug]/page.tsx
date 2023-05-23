import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import Post from '@/app/[lang]/views/post';
import type { Metadata } from 'next';
import Link from 'next/link';

async function getPostBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: {
            cover: { fields: ['url'] },
            authorsBio: { populate: '*' },
            category: { fields: ['name'] },
            blocks: { populate: '*' },
        },
        locale: lang
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

async function getMetaData(slug: string, lang: string) {
    const token = process.env.NEXT_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
        filters: { slug },
        populate: { seo: { populate: '*' } },
        locale: lang
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }): Promise<Metadata> {
    const meta = await getMetaData(params.slug, params.lang);
    const metadata = meta.length !== 0 ? meta[0].attributes.seo : new Error('Failed to fetch data');

    return {
        title: metadata.metaTitle,
        description: metadata.metaDescription,
    };
}

export default async function PostRoute({ params }: { params: { slug: string; lang: string } }) {
    const { slug, lang } = params;
    const data = await getPostBySlug(slug, lang);
    if (data.data.length === 0) return (
        <>
            <h2>no post found</h2>
            <Link href={`${lang}/blog`}>Back to Blog</Link>
        </>
    );
    return <Post data={data.data[0]} />;
}

export async function generateStaticParams({ params }: { params: { slug: string; lang: string } }) {
    const token = process.env.NEXT_STRAPI_API_TOKEN;
    const path = `/articles`;
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const articleResponse = await fetchAPI(
        path,
        {
            populate: ['category'],
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
