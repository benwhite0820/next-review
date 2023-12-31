import Image from 'next/image';
import { notFound } from 'next/navigation';
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
  if (!slug) notFound();
  return {
    title: slug,
  };
};

const ReviewPage = async ({ params: { slug } }: Props) => {
  const data = await getReview(slug);
  if (!data) notFound();
  const { title, image, date, html, subtitle } = data;

  return (
    <>
      <Heading>{title}</Heading>
      <p className="font-semibold pb-3">{subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <Image
        className="mb-2 rounded"
        src={image}
        alt={title}
        width="640"
        height="360"
        priority
      />
      <article
        className="prose prose-slate max-w-screen-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
};

export default ReviewPage;
