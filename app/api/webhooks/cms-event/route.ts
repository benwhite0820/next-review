import { CACHE_TAGS } from '@/types/review.types';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const payload = await request.json();
  if (payload.model === CACHE_TAGS.REVIEW) {
    revalidateTag(CACHE_TAGS.REVIEW);
  }
  return new Response(null, { status: 204 });
}
