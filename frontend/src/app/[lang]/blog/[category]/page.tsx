import PageHeader from '@/app/[lang]/components/PageHeader';
import { fetchAPI } from '@/app/[lang]/utils/fetch-api';
import BlogList from '@/app/[lang]/views/blog-list';
import { Metadata } from 'next';
import { PageWrapper } from '../../components/PageWrapper';

async function fetchPostsByCategory(filter: string, lang: string) {
    try {
        const token = process.env.NEXT_STRAPI_API_TOKEN;
        const path = `/articles`;
        const urlParamsObject = {
            sort: { createdAt: 'desc' },
            filters: {
                category: {
                    slug: filter,
                },
            },
            populate: {
                cover: { fields: ['url'] },
                category: {
                    populate: '*',
                },
                authorsBio: {
                    populate: '*',
                },
            },
            locale: lang
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export async function generateMetadata({ params }: { params: { slug: string; lang: string } }): Promise<Metadata> {
  return {
      title: "Blog",
      description: "Blog",
  };
}

export default async function CategoryRoute({ params }: { params: { category: string; lang: string } }) {
    const filter = params.category;
    const { data } = await fetchPostsByCategory(filter, params.lang);

    //TODO: CREATE A COMPONENT FOR THIS
    if (data.length === 0) return <div>Not Posts In this category</div>;

    const { name, description } = data[0]?.attributes.category.data.attributes;

    return (
        <PageWrapper>
            <PageHeader heading={name} text={description} />
            <BlogList data={data} lang={params.lang}/>
        </PageWrapper>
    );
}

export async function generateStaticParams() {
    return [];
}
