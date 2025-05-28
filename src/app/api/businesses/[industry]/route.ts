import { NextRequest, NextResponse } from 'next/server';
import { businesses, type Business } from '@/lib/mock-data';

export async function GET(req: NextRequest, { params }: { params: { industry: string } }) {
  const industry = params.industry as string;

  if (!industry) {
    return NextResponse.json({ error: 'Industry parameter is required' }, { status: 400 });
  }

  const filteredBusinesses: Business[] = businesses.filter(
    (business: Business) => business.industry.toLowerCase() === industry.toLowerCase()
  );

  return NextResponse.json(filteredBusinesses);
}