import { getSearchReviews } from '@/lib/review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userQuery = request.nextUrl.searchParams.get('query') || '';
  const review = await getSearchReviews(userQuery);
  return NextResponse.json(review);
}
