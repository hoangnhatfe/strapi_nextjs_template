import { PageWrapper } from './components/PageWrapper';
import { fetchAPI } from './utils/fetch-api';
import { sectionRenderer } from './utils/section-renderer';

async function getPageBySlug(slug: string, lang: string) {
    const token = process.env.NEXT_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = { filters: { slug }, locale: lang };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response;
}

export default async function RootRoute({ params }: { params: { lang: string } }) {
    const page = await getPageBySlug('home', params.lang);
    const contentSections = page.data[0].attributes.contentSections;

    return (
        <PageWrapper>
            { contentSections.map((section: any, index: number) => sectionRenderer(section, index)) }
        </PageWrapper>
    )
}
