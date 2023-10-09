import Image from 'next/image';
import Heading from '@/components/heading.component';
import { getReview, getSlugs } from '@/lib/review';

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
};

const ReviewPage = async ({ params: { slug } }: Props) => {
  const { title, image, date, html } = await getReview(slug);
  return (
    <>
      <Heading>{title}</Heading>
      <p className="italic pb-2">{date}</p>
      <Image
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
