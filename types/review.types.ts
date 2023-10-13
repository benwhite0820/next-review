export type Review = {
  slug: string;
  title: string;
  image: string;
  date: string;
  html: string;
};

export type StrapiReviewType = {
  id: number;
  attributes: {
    slug: string;
    title: string;
    subtitle: string;
    publishedAt: string;
    body: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
};

export type StrapiReviewPaginationType = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiReviewsApiType = {
  data: StrapiReviewType[];
  meta: StrapiReviewPaginationType;
};
