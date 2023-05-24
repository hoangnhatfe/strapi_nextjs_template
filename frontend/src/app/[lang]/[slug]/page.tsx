import { Metadata } from 'next';
import PageHeader from '../components/PageHeader';
import { fetchAPI } from '../utils/fetch-api';
import { sectionRenderer } from '../utils/section-renderer';
import { PageWrapper } from '../components/PageWrapper';

async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

async function getMetaData(slug: string, lang: string) {
  const token = process.env.NEXT_STRAPI_API_TOKEN;
  const path = `/pages`;
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

export default async function RootRoute({ params }: { params: { slug:string; lang: string } }) {
    const page = await getPageBySlug(params.slug, params.lang);
    const contentSections = page.data[0].attributes.contentSections;

    return (
      <PageWrapper>
        { contentSections.map((section: any, index: number) => sectionRenderer(section, index)) }
      </PageWrapper>
    );
}
