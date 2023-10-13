import Image from 'next/image';
import Heading from '@/components/heading.component';
import { getReview, getSlugs } from '@/lib/review';
import ShareLinkButton from '@/components/shareLinkButton.component';

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const slugs = await getSlugs();
  return slugs.map(({ attributes: { slug } }) => ({ slug }));
};

export const generateMetadata = async ({ params: { slug } }: Props) => {
  return {
    title: slug,
  };
};

const ReviewPage = async ({ params: { slug } }: Props) => {
  const { title, image, date, html } = await getReview(slug);
  return (
    <>
      <Heading>{title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <img
        src={image}
        alt={title}
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        className="prose prose-slate max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default ReviewPage;
